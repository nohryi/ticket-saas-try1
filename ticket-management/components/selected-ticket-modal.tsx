import { memo } from "react";
import { Ticket } from "@/lib/types";
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
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FFEBEE] rounded-lg shadow-xl w-full max-w-xl mx-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{
          minWidth: "320px",
        }}
      >
        {/* Header with coral background - now outside scroll area */}
        <div className="bg-[#FF6F61] text-white py-3 px-4 rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-sm break-words flex-1 leading-relaxed">
              {ticket.title}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 rounded-full p-1 hover:bg-black/10 transition-colors flex-shrink-0"
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
        </div>

        {/* Scrollable content area */}
        <div className="overflow-y-auto flex-1">
          <div className="space-y-4 p-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {ticket.title}
              </h2>
              <div className="text-sm text-gray-500 space-y-0.5">
                <div>
                  <span className="font-medium">Status:</span> {ticket.status}
                </div>
                <div>
                  <span className="font-medium">Submitter:</span>{" "}
                  {ticket.submitter_name}
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {formatDate(ticket.created_at)}
                </div>
                <div>
                  <span className="font-medium">Priority:</span>{" "}
                  <span
                    className={`${
                      ticket.priority.toLowerCase() === "high"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Location:</span>{" "}
                  {ticket.location}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="font-medium">Description:</div>
              <div className="text-sm text-gray-600">{ticket.description}</div>
            </div>

            {ticket.key_issues && (
              <div className="space-y-1">
                <div className="font-medium">Key Issues:</div>
                <div className="text-sm text-gray-600">
                  {ticket.key_issues
                    .split("\n")
                    .map((issue: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 -ml-1">
                        <span>-</span>
                        <span>{issue.replace(/^[-•]\s*/, "")}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {ticket.immediate_impact && (
              <div className="space-y-1">
                <div className="font-medium">Immediate Impact:</div>
                <div className="text-sm text-gray-600">
                  {ticket.immediate_impact
                    .split("\n")
                    .map((impact: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 -ml-1">
                        <span>-</span>
                        <span>{impact.replace(/^[-•]\s*/, "")}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {ticket.attempted_solutions && (
              <div className="space-y-1">
                <div className="font-medium">Attempted Solutions:</div>
                <div className="text-sm text-gray-600">
                  {ticket.attempted_solutions
                    .split("\n")
                    .map((solution: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 -ml-1">
                        <span>-</span>
                        <span>{solution.replace(/^[-•]\s*/, "")}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {ticket.image_url && (
              <div className="mt-4">
                <div className="font-medium mb-2">Image:</div>
                <div className="w-3/4">
                  <img
                    src={ticket.image_url}
                    alt="Issue"
                    className="w-full h-auto rounded-lg"
                    onClick={() => onImageClick(ticket.image_url)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {ticket.status !== "completed" && (
                <button
                  onClick={() => {
                    onStatusUpdate(ticket.id, "completed");
                    onClose();
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SelectedTicketModal;
