import { useState, useRef, useEffect } from "react";

export type SortField =
  | "title"
  | "submitter_name"
  | "location"
  | "priority"
  | "created_at";
export type SortDirection = "asc" | "desc";

interface SortOption {
  field: SortField;
  label: string;
}

interface SortMenuProps {
  onSort: (field: SortField, direction: SortDirection) => void;
  hasBeenSorted?: boolean;
  initialSortField?: SortField;
  initialSortDirection?: SortDirection;
}

const sortOptions: SortOption[] = [
  { field: "title", label: "Title" },
  { field: "submitter_name", label: "Submitter" },
  { field: "location", label: "Location" },
  { field: "priority", label: "Priority" },
  { field: "created_at", label: "Created Date" },
];

export default function SortMenu({
  onSort,
  hasBeenSorted = false,
  initialSortField = "created_at",
  initialSortDirection = "desc",
}: SortMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [lastSortField, setLastSortField] =
    useState<SortField>(initialSortField);
  const [lastSortDirection, setLastSortDirection] =
    useState<SortDirection>(initialSortDirection);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortClick = (field: SortField) => {
    if (field === lastSortField) {
      const newDirection = lastSortDirection === "asc" ? "desc" : "asc";
      setLastSortDirection(newDirection);
      onSort(field, newDirection);
    } else {
      setLastSortField(field);
      setLastSortDirection("asc");
      onSort(field, "asc");
    }
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.field === lastSortField);
    return option?.label || "Sort";
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="w-[160px] mt-[3px]">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {/* Sort icon that changes based on direction */}
          {hasBeenSorted ? (
            lastSortDirection === "asc" ? (
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 6V12m0 0l4 4m-4-4l-4 4"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4-4v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            )
          ) : (
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4-4v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          )}
          {hasBeenSorted ? (
            <div className="flex items-center gap-1">
              <span className="max-w-[120px] truncate">
                {getCurrentSortLabel()}
              </span>
            </div>
          ) : (
            <span className="max-w-[120px] truncate">Sort</span>
          )}
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {sortOptions.map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSortClick(field)}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{label}</span>
                {field === lastSortField && (
                  <svg
                    className={`w-4 h-4 ${
                      lastSortDirection === "desc" ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
