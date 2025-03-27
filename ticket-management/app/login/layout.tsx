import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Ticket Management System",
  description: "Sign in to access your ticket management dashboard",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
