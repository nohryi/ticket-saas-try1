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
  currentSortField: SortField;
  currentSortDirection: SortDirection;
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
  currentSortField,
  currentSortDirection,
}: SortMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
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
    if (currentSortField === field) {
      onSort(field, currentSortDirection === "asc" ? "desc" : "asc");
    } else {
      onSort(field, "asc");
    }
    setShowMenu(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-3 py-2 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center gap-1"
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
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
        Sort
      </button>

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
                {currentSortField === field && (
                  <svg
                    className={`w-4 h-4 ${
                      currentSortDirection === "desc"
                        ? "transform rotate-180"
                        : ""
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
