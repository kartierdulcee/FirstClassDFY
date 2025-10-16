import ApplyReceivedEmail from "@/emails/apply-received";
import BookingConfirmedEmail from "@/emails/booking-confirmed";
import MagicLinkEmail from "@/emails/magic-link";
import NewLeadAlertEmail from "@/emails/new-lead-alert";
import QualifiedNextStepEmail from "@/emails/qualified-next-step";
import WaitlistEmail from "@/emails/waitlist";
import { env } from "@/env";
import { resend } from "@/lib/resend";
import { logger } from "@/lib/logger";

export async function sendApplyReceivedEmail({
  to,
  name,
}: {
  to: string;
  name?: string | null;
}) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: "We received your First Class AI audit",
    react: ApplyReceivedEmail({ name }),
  });

  if (error) {
    logger.error("Failed to send apply_received email", error);
  }
}

export async function sendQualifiedNextStepEmail({
  to,
  name,
  bookUrl,
}: {
  to: string;
  name?: string | null;
  bookUrl: string;
}) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: "You’re cleared to book your build briefing",
    react: QualifiedNextStepEmail({ name, bookUrl }),
  });

  if (error) {
    logger.error("Failed to send qualified_next_step email", error);
  }
}

export async function sendWaitlistEmail({
  to,
  name,
}: {
  to: string;
  name?: string | null;
}) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: "We’ll keep you posted on First Class AI openings",
    react: WaitlistEmail({ name }),
  });

  if (error) {
    logger.error("Failed to send waitlist email", error);
  }
}

export async function sendBookingConfirmedEmail({
  to,
  name,
  eventDate,
  joinUrl,
}: {
  to: string;
  name?: string | null;
  eventDate: string;
  joinUrl?: string;
}) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: "Your First Class AI briefing is confirmed",
    react: BookingConfirmedEmail({ name, eventDate, joinUrl }),
  });

  if (error) {
    logger.error("Failed to send booking_confirmed email", error);
  }
}

export async function sendNewLeadAlertEmail({
  lead,
}: {
  lead: {
    name: string;
    email: string;
    company?: string | null;
    budget?: number | null;
    timeframe?: string | null;
    mainPain?: string | null;
  };
}) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.RESEND_INTERNAL_EMAIL,
    subject: `New lead: ${lead.name}`,
    react: NewLeadAlertEmail({ lead }),
  });

  if (error) {
    logger.error("Failed to send new_lead_alert email", error);
  }
}

export async function sendMagicLink({ to, verificationUrl }: { to: string; verificationUrl: string }) {
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: "Your First Class AI sign-in link",
    react: MagicLinkEmail({ verificationUrl }),
  });

  if (error) {
    logger.error("Failed to send magic link email", error);
    throw error;
  }
}
