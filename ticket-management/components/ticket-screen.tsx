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
import {
  fetchTickets,
  updateTicketStatus,
  createTicket,
  updateTicketOrder,
} from "@/lib/api";
import { formatDate } from "@/lib/utils";
import SelectedTicketModal from "@/components/selected-ticket-modal";
import SortMenu, { SortField, SortDirection } from "@/components/sort-menu";
import ProfileMenu from "@/components/profile-menu";
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
  translations: any;
  onImageClick: (imageUrl: string | undefined, ticket: Ticket) => void;
}

function SortableTicket({
  ticket,
  index,
  onTicketClick,
  onStatusUpdate,
  translations,
  onImageClick,
}: SortableTicketProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({
    id: ticket.id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? undefined : transition,
    zIndex: isDragging ? 1000 : 1,
    position: "relative" as const,
    height: "100%",
    touchAction: "none",
    opacity: 1,
  };

  const [isClicking, setIsClicking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start click tracking if clicking a button
    if (e.target instanceof HTMLElement && e.target.closest("button")) {
      return;
    }

    setIsClicking(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsClicking(false);
    }, 200);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Don't trigger ticket click if clicking a button
    if (e.target instanceof HTMLElement && e.target.closest("button")) {
      setIsClicking(false);
      return;
    }

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
      style={style}
      className={`bg-white rounded-lg cursor-grab active:cursor-grabbing hover:shadow-lg border-2 overflow-hidden group relative ${
        ticket.status === "completed"
          ? "pb-[32px] border-gray-200 bg-gray-50 shadow-inner hover:border-gray-400"
          : "border-[#FF6F61]/40 bg-white shadow-inner hover:border-[#FF6F61]/60"
      } ${
        isDragging
          ? "shadow-2xl scale-[1.02] transition-none"
          : "transition-shadow"
      } outline outline-1 outline-black/10`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          !isDragging &&
          !target.closest(".image-preview-trigger") &&
          !target.closest("button")
        ) {
          onTicketClick(ticket, e);
        }
      }}
    >
      {/* Main content area with drag listeners */}
      <div
        {...attributes}
        {...listeners}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="h-full"
      >
        {/* Header */}
        <div
          className={`relative flex h-[40px] border-b ${
            ticket.status === "completed"
              ? "border-gray-200 bg-gray-100/50"
              : "border-[#FF6F61]/40 bg-[#FF6F61]/35"
          }`}
        >
          {/* Title container with flex-1 to take remaining space */}
          <div className="flex-1 min-w-0 group/title relative">
            <h3
              className={`text-[13px] font-semibold tracking-tight px-3 h-[40px] flex items-center whitespace-nowrap ${
                ticket.status === "completed"
                  ? "text-gray-600"
                  : "text-gray-900"
              }`}
            >
              {ticket.title.length > (ticket.status === "completed" ? 25 : 28)
                ? `${ticket.title.slice(
                    0,
                    ticket.status === "completed" ? 25 : 28
                  )}...`
                : ticket.title}
            </h3>
            {ticket.title.length >
              (ticket.status === "completed" ? 25 : 28) && (
              <div className="absolute left-0 top-full z-50 hidden group-hover/title:block">
                <div className="bg-gray-900 text-white text-[13px] p-2 rounded-md mt-1 shadow-lg break-words w-[180px] leading-normal ml-2">
                  {ticket.title}
                </div>
              </div>
            )}
          </div>
          {/* Status indicator with fixed width and right alignment */}
          {ticket.status === "completed" && (
            <div className="flex items-center justify-end w-[70px] px-3 shrink-0">
              <span className="text-[10px] text-gray-500 font-normal whitespace-nowrap">
                {translations.common.status.completed}
              </span>
            </div>
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

          {/* Image preview - now part of the main content */}
          {ticket.image_url && (
            <img
              src={ticket.image_url}
              alt="Issue"
              className="mt-1.5 w-full h-20 object-cover rounded-lg border border-gray-200"
            />
          )}
        </div>
      </div>

      {/* Action buttons - only show Reopen for completed tickets */}
      {ticket.status === "completed" && (
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-white flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStatusUpdate(ticket.id, "open");
            }}
            className="w-full px-2 py-0.5 text-[10px] font-medium text-white bg-[#3b82f6] rounded-full hover:bg-blue-500 transition-colors"
          >
            {translations.common.actions.reopen.replace("Reopen", "Re-open")}
          </button>
        </div>
      )}
    </div>
  );
}

