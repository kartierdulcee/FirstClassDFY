"use client";

import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

export type DashboardNavLink = {
  href: string;
  label: string;
};

type DashboardShellProps = {
  children: ReactNode;
  links: DashboardNavLink[];
  userName?: string | null;
};

export function DashboardShell({ children, links, userName }: DashboardShellProps) {
  const pathname = usePathname();
  const initials = useMemo(() => {
    if (!userName) return "FC";
    return userName
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  }, [userName]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-muted-foreground transition hover:text-foreground",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
              {initials}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex flex-1 justify-center px-6 py-14">
        <div className="w-full max-w-6xl space-y-10">{children}</div>
      </main>
    </div>
  );
}
