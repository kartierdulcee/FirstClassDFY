import { Heading, Hr, Link, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type WaitlistEmailProps = {
  name?: string | null;
};

export default function WaitlistEmail({ name }: WaitlistEmailProps) {
  return (
    <EmailLayout previewText="You’re on the First Class AI waitlist.">
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          We’re keeping you close
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          Hey {name ?? "there"}, thanks for sharing your goals. Based on capacity and
          timing we’re placing you on the First Class AI waitlist for now.
        </Text>
        <Text className="text-sm leading-6 text-[#334155]">
          We’ll reach back out once a build window opens up. In the meantime we’ll
          send through playbooks and automation drops you can implement today.
        </Text>
        <Section className="rounded-2xl bg-[#f8fafc] px-6 py-6 text-sm text-[#0f172a]">
          <Text className="uppercase tracking-[0.18em] text-[#0f172a]">
            While you wait
          </Text>
          <ul className="mt-3 space-y-2 text-[#334155]">
            <li>Document your top manual workflows.</li>
            <li>Centralise data sources and access credentials.</li>
            <li>Nominate an internal champion for the rollout.</li>
          </ul>
        </Section>
        <Hr className="border-[#e2e8f0]" />
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Done-For-You Systems
        </Text>
        <Link
          href="https://firstclass.ai"
          className="text-xs uppercase tracking-[0.2em] text-[#0f172a]"
        >
          firstclass.ai
        </Link>
      </Section>
    </EmailLayout>
  );
}
