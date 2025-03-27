import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "41Deg Ticket Management Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to 41Deg</h1>
        <p className="text-lg text-muted-foreground">
          Your ticket management system is ready. Use the navigation above to
          manage your tickets.
        </p>
      </div>
    </div>
  );
}
