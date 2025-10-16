import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    RESEND_FROM_EMAIL: z.string().email().optional(),
    RESEND_INTERNAL_EMAIL: z.string().email().optional(),
    CALENDLY_ORG_URI: z.string().url(),
    CALENDLY_API_TOKEN: z.string().min(1),
    CALENDLY_WEBHOOK_SIGNING_KEY: z.string().min(1),
    CALENDLY_SCHEDULING_URL: z.string().url().optional(),
    AIRTABLE_API_KEY: z.string().optional(),
    AIRTABLE_BASE_ID: z.string().optional(),
    AIRTABLE_TABLE_NAME: z.string().optional(),
  })
  .transform((values) => ({
    ...values,
    AIRTABLE_TABLE_NAME: values.AIRTABLE_TABLE_NAME ?? "Leads",
    RESEND_FROM_EMAIL:
      values.RESEND_FROM_EMAIL ?? "First Class AI <ops@firstclassai.com>",
    RESEND_INTERNAL_EMAIL:
      values.RESEND_INTERNAL_EMAIL ??
      values.RESEND_FROM_EMAIL ??
      "ops@firstclassai.com",
  }));

const rawEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  RESEND_INTERNAL_EMAIL: process.env.RESEND_INTERNAL_EMAIL,
  CALENDLY_ORG_URI: process.env.CALENDLY_ORG_URI,
  CALENDLY_API_TOKEN: process.env.CALENDLY_API_TOKEN,
  CALENDLY_WEBHOOK_SIGNING_KEY: process.env.CALENDLY_WEBHOOK_SIGNING_KEY,
  CALENDLY_SCHEDULING_URL: process.env.CALENDLY_SCHEDULING_URL,
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME,
};

export function validateEnv(input: typeof rawEnv) {
  const parsed = envSchema.safeParse(input);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

export const env = validateEnv(rawEnv);

export const featureFlags = {
  airtableSync: Boolean(env.AIRTABLE_API_KEY && env.AIRTABLE_BASE_ID),
};
