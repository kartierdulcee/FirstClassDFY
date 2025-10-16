import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const links = [{ href: "/portal", label: "Portal" }];
  if (session.user.role === "ADMIN") {
    links.push({ href: "/admin", label: "Admin" });
  }

  return (
    <DashboardShell links={links} userName={session.user.name}>
      {children}
    </DashboardShell>
  );
}
