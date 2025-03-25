import { Ticket } from "./types";

const API_BASE_URL = "http://localhost:3001/api";

export async function fetchTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/tickets`);
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
}

export async function fetchTicket(id: string): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }
  return response.json();
}

export async function updateTicketStatus(
  ticketId: string,
  status: "open" | "completed" | "in_progress"
): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }
  return response.json();
}

export async function createTicket(
  ticketData: Omit<Ticket, "id" | "created_at" | "updated_at">
): Promise<Ticket> {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });
  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }
  return response.json();
}
