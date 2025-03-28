"use client";

import type React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Ticket } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface ExistingTicketProps {
  ticket: Ticket;
  onClose: () => void;
  onStatusUpdate: (
    ticketId: string,
    newStatus: "open" | "completed"
  ) => Promise<void>;
}

export default function ExistingTicket({
  ticket,
  onClose,
  onStatusUpdate,
}: ExistingTicketProps) {
  const { translations } = useLanguage();

  const handleStatusUpdate = async (newStatus: "open" | "completed") => {
    try {
      await onStatusUpdate(ticket.id, newStatus);
      onClose();
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden min-w-[300px] relative pb-[32px] border-2 border-[#FF6F61]/40 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative flex justify-between h-[32px] border-b border-[#FF6F61]/40 bg-[#FF6F61]/35">
        <div className="flex-1">
          <h3 className="text-[13px] text-gray-900 font-semibold tracking-tight px-2.5 h-[32px] flex items-center">
            {ticket.title}
          </h3>
        </div>
        {ticket.status === "completed" && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 shrink-0 px-1.5 py-0.5 rounded-full text-[10px] bg-green-50 text-green-600 border border-green-200 font-medium">
            {translations.common.status.completed}
          </span>
        )}
      </div>

      <div className="space-y-1.5 p-2.5">
        <p className="!text-[11px] !leading-none text-gray-600">
          <span className="!text-[11px] !leading-none text-gray-500">
            {translations.tickets.details.status}:
          </span>{" "}
          {ticket.status === "open"
            ? translations.common.status.open
            : translations.common.status.completed}
        </p>
        <p className="!text-[11px] !leading-none text-gray-600">
          <span className="!text-[11px] !leading-none text-gray-500">
            {translations.tickets.details.submitter}:
          </span>{" "}
          {ticket.submitter_name}
        </p>
        <p className="!text-[11px] !leading-none text-gray-600">
          <span className="!text-[11px] !leading-none text-gray-500">
            {translations.tickets.details.created}:
          </span>{" "}
          {ticket.created_at ? formatDate(ticket.created_at) : "N/A"}
        </p>
        <p className="!text-[11px] !leading-none text-gray-600">
          <span className="!text-[11px] !leading-none text-gray-500">
            {translations.tickets.details.priority}:
          </span>{" "}
          <span
            className={`!text-[11px] !leading-none font-medium ${
              ticket.priority.toLowerCase() === "high"
                ? "text-red-500"
                : ticket.priority.toLowerCase() === "medium"
                ? "text-amber-500"
                : "text-green-500"
            }`}
          >
            {ticket.priority === "High"
              ? translations.common.priority.high
              : ticket.priority === "Medium"
              ? translations.common.priority.medium
              : translations.common.priority.low}
          </span>
        </p>
        <p className="!text-[11px] !leading-none text-gray-600">
          <span className="!text-[11px] !leading-none text-gray-500">
            {translations.tickets.details.location}:
          </span>{" "}
          {ticket.location}
        </p>
        <div className="pt-1">
          <p className="!text-[11px] !leading-none text-gray-500 mb-1">
            {translations.tickets.details.description}:
          </p>
          <p className="!text-[11px] !leading-none text-gray-600 whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>

        {ticket.image_url && (
          <div className="mt-2">
            <p className="text-[11px] text-gray-500 mb-1">
              {translations.tickets.details.image}:
            </p>
            <div
              className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-zoom-in transition-transform hover:shadow-lg"
              onClick={() => {
                const modal = document.createElement("div");
                modal.className =
                  "fixed inset-0 bg-black/80 flex items-center justify-center z-[300] p-4";
                modal.onclick = (e) => {
                  if (e.target === modal) {
                    document.body.removeChild(modal);
                  }
                };

                const img = document.createElement("img");
                img.src = ticket.image_url || "";
                img.className =
                  "max-w-[80vw] max-h-[80vh] object-contain transform transition-transform duration-200 hover:scale-150";
                img.style.cursor = "zoom-in";
                img.onclick = () => {
                  if (img.style.transform === "scale(2)") {
                    img.style.transform = "scale(1)";
                    img.style.cursor = "zoom-in";
                  } else {
                    img.style.transform = "scale(2)";
                    img.style.cursor = "zoom-out";
                  }
                };

                modal.appendChild(img);
                document.body.appendChild(modal);
              }}
            >
              <img
                src={ticket.image_url}
                alt={translations.tickets.details.image}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-white flex gap-2">
        {ticket.status === "open" ? (
          <button
            onClick={() => handleStatusUpdate("completed")}
            className="flex-1 px-2 py-0.5 text-[10px] font-medium text-white bg-[#FF6F61] rounded-full hover:bg-[#FF6F61]/90 transition-colors"
          >
            {translations.common.actions.complete}
          </button>
        ) : (
          <button
            onClick={() => handleStatusUpdate("open")}
            className="flex-1 px-2 py-0.5 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            {translations.common.actions.reopen}
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          {translations.common.actions.close}
        </button>
      </div>
    </div>
  );
}
