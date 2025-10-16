import { Body, Container, Head, Html, Preview, Tailwind } from "@react-email/components";
import type { ReactNode } from "react";

type EmailLayoutProps = {
  children: ReactNode;
  previewText?: string;
};

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Tailwind>
        <Body className="bg-white font-sans text-[#0f172a]">
          <Container className="mx-auto my-10 w-full max-w-[520px] rounded-3xl border border-[#e2e8f0] px-12 py-10 shadow-sm">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
