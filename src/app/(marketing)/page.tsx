import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const heroProofPoints = [
  "40+ hours/week saved",
  "3× more calls booked",
  "90% faster ops velocity",
];

const painPoints = [
  "Endless email follow-up and manual lead chasing.",
  "Spreadsheet reporting stitched together at midnight.",
  "Operators firefighting instead of improving the business.",
];

const systemHighlights = [
  "Dashboards that surface every KPI in real time.",
  "Automations that fulfill, update, and escalate without being asked.",
  "AI employees that run 24/7 with human QA on every launch.",
];

const blueprintSteps = [
  {
    title: "Audit",
    description: "Find where you bleed time.",
  },
  {
    title: "Blueprint",
    description: "Architect your AI workforce.",
  },
  {
    title: "Build",
    description: "Deploy digital employees in days.",
  },
  {
    title: "Scale",
    description: "Optimize and expand to other departments.",
  },
];

const clientResults = [
  {
    title: "Agency saved 40 hours/week",
    description: "using AI Operator to take over fulfillment and reporting.",
  },
  {
    title: "Med Spa tripled call bookings",
    description: "with an AI Closer that qualifies and schedules 24/7.",
  },
  {
    title: "E-com store automated fulfillment",
    description: "and inventory updates end-to-end with AI Analysts.",
  },
];

const digitalEmployees = [
  {
    role: "AI Marketer",
    func: "Runs paid media & content",
    outcome: "Consistent inbound flow",
  },
  {
    role: "AI Closer",
    func: "Books & qualifies calls",
    outcome: "More deals without hiring",
  },
  {
    role: "AI Operator",
    func: "Handles delivery & updates",
    outcome: "Zero missed tasks",
  },
  {
    role: "AI Analyst",
    func: "Audits performance & ROI",
    outcome: "Decisions from live data",
  },
];

const faqItems = [
  {
    question: "What is an AI Employee?",
    answer:
      "A trained automation + human QA stack that runs a full role — from prospecting to reporting — with reliable handoffs to your team.",
  },
  {
    question: "How fast is setup?",
    answer:
      "We deliver the full blueprint, builds, and launch inside four weeks, with immediate wins landing during week two.",
  },
  {
    question: "Can I integrate this with my CRM?",
    answer:
      "Yes. We connect to HubSpot, Salesforce, HighLevel, Airtable, and any system with an API or webhook.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We’ve shipped in services, SaaS, e-commerce, and regional operations teams — any workflow with repeatable tasks and defined outcomes.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="flex flex-col items-center gap-10 text-center">
        <Badge className="mx-auto w-fit" variant="outline">
          Premium Done-For-You Systems
        </Badge>
        <h1 className="max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="block">Turn operations into automation.</span>
          <span className="mt-3 block text-foreground/90">
            Deploy AI employees that sell, fulfill, and report — 24/7.
          </span>
          <span className="mt-3 block text-foreground/80">
            Work once. Scale forever.
          </span>
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#apply">
              Get Your AI Audit
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="#proof">
              See 3 Client Results
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {heroProofPoints.map((point) => (
            <span
              key={point}
              className="flex items-center gap-2 rounded-full border border-border/70 bg-white px-4 py-2 shadow-subtle"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Manual systems are killing your scale.
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            Businesses lose hundreds of hours each month chasing leads, sending
            reports, and managing chaos. We replace that with AI employees
            trained to handle your workflows end-to-end — so your humans can
            finally focus on growth.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-subtle">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The old way
            </p>
            <div className="mt-4 space-y-3 text-left text-sm text-muted-foreground">
              {painPoints.map((pain) => (
                <div key={pain} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 text-destructive" aria-hidden />
                  <span>{pain}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-muted/40 px-5 py-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Emails, spreadsheets, late nights, repeat.
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-foreground p-8 text-left text-background shadow-subtle">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70">
              The First Class system
            </p>
            <div className="mt-4 space-y-3 text-sm text-background/90">
              {systemHighlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4" aria-hidden />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-border/60 bg-background px-5 py-4 text-xs uppercase tracking-[0.16em] text-foreground">
              Clean dashboards, automated workflows, rested teams.
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            The First Class Blueprint — 4 weeks to a fully automated business.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A four-week sprint to document, deploy, and launch AI employees that
            run your most critical workflows with precision.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {blueprintSteps.map((step, index) => (
            <Card
              key={step.title}
              className="h-full border-border/70 bg-white text-left shadow-subtle"
            >
              <CardHeader className="space-y-2">
                <Badge variant="outline" className="w-fit uppercase tracking-[0.16em]">
                  Week {index + 1}
                </Badge>
                <CardTitle className="text-lg font-semibold tracking-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Week 1–4 delivery • Outcomes and playbooks in every sprint
        </p>
      </section>

      <section id="proof" className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Systems that pay for themselves within 30 days.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Every deployment combines autonomous agents with human QA so you get
            predictable coverage, faster revenue, and lower headcount costs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {clientResults.map((result) => (
            <Card
              key={result.title}
              className="flex h-full flex-col justify-between border-border/70 bg-white p-6 text-left shadow-subtle"
            >
              <div className="space-y-3">
                <CardTitle className="text-xl font-semibold">
                  {result.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {result.description}
                </CardDescription>
              </div>
              <CardContent className="mt-6 p-0">
                <Link
                  href="/proof"
                  className="inline-flex items-center text-sm font-semibold tracking-tight text-foreground underline-offset-4 hover:underline"
                >
                  See the system they used
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Your digital employee lineup.
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Productized roles that run like software, deliver like ops leaders,
            and expand with every sprint.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-subtle">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr] border-b border-border/70 bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid">
            <span>Role</span>
            <span>Function</span>
            <span>Outcome</span>
          </div>
          <div className="divide-y divide-border/60">
            {digitalEmployees.map((employee) => (
              <div
                key={employee.role}
                className="grid gap-3 px-6 py-6 text-left md:grid-cols-[1.5fr_1fr_1fr]"
              >
                <div>
                  <p className="text-lg font-semibold tracking-tight">
                    {employee.role}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground md:hidden">
                    Function • Outcome
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{employee.func}</p>
                <p className="text-sm text-foreground">{employee.outcome}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="#apply">
              Build Your AI Department
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section
        id="apply"
        className="space-y-6 rounded-3xl border border-border bg-white p-10 text-center shadow-subtle"
      >
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Apply for your AI Audit — only 5 businesses per month.
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          We only onboard a handful of companies monthly to ensure systems hit
          targets. Fill the short form below — our team will audit your
          operations and show where AI replaces the grind.
        </p>
        <div className="flex flex-col items-center gap-2">
          <Button asChild size="lg">
            <Link href="/apply">
              Apply for AI Audit
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <p className="text-sm font-medium text-destructive">
            Next onboarding window closes in 3 days.
          </p>
        </div>
      </section>

      <section className="space-y-10 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-8 shadow-subtle">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            “We replaced three roles with digital employees — and our ops never
            slept again.”
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            First Class AI Client
          </p>
        </div>
      </section>

      <footer className="space-y-10 border-t border-border/70 pt-12">
        <div className="mx-auto grid max-w-4xl gap-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-border bg-white px-6 py-4 shadow-subtle"
            >
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          First Class AI — The Operating System for Modern Businesses.
        </p>
      </footer>
    </div>
  );
}
