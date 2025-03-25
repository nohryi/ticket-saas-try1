import { memo } from "react";
import { Ticket } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { translations } = useLanguage();

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
        <div className="p-3 space-y-2 rounded-b-lg text-[10px] !leading-normal">
          {/* Submitter Name */}
          <div>
            <p className="!text-[10px] text-gray-500">
              {translations.tickets.details.submitter}:
            </p>
            <p className="!text-[10px]">{ticket.submitter_name}</p>
          </div>

          {/* Dates and Priority Section */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="!text-[10px] text-gray-500">
                {translations.tickets.details.created}:
              </p>
              <p className="!text-[10px]">{formatDate(ticket.created_at)}</p>
            </div>
            <div>
              <p className="!text-[10px] text-gray-500">
                {translations.tickets.details.priority}:
              </p>
              <p className="!text-[10px]">{ticket.priority}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="!text-[10px] text-gray-500">
              {translations.tickets.details.location}:
            </p>
            <p className="!text-[10px]">{ticket.location}</p>
          </div>

          {/* Details */}
          <div>
            <p className="!text-[10px] text-gray-500">
              {translations.tickets.details.description}:
            </p>
            <p className="!text-[10px] whitespace-pre-wrap">
              {ticket.description}
            </p>
          </div>

          {/* Image */}
          {ticket.image_url && (
            <div>
              <p className="text-[10px] font-medium text-gray-600 mb-1">
                {translations.tickets.details.image}
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
              <p className="text-[10px] font-medium text-gray-600">
                {translations.tickets.details.status}
              </p>
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-medium ${
                  ticket.status === "open"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {ticket.status === "open"
                  ? translations.common.status.open
                  : translations.common.status.completed}
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
                {translations.common.actions.complete}
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
                {translations.common.actions.reopen}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default SelectedTicketModal;
