import { LeadStatus } from "@prisma/client";
import type { Metadata } from "next";

import {
  assignLeadOwnerAction,
  syncLeadToAirtableAction,
  updateLeadStatusAction,
} from "@/app/(dashboard)/admin/actions";
import { auth } from "@/auth";
import { Kanban } from "@/components/dashboard/Kanban";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { featureFlags } from "@/env";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin — First Class AI",
};

export default async function AdminPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const [leads, users] = await Promise.all([
    prisma.lead.findMany({
      include: { owner: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const columns = [
    { status: LeadStatus.NEW, title: "New" },
    { status: LeadStatus.QUALIFIED, title: "Qualified" },
    { status: LeadStatus.BOOKED, title: "Booked" },
  ];

  const qualified = leads.filter((lead) => lead.status === LeadStatus.QUALIFIED);
  const waitlist = leads.filter((lead) => lead.status === LeadStatus.WAITLIST);
  const bookedThisWeek = leads.filter((lead) => {
    if (lead.status !== LeadStatus.BOOKED || !lead.updatedAt) return false;
    const diff = Date.now() - lead.updatedAt.getTime();
    return diff <= 1000 * 60 * 60 * 24 * 7;
  });

  return (
    <div className="space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Lead pipeline</h1>
        <p className="text-sm text-muted-foreground">
          Track, assign, and trigger follow-ups. Calendly bookings are automatically marked as booked.
        </p>
      </section>

      <Kanban columns={columns} leads={leads} />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Lead views</h2>
        <AdminTable
          title="Qualified"
          description="Ready to book. Ensure invites are sent and operator assigned."
          leads={qualified}
          users={users}
        />
        <AdminTable
          title="Booked this week"
          description="Upcoming sessions that need prep and recap notes."
          leads={bookedThisWeek}
          users={users}
        />
        <AdminTable
          title="Waitlist"
          description="Nurture these leads until capacity opens up."
          leads={waitlist}
          users={users}
        />
      </section>
    </div>
  );
}

type AdminTableProps = {
  title: string;
  description: string;
  leads: Awaited<ReturnType<typeof prisma.lead.findMany>>;
  users: Awaited<ReturnType<typeof prisma.user.findMany>>;
};

function AdminTable({ title, description, leads, users }: AdminTableProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge variant="outline" className="text-[0.6rem] uppercase tracking-[0.18em]">
          {leads.length} leads
        </Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                Nothing to show yet.
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  {lead.company ?? lead.name}
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {lead.source ?? "site"}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <p>{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(lead.budget ?? undefined)}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>
                  <form action={assignLeadOwnerAction} className="flex items-center gap-2">
                    <input type="hidden" name="leadId" value={lead.id} />
                    <select
                      name="ownerId"
                      defaultValue={lead.ownerId ?? ""}
                      className="rounded-xl border border-border bg-white px-2 py-1 text-xs"
                    >
                      <option value="">Unassigned</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name ?? user.email}
                        </option>
                      ))}
                    </select>
                    <Button type="submit" variant="ghost" size="sm">
                      Save
                    </Button>
                  </form>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(lead.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <form action={updateLeadStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="leadId" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-xl border border-border bg-white px-2 py-1 text-xs"
                      >
                        {Object.values(LeadStatus).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" variant="ghost" size="sm">
                        Update
                      </Button>
                    </form>
                    {featureFlags.airtableSync ? (
                      <form action={syncLeadToAirtableAction}>
                        <input type="hidden" name="leadId" value={lead.id} />
                        <Button type="submit" variant="outline" size="sm">
                          Sync Airtable
                        </Button>
                      </form>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
