"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Something went wrong</p>
      <h1 className="text-3xl font-semibold tracking-tight">We hit unexpected turbulence</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Our operators have been notified. Try reloading the page or return home while we get things
        back on track.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
