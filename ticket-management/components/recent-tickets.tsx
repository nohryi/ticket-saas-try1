import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentTickets = [
  {
    id: "1",
    title: "Server Performance Issue",
    status: "open",
    priority: "high",
    assignee: {
      name: "Alex Thompson",
      email: "alex.t@41deg.com",
      avatar: "/avatars/01.png",
    },
    created: "2 hours ago",
  },
  {
    id: "2",
    title: "Login Page Not Loading",
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "Sarah Chen",
      email: "sarah.c@41deg.com",
      avatar: "/avatars/02.png",
    },
    created: "5 hours ago",
  },
  {
    id: "3",
    title: "Database Connection Error",
    status: "resolved",
    priority: "critical",
    assignee: {
      name: "Mike Johnson",
      email: "mike.j@41deg.com",
      avatar: "/avatars/03.png",
    },
    created: "1 day ago",
  },
  {
    id: "4",
    title: "API Documentation Update",
    status: "open",
    priority: "low",
    assignee: {
      name: "Lisa Park",
      email: "lisa.p@41deg.com",
      avatar: "/avatars/04.png",
    },
    created: "2 days ago",
  },
];

export function RecentTickets() {
  return (
    <div className="space-y-8">
      {recentTickets.map((ticket) => (
        <div key={ticket.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={ticket.assignee.avatar}
              alt={ticket.assignee.name}
            />
            <AvatarFallback>
              {ticket.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{ticket.title}</p>
            <p className="text-sm text-muted-foreground">
              {ticket.assignee.name} • {ticket.created}
            </p>
          </div>
          <div className={`ml-auto flex items-center gap-2`}>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                ticket.status === "open"
                  ? "bg-yellow-100 text-yellow-800"
                  : ticket.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {ticket.status}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                ticket.priority === "low"
                  ? "bg-gray-100 text-gray-800"
                  : ticket.priority === "medium"
                  ? "bg-orange-100 text-orange-800"
                  : ticket.priority === "high"
                  ? "bg-red-100 text-red-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {ticket.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
