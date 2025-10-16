import { LeadStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
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
import { env } from "@/env";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "api";

    const limiter = rateLimit(`api-lead:${ip}`, 10, 1000 * 60 * 5);

    if (!limiter.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const payload = await request.json();
    const parsed = leadIntakeSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 422 });
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        email: data.email,
        name: data.name,
        company: data.company ?? null,
        website: data.website ?? null,
        niche: data.niche ?? null,
        revenue: data.revenue ?? null,
        budget: data.budget ?? null,
        mainPain: data.mainPain ?? null,
        goal: data.goal ?? null,
        timeframe: data.timeframe,
        source: data.source ?? "api",
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
        ? sendQualifiedNextStepEmail({ to: data.email, name: data.name, bookUrl })
        : sendWaitlistEmail({ to: data.email, name: data.name }),
    ]);

    return NextResponse.json({ leadId: lead.id, qualified }, { status: 201 });
  } catch (error) {
    logger.error("Failed to create lead via API", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
