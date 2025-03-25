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

  const handleStatusUpdate = (newStatus: "open" | "completed") => {
    onStatusUpdate(ticket.id, newStatus);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden min-w-[300px] relative pb-[32px]">
      <div className="relative flex justify-between h-[32px] border-b border-gray-200 bg-[#FF6F61]/10">
        <div className="flex-1">
          <h3 className="text-[13px] text-gray-900 font-medium leading-tight p-2.5">
            {ticket.title}
          </h3>
        </div>
        {ticket.status === "completed" && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 shrink-0 px-1.5 py-0.5 rounded-full text-[10px] bg-green-50 text-green-600 border border-green-200 font-medium">
            Completed
          </span>
        )}
      </div>

      <div className="space-y-1.5 p-2.5">
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">Status:</span>{" "}
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">Submitter:</span>{" "}
          {ticket.submitter_name}
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">Created:</span>{" "}
          {ticket.created_at ? formatDate(ticket.created_at) : "N/A"}
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">Priority:</span>{" "}
          <span
            className={`font-medium ${
              ticket.priority.toLowerCase() === "high"
                ? "text-red-500"
                : ticket.priority.toLowerCase() === "medium"
                ? "text-amber-500"
                : "text-green-500"
            }`}
          >
            {ticket.priority.charAt(0).toUpperCase() +
              ticket.priority.slice(1).toLowerCase()}
          </span>
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">Location:</span> {ticket.location}
        </p>
        <div className="pt-1">
          <p className="text-[11px] text-gray-500 mb-1">Description:</p>
          <p className="text-[11px] text-gray-600 whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>

        {ticket.image_url && (
          <div className="mt-2">
            <p className="text-[11px] text-gray-500 mb-1">Image:</p>
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={ticket.image_url}
                alt="Issue"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gray-50 border-t border-gray-200 flex gap-2">
        {ticket.status === "open" ? (
          <button
            onClick={() => handleStatusUpdate("completed")}
            className="flex-1 px-2 py-0.5 text-[10px] font-medium text-white bg-[#FF6F61] rounded-full hover:bg-[#FF6F61]/90 transition-colors"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => handleStatusUpdate("open")}
            className="flex-1 px-2 py-0.5 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            Reopen
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 px-2 py-0.5 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
