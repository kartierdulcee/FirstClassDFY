import { describe, expect, it } from "vitest";

import { validateEnv } from "@/env";

const REQUIRED_ENV = {
  DATABASE_URL: "https://example.com/database",
  NEXTAUTH_URL: "https://app.firstclass.ai",
  NEXTAUTH_SECRET: "super-secret",
  RESEND_API_KEY: "re_123",
  CALENDLY_ORG_URI: "https://api.calendly.com/organizations/abcd",
  CALENDLY_API_TOKEN: "cal_123",
  CALENDLY_WEBHOOK_SIGNING_KEY: "signing-key",
};

const OPTIONAL_ENV = {
  RESEND_FROM_EMAIL: "team@firstclass.ai",
  RESEND_INTERNAL_EMAIL: "ops@firstclass.ai",
  CALENDLY_SCHEDULING_URL: "https://calendly.com/first-class/briefing",
};

describe("validateEnv", () => {
  it("returns merged env with defaults", () => {
    const result = validateEnv({
      NODE_ENV: "test",
      AIRTABLE_API_KEY: undefined,
      AIRTABLE_BASE_ID: undefined,
      AIRTABLE_TABLE_NAME: undefined,
      ...REQUIRED_ENV,
      ...OPTIONAL_ENV,
    });

    expect(result.DATABASE_URL).toBe(REQUIRED_ENV.DATABASE_URL);
    expect(result.AIRTABLE_TABLE_NAME).toBe("Leads");
    expect(result.RESEND_FROM_EMAIL).toBe(OPTIONAL_ENV.RESEND_FROM_EMAIL);
  });

  it("throws when required variables are missing", () => {
    expect(() =>
      validateEnv({
        NODE_ENV: "test",
        DATABASE_URL: undefined,
        NEXTAUTH_URL: undefined,
        NEXTAUTH_SECRET: undefined,
        RESEND_API_KEY: undefined,
        CALENDLY_ORG_URI: undefined,
        CALENDLY_API_TOKEN: undefined,
        CALENDLY_WEBHOOK_SIGNING_KEY: undefined,
        CALENDLY_SCHEDULING_URL: undefined,
        RESEND_FROM_EMAIL: undefined,
        RESEND_INTERNAL_EMAIL: undefined,
        AIRTABLE_API_KEY: undefined,
        AIRTABLE_BASE_ID: undefined,
        AIRTABLE_TABLE_NAME: undefined,
      }),
    ).toThrow();
  });
});
