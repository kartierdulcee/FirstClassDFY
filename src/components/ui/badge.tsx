"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.08em]",
      variant === "default" &&
        "border-transparent bg-foreground text-background",
      variant === "outline" &&
        "border-border bg-transparent text-foreground",
      className,
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
