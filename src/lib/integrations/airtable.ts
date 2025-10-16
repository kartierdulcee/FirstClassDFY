import { Lead } from "@prisma/client";

import { env, featureFlags } from "@/env";

export async function pushLeadToAirtable(
  lead: Lead & { owner?: { name: string | null; email: string | null } | null },
) {
  if (!featureFlags.airtableSync) {
    return;
  }

  const endpoint = `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`;

  await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Name: lead.name,
        Email: lead.email,
        Company: lead.company ?? "",
        Budget: lead.budget ?? null,
        Status: lead.status,
        "Timeframe": lead.timeframe ?? "",
        "Main Pain": lead.mainPain ?? "",
        Owner: lead.owner?.name ?? "",
        "Owner Email": lead.owner?.email ?? "",
        CreatedAt: lead.createdAt.toISOString(),
      },
    }),
  });
}
