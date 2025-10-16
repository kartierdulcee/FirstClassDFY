import { Heading, Hr, Link, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type QualifiedNextStepProps = {
  name?: string | null;
  bookUrl: string;
};

export default function QualifiedNextStepEmail({
  name,
  bookUrl,
}: QualifiedNextStepProps) {
  return (
    <EmailLayout previewText="You’re cleared to book your build briefing call.">
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          You’re cleared to book your build briefing
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          {name ?? "There"}, we ran the intake and you’re a strong fit for First Class
          AI. Book a 30-minute blueprint call so we can align on scope and delivery.
        </Text>
        <Section className="rounded-2xl bg-[#0f172a] px-6 py-6 text-white">
          <Link href={bookUrl} className="text-sm font-medium tracking-wide">
            Book your build briefing →
          </Link>
        </Section>
        <Text className="text-sm leading-6 text-[#334155]">
          On the call we’ll cover your priority workflows, data sources, and what
          the first digital employee looks like. We come with an initial blueprint in
          hand.
        </Text>
        <Hr className="border-[#e2e8f0]" />
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Done-For-You Systems
        </Text>
      </Section>
    </EmailLayout>
  );
}
