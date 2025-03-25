import { memo } from "react";
import { Ticket } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

interface SelectedTicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onStatusUpdate: (id: string, status: "open" | "completed") => void;
  onImageClick: (imageUrl: string | undefined) => void;
}

const SelectedTicketModal = memo(function SelectedTicketModal({
  ticket,
  onClose,
  onStatusUpdate,
  onImageClick,
}: SelectedTicketModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#FFEBEE] rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto overscroll-contain will-change-transform scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          msOverflowStyle: "none" /* IE and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        {/* Header with coral background */}
        <div className="bg-[#FF6F61] text-white py-1.5 px-3 flex justify-between items-center sticky top-0 z-10 rounded-t-lg">
          <h3 className="font-bold text-sm pr-4">{ticket.title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 rounded-full p-1 hover:bg-black/10 transition-colors"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content with smaller text */}
        <div className="p-3 space-y-2 rounded-b-lg">
          {/* Submitter Name */}
          <div>
            <p className="text-[10px] font-medium text-gray-600">
              Submitted By
            </p>
            <p className="text-xs">{ticket.submitter_name}</p>
          </div>

          {/* Dates and Priority Section */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] font-medium text-gray-600">
                Ticket Date
              </p>
              <p className="text-xs">{formatDate(ticket.created_at)}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium text-gray-600">Priority</p>
              <p className="text-xs">{ticket.priority}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[10px] font-medium text-gray-600">Location</p>
            <p className="text-xs">{ticket.location}</p>
          </div>

          {/* Details */}
          <div>
            <p className="text-[10px] font-medium text-gray-600">Details</p>
            <p className="text-xs whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Image */}
          {ticket.image_url && (
            <div>
              <p className="text-[10px] font-medium text-gray-600 mb-1">
                Image
              </p>
              <div className="h-48 w-full rounded-lg overflow-hidden">
                <img
                  src={ticket.image_url}
                  alt="Ticket"
                  className="w-full h-full object-cover"
                  onClick={() => onImageClick(ticket.image_url)}
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Status and Actions */}
          <div className="pt-2 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-medium text-gray-600">Status</p>
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-medium ${
                  ticket.status === "open"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </div>
            {ticket.status === "open" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusUpdate(ticket.id, "completed");
                  onClose();
                }}
                className="bg-green-500 text-white text-[10px] font-bold py-1 px-2 rounded hover:bg-green-600"
              >
                Complete
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusUpdate(ticket.id, "open");
                  onClose();
                }}
                className="bg-blue-500 text-white text-[10px] font-bold py-1 px-2 rounded hover:bg-blue-600"
              >
                Re-open Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SelectedTicketModal;
