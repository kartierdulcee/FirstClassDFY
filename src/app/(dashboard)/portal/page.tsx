import { LeadStatus } from "@prisma/client";
import type { Metadata } from "next";

import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

const timeline = [
  { title: "Audit", description: "Discovery, data collection, and opportunity mapping." },
  { title: "Build", description: "Architect digital employees and integrate your stack." },
  { title: "Integrations", description: "Roll out automations with human QA and guardrails." },
  { title: "Reports", description: "Dashboards, governance, and continuous optimisation." },
];

const digitalEmployees = [
  { role: "Marketer", status: "In blueprint" },
  { role: "Closer", status: "Queued" },
  { role: "Operator", status: "Active" },
  { role: "Analyst", status: "In QA" },
];

export const metadata: Metadata = {
  title: "Client Portal — First Class AI",
};

export default async function PortalPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userName = session?.user?.name ?? "Client";
  const userEmail = session?.user?.email ?? "";

  const leads = userId
    ? await prisma.lead.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-12">
      <Card className="border-border/70 bg-white">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Welcome aboard, {userName}.
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 text-sm text-muted-foreground md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <p>
              Your dashboard keeps every sprint aligned. Track progress, review digital employees,
              and catch operator updates in one place.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Signed in as <span className="text-foreground">{userEmail}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-border px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Next actions
            <ul className="mt-3 space-y-2 text-left normal-case text-xs text-foreground">
              <li>Review your current sprint notes below.</li>
              <li>Share additional context via your dedicated Slack channel.</li>
              <li>Upload any new assets to the shared Drive link.</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Current mission plan</h1>
        <p className="text-sm text-muted-foreground">
          Here’s the current status of your First Class AI build. Your operator will update this
          space after every sprint.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="uppercase tracking-[0.18em] text-muted-foreground">
              Project timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeline.map((item, index) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="mt-1 h-6 w-6 rounded-full border border-border text-center text-xs font-semibold leading-6">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium uppercase tracking-[0.18em] text-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="uppercase tracking-[0.18em] text-muted-foreground">
              Digital employees
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {digitalEmployees.map((employee) => (
              <div key={employee.role} className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    {employee.role}
                  </p>
                  <p className="text-xs text-muted-foreground">Managed by First Class operators</p>
                </div>
                <Badge variant="outline" className="text-[0.6rem] uppercase tracking-[0.18em]">
                  {employee.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="uppercase tracking-[0.18em] text-muted-foreground">
              Assigned workstreams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {leads.length === 0 ? (
              <p>No workstreams assigned yet. Your operator will update this soon.</p>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-border px-4 py-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{lead.company ?? lead.name}</span>
                    <span>{formatStatus(lead.status)}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{lead.goal ?? "Blueprint in progress."}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Updated {formatDateTime(lead.updatedAt)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="uppercase tracking-[0.18em] text-muted-foreground">
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Message center launches soon. For now, your operator will keep the shared Notion &
              Slack updated.
            </p>
            <div className="rounded-2xl border border-border px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <p className="text-foreground">Workspace quick links</p>
              <ul className="mt-3 space-y-2 text-left normal-case text-xs text-foreground">
                <li>
                  <a href="#" className="underline">
                    Project Notion hub (coming soon)
                  </a>
                </li>
                <li>
                  <a href="#" className="underline">
                    Drive folder & deliverables
                  </a>
                </li>
                <li>
                  <a href="#" className="underline">
                    Slack channel
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function formatStatus(status: LeadStatus) {
  switch (status) {
    case LeadStatus.QUALIFIED:
      return "Qualified";
    case LeadStatus.BOOKED:
      return "Booked";
    case LeadStatus.WAITLIST:
      return "Waitlist";
    case LeadStatus.WON:
      return "Won";
    default:
      return status.toLowerCase();
  }
}
