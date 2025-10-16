import { Heading, Hr, Link, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type BookingConfirmedProps = {
  name?: string | null;
  eventDate: string;
  joinUrl?: string;
};

export default function BookingConfirmedEmail({
  name,
  eventDate,
  joinUrl,
}: BookingConfirmedProps) {
  return (
    <EmailLayout previewText="Your First Class AI build briefing is locked in.">
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          Your build briefing is on the calendar
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          {name ?? "There"}, thanks for locking it in. We’ll use this session to
          run through the blueprint and confirm the automations we ship in Sprint 1.
        </Text>
        <Section className="rounded-2xl bg-[#f8fafc] px-6 py-6 text-sm text-[#0f172a]">
          <Text className="uppercase tracking-[0.18em] text-[#0f172a]">
            Session details
          </Text>
          <ul className="mt-3 space-y-2 text-[#334155]">
            <li><strong>When:</strong> {eventDate}</li>
            {joinUrl ? (
              <li>
                <strong>Join link:</strong> <Link href={joinUrl}>{joinUrl}</Link>
              </li>
            ) : null}
            <li>
              <strong>Prep:</strong> Bring your current metrics, tech stack, and
              constraints.
            </li>
          </ul>
        </Section>
        <Text className="text-sm leading-6 text-[#334155]">
          We’ll send a full summary after the call with timelines, investment, and
          operators assigned.
        </Text>
        <Hr className="border-[#e2e8f0]" />
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Done-For-You Systems
        </Text>
      </Section>
    </EmailLayout>
  );
}
