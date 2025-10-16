"use client";

import * as React from "react";
import * as RadixLabel from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof RadixLabel.Root>,
  React.ComponentPropsWithoutRef<typeof RadixLabel.Root>
>(({ className, ...props }, ref) => (
  <RadixLabel.Root
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
