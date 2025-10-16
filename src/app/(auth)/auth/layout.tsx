import type { ReactNode } from "react";

import { Logo } from "@/components/layout/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
          <Logo />
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Secure Access
          </p>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-white p-10 shadow-subtle">
          {children}
        </div>
      </main>
    </div>
  );
}
