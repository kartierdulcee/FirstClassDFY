import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const automationCategories = ["Marketing", "Sales", "Operations", "Reporting"];

const processSteps = [
  {
    title: "Audit",
    description: "Deep-dive assessment of your workflows, data, and service lines.",
  },
  {
    title: "Blueprint",
    description: "Design of AI employees, integrations, and success metrics.",
  },
  {
    title: "Build",
    description: "Custom automations, agents, and human-in-the-loop governance.",
  },
  {
    title: "Scale",
    description: "Launch, optimize, and expand into the rest of your org charts.",
  },
];

const proofStats = [
  { label: "Hours reclaimed", value: "40+ hrs/week" },
  { label: "Bookings lifted", value: "3× booked calls" },
  { label: "Ops velocity", value: "90% faster ops" },
];

const testimonials = [
  {
    name: "Coming Soon",
    quote:
      "First Class AI rebuilt our marketing operations in two sprints. The playbooks are exquisite.",
  },
  {
    name: "Coming Soon",
    quote:
      "We replaced three roles with digital employees that never sleep.",
  },
  {
    name: "Coming Soon",
    quote: "Their operators think like founders. The automation is just the outcome.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
        <div className="space-y-8">
          <Badge className="w-fit" variant="outline">
            Premium Done-For-You Systems
          </Badge>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
              Your business, rebuilt with AI. Done for you.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              We design, build, and deploy digital employees that replace entire
              departments with precision workflows, verified data, and human-level
              judgment.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/apply">
                Apply for AI Audit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#process">See the blueprint</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/sign-in">Client login</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Digital Employees
            </span>
            <span>Automation Studio</span>
            <span>Strategic Ops</span>
          </div>
        </div>
        <div className="grid gap-6 rounded-3xl border border-dashed border-border p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            What we automate
          </p>
          <div className="grid gap-3">
            {automationCategories.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between rounded-2xl border border-border px-5 py-4 text-sm"
              >
                <span className="font-medium tracking-[0.18em] uppercase">
                  {category}
                </span>
                <Check className="h-4 w-4 text-foreground" aria-hidden />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div className="space-y-1">
              <p className="font-medium uppercase tracking-[0.18em]">24/7</p>
              <p>AI operators that never sleep.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium uppercase tracking-[0.18em]">Human QA</p>
              <p>Human-in-the-loop review on every launch.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            The First Class blueprint
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Audit to scale in four focused sprints. Each one is shipped with
            meticulous documentation, SOPs, and operator coaching.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step) => (
            <Card key={step.title} className="h-full border-border/70">
              <CardHeader>
                <CardTitle className="text-lg font-medium uppercase tracking-[0.18em]">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="proof" className="space-y-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Proof crafted in the field
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Operators, marketers, and engineers working as one team. We bring
              you the compound gains of AI plus human systems design.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/apply">Start the intake</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {proofStats.map((stat) => (
            <Card key={stat.label} className="border-border/70 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {stat.value}
                </CardTitle>
                <CardDescription className="uppercase tracking-[0.22em]">
                  {stat.label}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={`${testimonial.name}-${index}`} className="border-border/70">
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                <p>“{testimonial.quote}”</p>
                <p className="uppercase tracking-[0.18em] text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
