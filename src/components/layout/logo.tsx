"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "font-semibold uppercase tracking-[0.22em] text-foreground transition hover:opacity-70",
        className,
      )}
    >
      FirstClass AI
    </Link>
  );
}
