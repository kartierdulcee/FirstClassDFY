import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { Role } from "@prisma/client";

import { env } from "@/env";
import { prisma } from "@/lib/prisma";
import { sendMagicLink } from "@/lib/email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    EmailProvider({
      from: env.RESEND_FROM_EMAIL,
      sendVerificationRequest: async ({ identifier, url }) => {
        await sendMagicLink({ to: identifier, verificationUrl: url });
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = (token.id as string) ?? session.user.id;
        session.user.role = (token.role as Role) ?? session.user.role;
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (!user.name) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: user.email?.split("@")[0] ?? "Client",
          },
        });
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);

export { handler as GET, handler as POST };
