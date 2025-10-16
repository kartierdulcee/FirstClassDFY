import { LeadStatus, type Lead } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDateTime } from "@/lib/utils";

type KanbanLead = Lead & {
  owner?: {
    name: string | null;
  } | null;
};

type KanbanColumn = {
  status: LeadStatus;
  title: string;
  description?: string;
};

type KanbanProps = {
  columns: KanbanColumn[];
  leads: KanbanLead[];
};

export function Kanban({ columns, leads }: KanbanProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {columns.map((column) => {
        const columnLeads = leads.filter((lead) => lead.status === column.status);
        return (
          <Card key={column.status} className="border-border/70">
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {column.title}
              </CardTitle>
              {column.description ? (
                <p className="text-xs text-muted-foreground">{column.description}</p>
              ) : null}
              <Badge variant="outline" className="text-[0.6rem] uppercase tracking-[0.18em]">
                {columnLeads.length} leads
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {columnLeads.length === 0 ? (
                <p className="text-xs text-muted-foreground">No leads in this column.</p>
              ) : (
                columnLeads.map((lead) => (
                  <div key={lead.id} className="rounded-2xl border border-border px-4 py-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      <span>{lead.company ?? lead.name}</span>
                      <span>{formatCurrency(lead.budget ?? undefined)}</span>
                    </div>
                    <p className="mt-2 text-sm text-foreground">{lead.goal ?? "—"}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{lead.owner?.name ?? "Unassigned"}</span>
                      <span>{formatDateTime(lead.updatedAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
