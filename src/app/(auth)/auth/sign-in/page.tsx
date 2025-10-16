import type { Metadata } from "next";
import Link from "next/link";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In — First Class AI",
  description: "Access the client or admin workspace with a secure magic link.",
};

type SignInPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl;

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Access your workspace</h1>
        <p className="text-sm text-muted-foreground">
          Use the email you registered with. We’ll send a secure magic link to your inbox.
        </p>
      </div>
      <SignInForm callbackUrl={callbackUrl} />
      <p className="text-xs text-muted-foreground">
        Need access? Reach out to your First Class AI operator or email
        <Link href="mailto:ops@firstclassai.com" className="ml-1 underline">
          ops@firstclassai.com
        </Link>
        .
      </p>
    </div>
  );
}
