import type { Metadata } from "next";
import { MailCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Check Your Email — First Class AI",
};

export default function VerifyRequestPage() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <MailCheck className="h-10 w-10" />
      <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent a secure magic link. It expires in ten minutes. Open it on this device to
        access your workspace.
      </p>
    </div>
  );
}
