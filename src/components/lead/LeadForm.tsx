"use client";

import { useActionState, useState } from "react";

import { leadFormInitialState, createLeadAction } from "@/components/lead/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const timeframeOptions = [
  { label: "Immediately", value: "now" },
  { label: "Within 30 days", value: "30d" },
  { label: "60 days or more", value: "60d+" },
];

const mainPainOptions = [
  { label: "Lead generation", value: "leads" },
  { label: "Operations", value: "ops" },
  { label: "Time", value: "time" },
];

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(
    createLeadAction,
    leadFormInitialState,
  );
  const [mainPain, setMainPain] = useState<string | undefined>();
  const [timeframe, setTimeframe] = useState<string | undefined>();

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="source" value="site" />
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Name" name="name" error={state.errors?.name}>
          <Input id="name" name="name" placeholder="Jane Founder" required />
        </FormField>
        <FormField label="Email" name="email" error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
          />
        </FormField>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Company" name="company" error={state.errors?.company}>
          <Input id="company" name="company" placeholder="Company name" />
        </FormField>
        <FormField label="Website" name="website" error={state.errors?.website}>
          <Input id="website" name="website" placeholder="https://" />
        </FormField>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Niche" name="niche" error={state.errors?.niche}>
          <Input id="niche" name="niche" placeholder="B2B SaaS, coaching, DTC…" />
        </FormField>
        <FormField label="Current monthly revenue" name="revenue" error={state.errors?.revenue}>
          <Input id="revenue" name="revenue" inputMode="numeric" placeholder="50000" />
        </FormField>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Budget for AI systems (USD)" name="budget" error={state.errors?.budget}>
          <Input id="budget" name="budget" inputMode="numeric" placeholder="7500" />
        </FormField>
        <FormField label="Primary bottleneck" name="mainPain" error={state.errors?.mainPain}>
          <input type="hidden" name="mainPain" value={mainPain ?? ""} />
          <Select
            value={mainPain}
            onValueChange={setMainPain}
            disabled={isPending}
          >
            <SelectTrigger id="mainPain">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {mainPainOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <FormField label="What outcome are you chasing?" name="goal" error={state.errors?.goal}>
        <Textarea
          id="goal"
          name="goal"
          placeholder="Walk us through the metrics, manual steps, or team impact you expect."
          rows={5}
        />
      </FormField>
      <FormField label="When do you want to start?" name="timeframe" error={state.errors?.timeframe}>
        <input type="hidden" name="timeframe" value={timeframe ?? ""} />
        <Select
          value={timeframe}
          onValueChange={setTimeframe}
          disabled={isPending}
        >
          <SelectTrigger id="timeframe">
            <SelectValue placeholder="Pick a timeframe" />
          </SelectTrigger>
          <SelectContent>
            {timeframeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
      {state.status === "waitlist" && state.message ? (
        <p className="rounded-2xl border border-border bg-muted px-5 py-4 text-sm text-muted-foreground">
          {state.message}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p className="rounded-2xl border border-border bg-white px-5 py-4 text-sm text-red-600">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={isPending} className="w-full md:w-auto">
        {isPending ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  error?: string[];
  children: React.ReactNode;
};

function FormField({ label, name, error, children }: FormFieldProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error?.length ? (
        <p className="text-xs uppercase tracking-[0.18em] text-red-600">
          {error.join(" ")}
        </p>
      ) : null}
    </div>
  );
}
