"use server";

import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { featureFlags } from "@/env";
import { pushLeadToAirtable } from "@/lib/integrations/airtable";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

function assertAdmin(role?: string) {
  if (role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function updateLeadStatusAction(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user?.role);

  const leadId = formData.get("leadId");
  const status = formData.get("status");

  if (typeof leadId !== "string" || typeof status !== "string") {
    throw new Error("Invalid data");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: status as LeadStatus },
  });

  revalidatePath("/admin");
}

export async function assignLeadOwnerAction(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user?.role);

  const leadId = formData.get("leadId");
  const ownerId = formData.get("ownerId");

  if (typeof leadId !== "string") {
    throw new Error("Invalid lead id");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { ownerId: typeof ownerId === "string" && ownerId.length ? ownerId : null },
  });

  revalidatePath("/admin");
}

export async function syncLeadToAirtableAction(formData: FormData) {
  const session = await auth();
  assertAdmin(session?.user?.role);

  if (!featureFlags.airtableSync) {
    throw new Error("Airtable sync disabled");
  }

  const leadId = formData.get("leadId");
  if (typeof leadId !== "string") {
    throw new Error("Invalid lead id");
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { owner: true },
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  await pushLeadToAirtable(lead);

  logger.info("Lead synced to Airtable", { id: lead.id });
}
