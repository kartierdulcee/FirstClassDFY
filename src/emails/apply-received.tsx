import { Heading, Hr, Link, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type ApplyReceivedProps = {
  name?: string | null;
};

export default function ApplyReceivedEmail({ name }: ApplyReceivedProps) {
  return (
    <EmailLayout previewText="We’re reviewing your AI audit intake.">
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          We received your AI audit request
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          Hey {name ?? "there"},
        </Text>
        <Text className="text-sm leading-6 text-[#334155]">
          Thanks for sharing the details on your team and goals. Our operators are
          reviewing everything so we can surface the right systems, automations, and
          outcomes for you.
        </Text>
        <Text className="text-sm leading-6 text-[#334155]">
          Expect a response within one business day. If we spot an immediate win,
          we’ll send it straight to your inbox.
        </Text>
        <Section className="rounded-2xl bg-[#f8fafc] px-6 py-5 text-sm text-[#0f172a]">
          <Text className="font-medium uppercase tracking-[0.18em] text-[#0f172a]">
            What happens next
          </Text>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[#334155]">
            <li>We qualify budget, timing, and outcomes.</li>
            <li>We map the top “digital employee” opportunities.</li>
            <li>We invite you to the build briefing call.</li>
          </ul>
        </Section>
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Done-For-You Systems
        </Text>
        <Link
          href="https://firstclass.ai"
          className="text-xs uppercase tracking-[0.2em] text-[#0f172a]"
        >
          firstclass.ai
        </Link>
        <Hr className="border-[#e2e8f0]" />
      </Section>
    </EmailLayout>
  );
}