export default function TicketScreen() {
  const { translations } = useLanguage();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>(() => {
    if (typeof window === "undefined") return "open";
    const savedFilter = localStorage.getItem("ticketFilterType");
    return (savedFilter as FilterType) || "open";
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("ticketSearchQuery") || "";
  });
  const [newTickets, setNewTickets] = useState<Set<string>>(new Set());
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentSortField, setCurrentSortField] = useState<SortField>(() => {
    if (typeof window === "undefined") return "created_at";
    return (
      (localStorage.getItem("ticketSortField") as SortField) || "created_at"
    );
  });
  const [currentSortDirection, setCurrentSortDirection] =
    useState<SortDirection>(() => {
      if (typeof window === "undefined") return "desc";
      return (
        (localStorage.getItem("ticketSortDirection") as SortDirection) || "desc"
      );
    });
  const [hasBeenSorted, setHasBeenSorted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("ticketHasBeenSorted") === "true";
  });
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

  // Load tickets from API and apply saved sort if exists
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        if (hasBeenSorted && currentSortField && currentSortDirection) {
          const sortedData = [...data].sort((a, b) => {
            let comparison = 0;
            switch (currentSortField) {
              case "title":
                comparison = a.title.localeCompare(b.title);
                break;
              case "submitter_name":
                comparison = a.submitter_name.localeCompare(b.submitter_name);
                break;
              case "location":
                comparison = a.location.localeCompare(b.location);
                break;
              case "priority": {
                const priorityOrder: Record<string, number> = {
                  high: 3,
                  medium: 2,
                  low: 1,
                };
                comparison =
                  (priorityOrder[a.priority.toLowerCase()] ?? 0) -
                  (priorityOrder[b.priority.toLowerCase()] ?? 0);
                break;
              }
              case "created_at":
                comparison =
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime();
                break;
              default:
                return 0;
            }
            return currentSortDirection === "asc" ? comparison : -comparison;
          });
          setTickets(
            sortedData.map((ticket, index) => ({
              ...ticket,
              order: index,
            }))
          );
        } else {
          setTickets(data);
        }
      } catch (error) {
        console.error("Failed to load tickets:", error);
      }
    };
    loadTickets();
  }, [currentSortField, currentSortDirection, hasBeenSorted]);

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
      // Optimistically update the UI
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      // Make the API call
      const updatedTicket = await updateTicketStatus(ticketId, newStatus);

      // Refresh the entire ticket list to ensure consistency
      const refreshedTickets = await fetchTickets();
      setTickets(refreshedTickets);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      // Revert the optimistic update on error
      const response = await fetchTickets();
      setTickets(response);
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

  // Filter tickets without changing their order
  const filteredTickets = tickets.filter((ticket) => {
    if (!ticket.status || !["open", "completed"].includes(ticket.status)) {
      ticket.status = "open";
    }
    const matchesStatus =
      filterType === "all" ? true : ticket.status === filterType;
    return matchesStatus && searchTickets(ticket);
  });

  // Modify the sortTickets function to be a one-time operation
  const applySort = (field: SortField, direction: SortDirection) => {
    const sortedTickets = [...tickets].sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "submitter_name":
          comparison = a.submitter_name.localeCompare(b.submitter_name);
          break;
        case "location":
          comparison = a.location.localeCompare(b.location);
          break;
        case "priority": {
          const priorityOrder: Record<string, number> = {
            high: 3,
            medium: 2,
            low: 1,
          };
          comparison =
            (priorityOrder[a.priority.toLowerCase()] ?? 0) -
            (priorityOrder[b.priority.toLowerCase()] ?? 0);
          break;
        }
        case "created_at":
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        default:
          return 0;
      }
      return direction === "asc" ? comparison : -comparison;
    });

    // Update the tickets with the new sorted order and reset their order properties
    const reorderedTickets = sortedTickets.map((ticket, index) => ({
      ...ticket,
      order: index,
    }));
    setTickets(reorderedTickets);
    setHasBeenSorted(true);
  };

  // Update the handleSort function to persist sort preferences
  const handleSort = (field: SortField, direction: SortDirection) => {
    localStorage.setItem("ticketSortField", field);
    localStorage.setItem("ticketSortDirection", direction);
    localStorage.setItem("ticketHasBeenSorted", "true");
    setCurrentSortField(field);
    setCurrentSortDirection(direction);
    applySort(field, direction);
  };

  // Update the handleDragEnd function to work with the new structure
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = tickets.findIndex((t) => t.id === active.id);
    const newIndex = tickets.findIndex((t) => t.id === over.id);

    const reorderedTickets = arrayMove(tickets, oldIndex, newIndex).map(
      (ticket, index) => ({
        ...ticket,
        order: index,
      })
    );

    setTickets(reorderedTickets);
  };

  // Get ticket counts - only count tickets with valid status
  const openCount = tickets.filter((t) => t.status === "open").length;
  const completedCount = tickets.filter((t) => t.status === "completed").length;
  const allCount = openCount + completedCount; // Total should be sum of open and completed

  // Update the image click handler to handle optional image URLs
  const handleImageClick = (imageUrl: string | undefined, ticket: Ticket) => {
    if (!imageUrl) return;
    setSelectedImage(imageUrl);
    setShowImageModal(true);
    setSelectedTicket(ticket);
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

  // Update the filter change handler to persist filter preference
  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filterType) return;
    localStorage.setItem("ticketFilterType", newFilter);
    setFilterType(newFilter);
  };

  // Update search query handler to persist search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    localStorage.setItem("ticketSearchQuery", value);
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Kitchen Display
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex-none p-4">
            {/* Header content */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
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
                  onClick={() => handleFilterChange("open")}
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
                  onClick={() => handleFilterChange("completed")}
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
                <div className="relative">
                  <input
                    type="text"
                    placeholder={translations.common.search}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-4 pr-10 py-2 border-2 border-gray-300 rounded-full w-[214px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <svg
                    className="w-4 h-4 text-gray-500 absolute right-6 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  onSort={handleSort}
                  hasBeenSorted={hasBeenSorted}
                  initialSortField={currentSortField}
                  initialSortDirection={currentSortDirection}
                />
              </div>
              <div className="flex-1" />
              <button
                onClick={handleCreateNewTicket}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                {translations.common.actions.create}
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-scroll scrollbar-gutter-stable"
            style={{
              overscrollBehavior: "contain",
              scrollbarGutter: "stable",
            }}
          >
            <div className="px-4 pt-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                onDragCancel={() => setIsDragging(false)}
              >
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                        onImageClick={(imageUrl) =>
                          handleImageClick(imageUrl, ticket)
                        }
                      />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200] p-4"
              onClick={() => {
                setSelectedImage(null);
                setShowImageModal(false);
              }}
            >
              <div
                className="relative rounded-lg overflow-hidden"
                style={{ width: "407px", maxWidth: "407px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Issue Details"
                  className="w-[407px] max-w-[407px] h-auto object-contain bg-white"
                  style={{ width: "407px", maxWidth: "407px" }}
                />
                <button
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                    setShowImageModal(false);
                  }}
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

          {/* Existing Ticket Modal */}
          {selectedTicket && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
              <div className="w-[300px]">
                <ExistingTicket
                  ticket={selectedTicket}
                  onClose={() => {
                    setSelectedTicket(null);
                    if (!showImageModal) {
                      setSelectedImage(null);
                    }
                  }}
                  onStatusUpdate={handleTicketStatusUpdate}
                />
              </div>
            </div>
          )}

          {/* New Ticket Modal */}
          {showNewTicketForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
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
        </div>
      </main>
    </div>
  );
}
