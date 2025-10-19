"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navItems = [
  { href: "/#process", label: "Process" },
  { href: "/#proof", label: "Proof" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#apply", label: "Apply" },
];

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

export function SiteShell({
  children,
  className,
}: SiteShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="container flex max-w-5xl items-center justify-between py-5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground",
                  pathname === item.href && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/sign-in">Client Login</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger className="rounded-full border border-border p-3 md:hidden">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent className="bg-background">
              <Logo className="text-base" />
              <nav className="mt-10 flex flex-col gap-6 text-base">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Button asChild variant="ghost" className="mt-auto w-full">
                <Link href="/auth/sign-in">Client Login</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <div className={cn("container max-w-5xl px-6 py-16 md:py-20", className)}>
          {children}
        </div>
      </main>
      <footer className="border-t border-border/60 bg-white">
        <div className="container flex max-w-5xl flex-col gap-3 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} First Class AI. All rights reserved.</p>
          <div className="flex items-center gap-5 uppercase tracking-[0.18em]">
            <Link href="/apply" className="transition hover:text-foreground">
              Apply
            </Link>
            <Link href="/pricing" className="transition hover:text-foreground">
              See Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
