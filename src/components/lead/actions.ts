"use server";

import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { env } from "@/env";
import {
  sendApplyReceivedEmail,
  sendNewLeadAlertEmail,
  sendQualifiedNextStepEmail,
  sendWaitlistEmail,
} from "@/lib/email";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { isQualifiedLead } from "@/lib/utils";
import { leadIntakeSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export type LeadFormState = {
  status: "idle" | "error" | "waitlist";
  message: string | null;
  errors?: Record<string, string[]>;
};

const initialState: LeadFormState = {
  status: "idle",
  message: null,
};

export { initialState as leadFormInitialState };

export async function createLeadAction(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  try {
    const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const limiter = rateLimit(`lead:${ip}`, 5, 1000 * 60 * 10);

    if (!limiter.success) {
      return {
        status: "error",
        message: "Too many submissions. Please try again soon.",
      };
    }

    const toOptionalString = (value: FormDataEntryValue | null) => {
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    };

    const parseOptionalNumber = (value: FormDataEntryValue | null) => {
      if (typeof value !== "string") return undefined;
      const cleaned = value.replace(/,/g, "").trim();
      if (!cleaned) return undefined;
      const numeric = Number.parseInt(cleaned, 10);
      return Number.isNaN(numeric) ? undefined : numeric;
    };

    const parsed = leadIntakeSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: toOptionalString(formData.get("company")),
      website: toOptionalString(formData.get("website")),
      niche: toOptionalString(formData.get("niche")),
      revenue: parseOptionalNumber(formData.get("revenue")),
      budget: parseOptionalNumber(formData.get("budget")),
      mainPain: toOptionalString(formData.get("mainPain")) as
        | "leads"
        | "ops"
        | "time"
        | undefined,
      goal: toOptionalString(formData.get("goal")),
      timeframe: String(formData.get("timeframe") ?? ""),
      source: toOptionalString(formData.get("source")) ?? "site",
    });

    if (!parsed.success) {
      return {
        status: "error",
        message: "Please review the highlighted fields.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        email: data.email,
        name: data.name,
        company: data.company || null,
        website: data.website || null,
        niche: data.niche || null,
        revenue: data.revenue ?? null,
        budget: data.budget ?? null,
        mainPain: data.mainPain ?? null,
        goal: data.goal || null,
        timeframe: data.timeframe,
        source: data.source ?? "site",
        status: LeadStatus.NEW,
      },
    });

    const qualified = isQualifiedLead(data.budget, data.timeframe);

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        status: qualified ? LeadStatus.QUALIFIED : LeadStatus.WAITLIST,
      },
    });

    const bookUrl = new URL("/book", env.NEXTAUTH_URL).toString();

    await Promise.allSettled([
      sendApplyReceivedEmail({ to: data.email, name: data.name }),
      sendNewLeadAlertEmail({
        lead: {
          name: data.name,
          email: data.email,
          company: data.company,
          budget: data.budget ?? null,
          timeframe: data.timeframe,
          mainPain: data.mainPain ?? null,
        },
      }),
      qualified
        ? sendQualifiedNextStepEmail({
            to: data.email,
            name: data.name,
            bookUrl,
          })
        : sendWaitlistEmail({ to: data.email, name: data.name }),
    ]);

    logger.info("Lead created", {
      id: lead.id,
      qualified,
    });

    revalidatePath("/admin");

    if (qualified) {
      redirect("/book");
    }

    return {
      status: "waitlist",
      message:
        "Thanks for reaching out. You’re on our radar and we’ll follow up when a build window opens.",
    };
  } catch (error) {
    logger.error("Failed to create lead", error);
    return {
      status: "error",
      message:
        "Something went wrong while submitting your application. Please try again shortly.",
    };
  }
}
