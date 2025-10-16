import { Heading, Hr, Link, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type MagicLinkProps = {
  verificationUrl: string;
};

export default function MagicLinkEmail({ verificationUrl }: MagicLinkProps) {
  return (
    <EmailLayout previewText="Your secure link to access First Class AI">
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          Your portal access
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          Tap the link below to sign in. The link expires in 10 minutes for your
          security. If you weren’t expecting this email, you can safely ignore it.
        </Text>
        <Section className="rounded-2xl bg-[#0f172a] px-6 py-5 text-white">
          <Link
            href={verificationUrl}
            className="text-sm font-medium tracking-wide text-white"
          >
            Sign in to First Class AI →
          </Link>
        </Section>
        <Hr className="border-[#e2e8f0]" />
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Done-For-You Systems
        </Text>
      </Section>
    </EmailLayout>
  );
}
