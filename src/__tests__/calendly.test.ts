import crypto from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

const SIGNING_KEY = "test-signing-key";

async function loadModule() {
  const calendlyModule = await import("@/lib/calendly");
  return calendlyModule;
}

describe("Calendly signature", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.doMock("@/env", () => ({
      env: {
        CALENDLY_WEBHOOK_SIGNING_KEY: SIGNING_KEY,
      },
      featureFlags: { airtableSync: false },
    }));
  });

  it("validates a correct signature", async () => {
    const body = JSON.stringify({ hello: "world" });
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
      .createHmac("sha256", SIGNING_KEY)
      .update(`${timestamp}.${body}`)
      .digest("hex");

    const { verifyCalendlySignature } = await loadModule();

    expect(verifyCalendlySignature(`t=${timestamp},v1=${signature}`, body)).toBe(true);
  });

  it("rejects an invalid signature", async () => {
    const body = JSON.stringify({ hello: "world" });
    const timestamp = Math.floor(Date.now() / 1000);

    const { verifyCalendlySignature } = await loadModule();

    expect(
      verifyCalendlySignature(`t=${timestamp},v1=invalid-signature`, body),
    ).toBe(false);
  });
});
