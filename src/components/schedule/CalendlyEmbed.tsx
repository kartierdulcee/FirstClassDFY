"use client";

import { cn } from "@/lib/utils";

type CalendlyEmbedProps = {
  url: string;
  className?: string;
};

export function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-3xl border border-border shadow-subtle", className)}>
      <iframe
        src={`${url}?hide_gdpr_banner=1&primary_color=111111`}
        className="h-[720px] w-full"
        title="Schedule with First Class AI"
        loading="lazy"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}
