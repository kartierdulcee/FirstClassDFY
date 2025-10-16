import type { Metadata } from "next";
import { CalendarDays, ListChecks } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — First Class AI",
  description:
    "Your build briefing is locked in. Get ready to align on metrics, workflows, and digital employees.",
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 text-center">
      <div className="space-y-4">
        <Card className="border-border/70 bg-white">
          <CardHeader className="space-y-4">
            <CardTitle className="flex flex-col items-center gap-3 text-3xl font-semibold tracking-tight">
              <CalendarDays className="h-10 w-10" />
              You’re on the flight manifest
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              We just emailed you the briefing details. Add it to your calendar and loop in
              anyone who needs to be in the room. Our operators will show up with your
              customised blueprint.
            </p>
            <div className="rounded-2xl border border-border px-6 py-5 text-left">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <ListChecks className="h-4 w-4" /> Prep list
              </p>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li>Have metrics handy for acquisition, pipeline, and ops.</li>
                <li>Note the manual workflows you want replaced first.</li>
                <li>Bring questions about integrations, governance, and rollout.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
        <Button asChild variant="outline">
          <Link href="/portal">Go to portal</Link>
        </Button>
        <Button asChild>
          <Link href="/">Back to site</Link>
        </Button>
      </div>
    </div>
  );
}
