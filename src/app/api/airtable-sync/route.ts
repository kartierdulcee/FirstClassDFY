import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { featureFlags } from "@/env";
import { pushLeadToAirtable } from "@/lib/integrations/airtable";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!featureFlags.airtableSync) {
    return NextResponse.json({ error: "Airtable sync disabled" }, { status: 400 });
  }

  const { leadId } = await request.json();

  if (typeof leadId !== "string") {
    return NextResponse.json({ error: "Invalid leadId" }, { status: 422 });
  }

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { owner: true },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  await pushLeadToAirtable(lead);

  return NextResponse.json({ ok: true });
}
