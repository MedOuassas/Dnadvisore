import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "DNAvisore - Domain Search & Evaluation",
  description: "Real-time domain availability and AI-enhanced domain valuation SaaS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">DNAvisore</h1>
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-6xl px-6 pb-16">{children}</main>
      </body>
    </html>
  );
}
