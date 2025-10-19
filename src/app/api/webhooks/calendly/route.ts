import { LeadStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { sendBookingConfirmedEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { CalendlyWebhook, verifyCalendlySignature } from "@/lib/calendly";

export async function POST(request: Request) {
  const signature = request.headers.get("Calendly-Signature");
  const body = await request.text();

  if (!verifyCalendlySignature(signature, body)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const data = JSON.parse(body) as CalendlyWebhook;
  const eventType = data.event;

  if (!eventType) {
    return NextResponse.json({ ok: true });
  }

  const relevantEvents = new Set([
    "invitee.created",
    "invitee.canceled",
    "event.scheduled",
  ]);

  if (!relevantEvents.has(eventType)) {
    return NextResponse.json({ ok: true });
  }

  const email = data.payload.invitee.email.toLowerCase();
  const lead = await prisma.lead.findFirst({
    where: { email },
  });

  if (!lead) {
    logger.warn("Calendly webhook received for unknown lead", { email });
    return NextResponse.json({ ok: true });
  }

  const startTime = data.payload.event.start_time;
  const prettyDate = data.payload.event.start_time_pretty ?? formatDateTime(startTime);
  const location = data.payload.event.location as
    | string
    | { join_url?: string | null }
    | null
    | undefined;
  let joinUrl: string | undefined;

  if (typeof location === "string") {
    joinUrl = location.startsWith("http") ? location : undefined;
  } else if (location?.join_url) {
    joinUrl = location.join_url;
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      status: eventType === "invitee.canceled" ? LeadStatus.NO_SHOW : LeadStatus.BOOKED,
      calendlyUri: data.payload.event.uri,
      calendlyEvent: startTime,
    },
  });

  if (eventType !== "invitee.canceled") {
    await sendBookingConfirmedEmail({
      to: lead.email,
      name: lead.name,
      eventDate: prettyDate,
      joinUrl,
    });
  }

  logger.info("Calendly webhook processed", { id: lead.id, eventType });

  return NextResponse.json({ ok: true });
}
