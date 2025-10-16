"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignInFormProps = {
  callbackUrl?: string;
};

export function SignInForm({ callbackUrl }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setStatus("loading");

    const result = await signIn("email", {
      email,
      callbackUrl: callbackUrl ?? "/portal",
      redirect: false,
    });

    if (result?.error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending link…" : "Send magic link"}
      </Button>
      {status === "sent" ? (
        <p className="rounded-2xl border border-border bg-muted px-4 py-3 text-xs text-muted-foreground">
          Check your inbox—we just sent a secure link.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-2xl border border-border bg-white px-4 py-3 text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
