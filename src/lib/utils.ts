import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const QUALIFICATION_BUDGET_THRESHOLD = 5000;
export const QUALIFICATION_TIMEFRAMES = new Set(["now", "30d"]);

export function isQualifiedLead(budget?: number | null, timeframe?: string | null) {
  if (!budget || budget < QUALIFICATION_BUDGET_THRESHOLD) {
    return false;
  }

  if (!timeframe) {
    return false;
  }

  return QUALIFICATION_TIMEFRAMES.has(timeframe.toLowerCase());
}

export function formatCurrency(value?: number | null, currency: string = "USD") {
  if (value == null) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(input?: Date | string | null) {
  if (!input) return "—";
  const value = typeof input === "string" ? new Date(input) : input;
  return value.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
