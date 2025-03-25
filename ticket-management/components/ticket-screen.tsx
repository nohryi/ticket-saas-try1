"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ExistingTicket from "@/components/existing-ticket";
import NewTicket from "@/components/new-ticket";
import { Ticket } from "@/lib/types";
import { fetchTickets, updateTicketStatus, createTicket } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import SelectedTicketModal from "@/components/selected-ticket-modal";
import SortMenu, { SortField, SortDirection } from "@/components/sort-menu";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

type FilterType = "all" | "open" | "completed";

// Define NewTicketForm type to match the form fields
interface NewTicketForm {
  submitter_name: string;
  title: string;
  priority: string;
  location: string;
  description: string;
  incident_time?: string;
  image?: File;
}

interface SortableTicketProps {
  ticket: Ticket;
  index: number;
  onTicketClick: (ticket: Ticket, e: React.MouseEvent) => void;
  onStatusUpdate: (
    ticketId: string,
    newStatus: "open" | "completed" | "in_progress"
  ) => void;
  translations: any; // Keep as any since we don't have the translations type
  onImageClick: (imageUrl: string | undefined) => void;
}

function SortableTicket({
  ticket,
  index,
  onTicketClick,
  onStatusUpdate,
  translations,
  onImageClick,
}: SortableTicketProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: ticket.id,
      animateLayoutChanges: ({ isSorting }) => !isSorting,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 1000 : 1,
        position: "relative" as const,
        height: "100%",
        touchAction: "none",
        transition: isDragging
          ? "none"
          : "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
      }
    : {
        position: "relative" as const,
        height: "100%",
        touchAction: "none",
        transition: "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
      };

  const [isClicking, setIsClicking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsClicking(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsClicking(false);
    }, 200);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isClicking && !isDragging) {
      onTicketClick(ticket, e);
    }
    setIsClicking(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`bg-white rounded-lg cursor-grab active:cursor-grabbing hover:shadow-lg transition-all border-2 border-[#FF6F61]/40 overflow-hidden group relative pb-[32px] hover:border-[#FF6F61]/60 ${
        isDragging ? "shadow-2xl scale-[1.02]" : ""
      } outline outline-1 outline-black/10`}
    >
      {/* Header */}
      <div className="relative flex justify-between h-[32px] border-b border-[#FF6F61]/40 bg-[#FF6F61]/35">
        <div className="flex-1 group/title relative">
          <h3 className="text-[13px] text-gray-900 font-semibold tracking-tight px-2.5 h-[32px] flex items-center whitespace-nowrap">
            {ticket.title.length > 28
              ? `${ticket.title.slice(0, 28)}...`
              : ticket.title}
          </h3>
          {ticket.title.length > 28 && (
            <div className="absolute left-0 top-full z-50 hidden group-hover/title:block">
              <div className="bg-gray-900 text-white text-[13px] p-2 rounded-md mt-1 shadow-lg break-words w-[180px] leading-normal ml-2">
                {ticket.title}
              </div>
            </div>
          )}
        </div>
        {ticket.status === "completed" && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 shrink-0 px-1.5 py-0.5 rounded-full text-[10px] bg-green-50 text-green-600 border border-green-200 font-medium">
            {translations.common.status.completed}
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="space-y-1 p-2.5">
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">
            {translations.tickets.details.submitter}:
          </span>{" "}
          {ticket.submitter_name}
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">
            {translations.tickets.details.location}:
          </span>{" "}
          {ticket.location}
        </p>
        <p className="text-[11px] text-gray-600">
          <span className="text-gray-500">
            {translations.tickets.details.priority}:
          </span>{" "}
          <span
            className={`font-medium ${
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
        <p className="text-[10px] text-gray-400">
          {translations.tickets.details.created}:{" "}
          {formatDate(ticket.created_at)}
        </p>

        {/* Image preview */}
        {ticket.image_url && (
          <div
            className="mt-1.5 relative w-full h-20 rounded-lg overflow-hidden bg-gray-100 image-preview-trigger cursor-pointer border border-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(ticket.image_url);
            }}
          >
            <img
              src={ticket.image_url}
              alt="Issue"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-white flex gap-2">
        {ticket.status === "open" ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusUpdate(ticket.id, "completed");
            }}
            className="w-full px-2 py-0.5 text-[10px] font-medium text-white bg-[#FF6F61] rounded-full hover:bg-[#FF6F61]/90 transition-colors"
          >
            {translations.common.actions.complete}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusUpdate(ticket.id, "open");
            }}
            className="w-full px-2 py-0.5 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            {translations.common.actions.reopen}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TicketScreen() {
  const { translations } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("open");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTickets, setNewTickets] = useState<Set<string>>(new Set());
  const [showImageModal, setShowImageModal] = useState(false);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [newTicket, setNewTicket] = useState<NewTicketForm>({
    submitter_name: "",
    title: "",
    priority: "",
    location: "",
    description: "",
    incident_time: new Date().toISOString().slice(0, 16),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Add state to track truncated titles
  const [truncatedTitles, setTruncatedTitles] = useState<Set<string>>(
    new Set()
  );

  const [isDragging, setIsDragging] = useState(false);
  const [columnCount, setColumnCount] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  // Add debug state
  const [debugInfo, setDebugInfo] = useState({
    gridWidth: 0,
    columnCount: 0,
    itemCount: 0,
  });

  // Load tickets from API on component mount
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      }
    };
    loadTickets();
  }, []);

  // Function to check if title is truncated
  const checkTitleTruncation = useCallback(
    (titleElement: HTMLElement, ticketId: string) => {
      const isOverflowing = titleElement.scrollWidth > titleElement.clientWidth;
      setTruncatedTitles((prev) => {
        if (
          (isOverflowing && prev.has(ticketId)) ||
          (!isOverflowing && !prev.has(ticketId))
        ) {
          return prev;
        }
        const newSet = new Set(prev);
        if (isOverflowing) {
          newSet.add(ticketId);
        } else {
          newSet.delete(ticketId);
        }
        return newSet;
      });
    },
    []
  );

  const handleNewTicketInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTicket((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleCreateNewTicket = () => {
    setShowNewTicketForm(true);
    setNewTicket({
      submitter_name: "",
      title: "",
      priority: "",
      location: "",
      description: "",
      incident_time: new Date().toISOString().slice(0, 16),
    });
  };

  const handleSubmitNewTicket = async () => {
    try {
      if (
        !newTicket.title ||
        !newTicket.submitter_name ||
        !newTicket.priority ||
        !newTicket.location ||
        !newTicket.description
      ) {
        console.error("Missing required fields");
        return;
      }

      const imageUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : undefined;
      const imageName = selectedFile ? selectedFile.name : undefined;

      const ticketData = {
        title: newTicket.title,
        submitter_name: newTicket.submitter_name,
        priority: newTicket.priority,
        location: newTicket.location,
        description: newTicket.description,
        status: "open" as const,
        image_name: imageName,
        image_url: imageUrl,
      };

      // Create ticket through the backend API
      await createTicket(ticketData);
      await fetchTickets(); // Refresh the tickets list
      setShowNewTicketForm(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleCancelNewTicket = () => {
    setShowNewTicketForm(false);
  };

  const handleTicketStatusUpdate = async (
    ticketId: string,
    newStatus: "open" | "completed" | "in_progress"
  ) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
      await fetchTickets(); // Refresh tickets after update
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  // Update search filter function
  const searchTickets = (ticket: Ticket) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      ticket.title?.toLowerCase().includes(query) ||
      ticket.submitter_name?.toLowerCase().includes(query) ||
      ticket.location?.toLowerCase().includes(query) ||
      ticket.description?.toLowerCase().includes(query) ||
      ticket.status?.toLowerCase().includes(query)
    );
  };

  // Sort tickets based on current sort field and direction
  const sortTickets = (tickets: Ticket[]) => {
    return [...tickets].sort((a, b) => {
      let compareA: string | number | Date = a[sortField] || "";
      let compareB: string | number | Date = b[sortField] || "";

      // Convert dates to comparable format
      if (sortField === "created_at") {
        compareA = new Date(a.created_at || 0);
        compareB = new Date(b.created_at || 0);
      }

      // Handle string comparison
      if (typeof compareA === "string" && typeof compareB === "string") {
        const result = compareA.localeCompare(compareB);
        return sortDirection === "asc" ? result : -result;
      }

      // Handle date comparison
      if (compareA instanceof Date && compareB instanceof Date) {
        const result = compareA.getTime() - compareB.getTime();
        return sortDirection === "asc" ? result : -result;
      }

      return 0;
    });
  };

  // Filter and sort tickets
  const filteredTickets = sortTickets(
    tickets.filter((ticket) => {
      if (!ticket.status || !["open", "completed"].includes(ticket.status)) {
        ticket.status = "open";
      }
      const matchesStatus =
        filterType === "all" ? true : ticket.status === filterType;
      return matchesStatus && searchTickets(ticket);
    })
  );

  // Update debug info whenever relevant values change
  useLayoutEffect(() => {
    if (gridRef.current) {
      const width = gridRef.current.offsetWidth;
      const columns = calculateVisibleColumns();
      setDebugInfo((prev) => ({
        ...prev,
        gridWidth: width,
        columnCount: columns,
        itemCount: filteredTickets.length,
      }));
    }
  }, [isDragging, filteredTickets.length]);

  // Get ticket counts - only count tickets with valid status
  const openCount = tickets.filter((t) => t.status === "open").length;
  const completedCount = tickets.filter((t) => t.status === "completed").length;
  const allCount = openCount + completedCount; // Total should be sum of open and completed

  // Update the image click handler to handle optional image URLs
  const handleImageClick = (imageUrl: string | undefined) => {
    if (!imageUrl) return;
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  // Move isNewTicket check to useEffect
  useEffect(() => {
    const checkNewTickets = () => {
      const now = new Date();
      const newTicketIds = new Set<string>();

      tickets.forEach((ticket) => {
        if (!ticket.created_at) return;
        const ticketDate = new Date(ticket.created_at);
        const diffHours =
          (now.getTime() - ticketDate.getTime()) / (1000 * 60 * 60);
        if (diffHours <= 24) {
          newTicketIds.add(ticket.id);
        }
      });

      setNewTickets(newTicketIds);
    };

    checkNewTickets();
  }, [tickets]);

  const isNewTicket = (ticket: Ticket) => {
    return newTickets.has(ticket.id);
  };

  const handleTicketClick = (ticket: Ticket, e: React.MouseEvent) => {
    // Don't open modal if clicking the Complete button or image
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".image-preview-trigger")) {
      return;
    }
    setSelectedTicket(ticket);
  };

  const calculateVisibleColumns = () => {
    if (!gridRef.current) return 5; // default max columns
    const width = window.innerWidth;
    if (width >= 1280) return 5; // xl
    if (width >= 1024) return 4; // lg
    if (width >= 768) return 3; // md
    if (width >= 640) return 2; // sm
    return 1; // mobile
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 0,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setTickets((tickets) => {
      const oldIndex = tickets.findIndex((t) => t.id === active.id);
      const newIndex = tickets.findIndex((t) => t.id === over.id);

      return arrayMove(tickets, oldIndex, newIndex);
    });
  };

  return (
    <div className="container mx-auto px-4 pt-[60px]">
      {/* Debug overlay */}
      <div className="fixed top-0 left-0 bg-black/80 text-white p-4 z-50 font-mono text-sm">
        <p>Grid Width: {debugInfo.gridWidth}px</p>
        <p>Columns: {debugInfo.columnCount}</p>
        <p>Items: {debugInfo.itemCount}</p>
        <p>Is Dragging: {isDragging ? "Yes" : "No"}</p>
      </div>

      {/* Search and filter section */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterType === "all"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="inline-flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <span>{translations.tickets.filters.all}</span>
                <span dir="ltr">({allCount})</span>
              </span>
            </button>
            <button
              onClick={() => setFilterType("open")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterType === "open"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="inline-flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <span>{translations.tickets.filters.open}</span>
                <span dir="ltr">({openCount})</span>
              </span>
            </button>
            <button
              onClick={() => setFilterType("completed")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterType === "completed"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="inline-flex items-center gap-1 ltr:flex-row rtl:flex-row-reverse">
                <span>{translations.tickets.filters.completed}</span>
                <span dir="ltr">({completedCount})</span>
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder={translations.common.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border-2 border-gray-300 rounded-full w-[214px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="w-4 h-4 text-gray-500 absolute right-6 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <SortMenu
              onSort={(field, direction) => {
                setSortField(field);
                setSortDirection(direction);
              }}
              currentSortField={sortField}
              currentSortDirection={sortDirection}
            />
          </div>
        </div>
        <button
          onClick={() => setShowNewTicketForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          {translations.common.actions.create}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="relative w-full overflow-hidden">
          <div
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              border: "2px solid black",
              background: "rgba(0, 0, 0, 0.05)",
              padding: "8px",
            }}
            ref={gridRef}
          >
            <SortableContext
              items={filteredTickets.map((t) => t.id)}
              strategy={rectSortingStrategy}
            >
              {filteredTickets.map((ticket, index) => (
                <SortableTicket
                  key={ticket.id}
                  ticket={ticket}
                  index={index}
                  onTicketClick={handleTicketClick}
                  onStatusUpdate={handleTicketStatusUpdate}
                  translations={translations}
                  onImageClick={handleImageClick}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <NewTicket
              ticket={newTicket}
              onInputChange={handleNewTicketInputChange}
              onImageChange={handleImageChange}
              onSubmit={handleSubmitNewTicket}
              onCancel={handleCancelNewTicket}
            />
          </div>
        </div>
      )}

      {/* Existing Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-[300px]">
            <ExistingTicket
              ticket={selectedTicket}
              onClose={() => setSelectedTicket(null)}
              onStatusUpdate={handleTicketStatusUpdate}
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ width: "407px", maxWidth: "407px" }}
          >
            <img
              src={selectedImage}
              alt="Issue Details"
              className="w-[407px] max-w-[407px] h-auto object-contain bg-white"
              style={{ width: "407px", maxWidth: "407px" }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-4 h-4"
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
      )}
    </div>
  );
}
