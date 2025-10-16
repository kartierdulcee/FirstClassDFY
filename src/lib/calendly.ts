import crypto from "node:crypto";

import { env } from "@/env";

type SignatureParts = {
  t: string;
  v1: string;
};

export function verifyCalendlySignature(signatureHeader: string | null, payload: string) {
  if (!signatureHeader) return false;

  const parts = signatureHeader.split(",").reduce<Partial<SignatureParts>>((acc, part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      acc[key.trim() as keyof SignatureParts] = value.trim();
    }
    return acc;
  }, {});

  if (!parts.t || !parts.v1) {
    return false;
  }

  const signed = `${parts.t}.${payload}`;
  const digest = crypto
    .createHmac("sha256", env.CALENDLY_WEBHOOK_SIGNING_KEY)
    .update(signed)
    .digest("hex");

  const expected = Buffer.from(digest);
  const received = Buffer.from(parts.v1);

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}

export type CalendlyWebhook = {
  event: string;
  payload: {
    event: {
      uri: string;
      start_time: string;
      start_time_pretty?: string;
      location?: {
        join_url?: string;
      } | null;
    };
    invitee: {
      email: string;
      name: string;
    };
  };
};
