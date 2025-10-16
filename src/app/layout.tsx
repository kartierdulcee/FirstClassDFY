import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { auth } from "@/auth";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "First Class AI — Done-For-You Systems",
  description:
    "Minimal, premium systems that design, build, and deploy digital employees tailored for high-performing teams.",
  keywords: [
    "AI automation",
    "AI systems",
    "digital employees",
    "First Class AI",
    "automation agency",
  ],
  openGraph: {
    title: "First Class AI — Done-For-You Systems",
    description:
      "We build automated AI employees that replace entire departments with precision and polish.",
    url: "https://firstclass.ai",
    siteName: "First Class AI",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={cn(inter.variable, plexMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthSessionProvider session={session}>
          {children}
        </AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
