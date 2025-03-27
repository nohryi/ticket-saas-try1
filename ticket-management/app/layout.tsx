import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { SupabaseAuthProvider } from "@/lib/auth/SupabaseAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ticket Management System",
  description: "A modern ticket management system for maintenance requests",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" />
        <meta name="theme-color" content="#FF6F61" />
      </head>
      <body className={`${inter.className} light`} suppressHydrationWarning>
        <SupabaseAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LanguageProvider>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";
