import type { Metadata } from "next";
import { CheckCircle, ClipboardList } from "lucide-react";

import { LeadForm } from "@/components/lead/LeadForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const promises = [
  "Blueprint built against your ops, not templates.",
  "Digital employees monitored by our human operators.",
  "Deployment in as little as two focused sprints.",
];

export const metadata: Metadata = {
  title: "Apply — First Class AI",
  description:
    "Tell us about your team so we can scope the AI systems and automations that move the needle.",
};

export default function ApplyPage() {
  return (
    <div className="grid gap-14 md:grid-cols-[0.9fr_minmax(0,0.75fr)] md:items-start md:gap-20">
      <div className="space-y-8">
        <Badge variant="outline" className="uppercase tracking-[0.18em]">
          Start Your Audit
        </Badge>
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Tell us where your bottlenecks live
          </h1>
          <p className="text-lg text-muted-foreground">
            Share the metrics, headcount, and constraints. We analyse every intake to
            confirm we can produce a 5× ROI in the first 90 days.
          </p>
        </div>
        <Card className="border-border/70">
          <CardHeader className="space-y-3">
            <CardTitle className="flex items-center gap-3 text-base font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <ClipboardList className="h-4 w-4" /> How we evaluate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              We run each application against three filters. We only move forward when
              we can ship undeniable outcomes.
            </p>
            <ul className="space-y-3">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 text-foreground" />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Budget $5k+/month · Readiness within 30 days · Team with clear owner
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="rounded-3xl border border-border bg-white p-8 shadow-subtle">
        <LeadForm />
      </div>
    </div>
  );
}
