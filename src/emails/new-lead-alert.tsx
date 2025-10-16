import { Heading, Hr, Section, Text } from "@react-email/components";

import { EmailLayout } from "@/emails/components/email-layout";

type LeadSummary = {
  name: string;
  email: string;
  company?: string | null;
  budget?: number | null;
  timeframe?: string | null;
  mainPain?: string | null;
};

type NewLeadAlertProps = {
  lead: LeadSummary;
};

export default function NewLeadAlertEmail({ lead }: NewLeadAlertProps) {
  return (
    <EmailLayout previewText={`New lead: ${lead.name}`}>
      <Section className="space-y-6">
        <Heading className="text-2xl font-semibold tracking-tight">
          New audit intake received
        </Heading>
        <Text className="text-sm leading-6 text-[#334155]">
          {lead.name} ({lead.email}) just submitted the First Class AI intake.
        </Text>
        <Section className="rounded-2xl bg-[#f8fafc] px-6 py-6 text-sm text-[#0f172a]">
          <Text className="uppercase tracking-[0.18em] text-[#0f172a]">
            Snapshot
          </Text>
          <ul className="mt-3 space-y-2 text-[#334155]">
            <li>
              <strong>Company:</strong> {lead.company ?? "—"}
            </li>
            <li>
              <strong>Budget:</strong> {lead.budget ? `$${lead.budget.toLocaleString()}` : "—"}
            </li>
            <li>
              <strong>Timeframe:</strong> {lead.timeframe ?? "—"}
            </li>
            <li>
              <strong>Main pain:</strong> {lead.mainPain ?? "—"}
            </li>
          </ul>
        </Section>
        <Text className="text-sm leading-6 text-[#334155]">
          Review the lead in the admin dashboard and assign an operator.
        </Text>
        <Hr className="border-[#e2e8f0]" />
        <Text className="text-xs uppercase tracking-[0.18em] text-[#94a3b8]">
          First Class AI · Internal notification
        </Text>
      </Section>
    </EmailLayout>
  );
}
