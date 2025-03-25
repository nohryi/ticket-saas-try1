"use client";

import type React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Ticket } from "@/lib/mock-data";

// Common maintenance categories and their related terms for restaurant operations
const ISSUE_CATEGORIES = {
  Cooking_Equipment: [
    // Ranges and Cooktops
    "range",
    "stove",
    "cooktop",
    "burner",
    "gas range",
    "electric range",
    "induction cooktop",
    "wok range",
    "french top",
    "griddle top",
    "flat top",
    "teppanyaki grill",

    // Ovens
    "oven",
    "convection oven",
    "combi oven",
    "pizza oven",
    "deck oven",
    "conveyor oven",
    "salamander",
    "cheese melter",
    "broiler",
    "rotisserie oven",
    "rapid cook oven",
    "microwave",
    "toaster oven",
    "warming oven",
    "proofing oven",
    "bakery oven",

    // Fryers
    "fryer",
    "deep fryer",
    "pressure fryer",
    "auto fryer",
    "ventless fryer",
    "oil filter",
    "fry dump station",
    "fryer basket",
    "oil caddy",
    "grease filter",

    // Grills and Broilers
    "grill",
    "charbroiler",
    "gas grill",
    "electric grill",
    "infrared grill",
    "hibachi grill",
    "panini grill",
    "contact grill",
    "sandwich grill",

    // Steam Equipment
    "steamer",
    "combi steamer",
    "pressure steamer",
    "steam kettle",
    "steam table",
    "steam cabinet",
    "steam jacketed kettle",
    "tilting skillet",
    "braising pan",

    // Hot Holding Equipment
    "hot box",
    "warming cabinet",
    "heated shelf",
    "heat lamp",
    "heating lamp",
    "food warmer",
    "bain marie",
    "soup warmer",
    "plate warmer",
    "carving station",
    "heated display",
    "hot food well",
    "buffet warmer",
    "holding cabinet",

    // Food Prep Equipment
    "food processor",
    "mixer",
    "stand mixer",
    "planetary mixer",
    "dough mixer",
    "vertical cutter mixer",
    "buffalo chopper",
    "meat grinder",
    "meat tenderizer",
    "slicer",
    "meat slicer",
    "vegetable slicer",
    "tomato slicer",
    "bread slicer",
    "dicer",
    "food cutter",
    "vegetable cutter",
    "french fry cutter",
    "blender",
    "immersion blender",
    "bar blender",
    "food blender",
    "food scale",
    "portion scale",
    "receiving scale",
    "ingredient scale",
    "prep table",
    "work table",
    "cutting board",
    "knife rack",

    // Specialty Equipment
    "rice cooker",
    "rice warmer",
    "pasta cooker",
    "tortilla warmer",
    "waffle maker",
    "crepe maker",
    "cotton candy machine",
    "popcorn machine",
    "hot dog roller",
    "pretzel warmer",
    "nacho warmer",
    "cheese warmer",

    // Coffee and Beverage
    "coffee maker",
    "coffee brewer",
    "espresso machine",
    "coffee grinder",
    "tea brewer",
    "hot water dispenser",
    "cappuccino machine",
    "coffee urn",
    "juice dispenser",
    "soda fountain",
    "beverage dispenser",
    "ice tea brewer",
    "water filter",
    "water softener",
    "carbonator",
    "syrup pump",
  ],

  Refrigeration_Equipment: [
    // Walk-ins
    "walk in cooler",
    "walk in freezer",
    "walk in refrigerator",
    "walk in door",
    "walk in floor",
    "walk in panel",
    "walk in compressor",
    "walk in evaporator",
    "walk in condenser",
    "walk in fan",
    "walk in motor",
    "walk in gasket",
    "walk in seal",
    "walk in strip curtain",

    // Reach-ins
    "reach in cooler",
    "reach in freezer",
    "reach in refrigerator",
    "glass door refrigerator",
    "solid door refrigerator",
    "dual temp unit",
    "pass through refrigerator",
    "roll in refrigerator",
    "undercounter refrigerator",

    // Prep Units
    "prep table",
    "sandwich prep",
    "pizza prep",
    "salad prep",
    "cold table",
    "refrigerated rail",
    "topping unit",
    "condiment unit",
    "prep table insert",
    "prep table cover",
    "prep table cutting board",

    // Display Cases
    "display case",
    "deli case",
    "bakery case",
    "seafood case",
    "meat case",
    "produce case",
    "dessert case",
    "sushi case",
    "refrigerated display",
    "cold display",
    "merchandiser",

    // Ice Machines
    "ice machine",
    "ice maker",
    "ice bin",
    "ice dispenser",
    "nugget ice maker",
    "flake ice maker",
    "cube ice maker",
    "ice bagger",
    "ice transport",
    "ice paddle",
    "ice scoop",
  ],

  Warewashing_Equipment: [
    // Dishwashers
    "dishwasher",
    "dish machine",
    "undercounter dishwasher",
    "door type dishwasher",
    "conveyor dishwasher",
    "flight type dishwasher",
    "glass washer",
    "pot washer",
    "dish table",
    "clean dish table",
    "soiled dish table",
    "pre rinse unit",
    "wash sink",
    "rinse sink",
    "sanitize sink",
    "three compartment sink",

    // Dish Handling
    "dish rack",
    "glass rack",
    "cup rack",
    "plate rack",
    "flatware rack",
    "utensil rack",
    "rack dolly",
    "rack shelf",
    "dish cart",
    "bus tub",
    "bus box",
    "dish caddy",

    // Waste Handling
    "disposal",
    "garbage disposal",
    "waste pulper",
    "trash compactor",
    "waste collector",
    "food scrapper",
    "pre rinse spray",
    "grease trap",
  ],

  Bar_Equipment: [
    // Dispensing Systems
    "beer tap",
    "draft system",
    "beer tower",
    "kegerator",
    "wine dispenser",
    "liquor dispenser",
    "shot dispenser",
    "soda gun",
    "bar gun",
    "cocktail station",
    "juice gun",
    "premix system",
    "postmix system",
    "beverage tower",

    // Bar Refrigeration
    "back bar cooler",
    "bar refrigerator",
    "bottle cooler",
    "wine cooler",
    "beer cooler",
    "keg cooler",
    "glass froster",
    "plate chiller",
    "mug froster",

    // Ice and Mixology
    "bar ice bin",
    "cocktail station",
    "ice chest",
    "ice caddy",
    "ice crusher",
    "sonic ice machine",
    "cocktail shaker",
    "mixing glass",
    "bar blender",
    "frozen drink machine",
    "margarita machine",
    "slush machine",

    // Bar Tools and Storage
    "speed rail",
    "liquor rail",
    "bottle rail",
    "bar mat",
    "bar caddy",
    "pour spout",
    "wine rack",
    "glass rack",
    "drainboard",
    "bar sink",
    "hand sink",
    "glass rinser",

    // Specialized Equipment
    "glass washer",
    "glasswasher",
    "bar dishwasher",
    "wine preservation",
    "beer line cleaner",
    "tap cleaner",
    "garnish center",
    "fruit caddy",
    "condiment holder",
  ],
  Plumbing: [
    "water",
    "leak",
    "pipe",
    "drain",
    "sink",
    "faucet",
    "disposal",
    "garbage disposal",
    "grease trap",
    "trap",
    "sewage",
    "backup",
    "clog",
    "blockage",
    "toilet",
    "urinal",
    "bathroom",
    "restroom",
    "hot water",
    "water heater",
    "water pressure",
    "floor drain",
    "drainage",
    "flooding",
    "overflow",
    "spray",
    "nozzle",
  ],
  HVAC: [
    "ac",
    "air condition",
    "heating",
    "ventilation",
    "temperature",
    "thermostat",
    "cool",
    "hot",
    "humid",
    "humidity",
    "air flow",
    "vent",
    "draft",
    "climate",
    "heat",
    "cooling",
    "air quality",
    "smoke removal",
    "exhaust system",
    "kitchen ventilation",
    "dining room temperature",
  ],
  Electrical: [
    "power",
    "electric",
    "light",
    "outlet",
    "switch",
    "circuit",
    "wire",
    "plug",
    "breaker",
    "fuse",
    "lighting",
    "bulb",
    "fixture",
    "socket",
    "surge",
    "voltage",
    "connection",
    "power outage",
    "emergency light",
    "sign",
    "neon",
    "display",
    "pos",
    "terminal",
    "register",
    "equipment power",
  ],
  Storage_Organization: [
    "shelf",
    "shelving",
    "rack",
    "storage",
    "bin",
    "container",
    "cart",
    "dolly",
    "storage room",
    "dry storage",
    "pantry",
    "cabinet",
    "drawer",
    "organizer",
    "label",
    "stock room",
    "inventory",
    "supplies",
    "equipment storage",
  ],
  Dining_Area: [
    "table",
    "chair",
    "booth",
    "seat",
    "furniture",
    "dining room",
    "floor",
    "carpet",
    "tile",
    "wall",
    "ceiling",
    "window",
    "door",
    "partition",
    "decoration",
    "light fixture",
    "menu board",
    "sign",
    "display",
    "waiting area",
    "host stand",
    "bar",
    "counter",
    "stool",
  ],
  Safety_Security: [
    "emergency",
    "hazard",
    "danger",
    "safety",
    "security",
    "alarm",
    "smoke",
    "fire",
    "extinguisher",
    "exit",
    "sign",
    "camera",
    "surveillance",
    "lock",
    "key",
    "door",
    "window",
    "gate",
    "fence",
    "emergency exit",
    "first aid",
    "accident",
    "injury",
    "slip",
    "fall",
    "cut",
    "burn",
  ],
  Sanitation: [
    "clean",
    "sanitize",
    "disinfect",
    "wash",
    "trash",
    "garbage",
    "waste",
    "pest",
    "insect",
    "rodent",
    "bug",
    "infestation",
    "mold",
    "mildew",
    "odor",
    "smell",
    "stain",
    "spill",
    "contamination",
    "hygiene",
    "sanitizer",
    "chemical",
    "soap",
    "paper towel",
    "cleaning supply",
  ],
  POS_Technology: [
    "pos",
    "point of sale",
    "computer",
    "terminal",
    "register",
    "screen",
    "printer",
    "receipt",
    "card reader",
    "payment",
    "software",
    "system",
    "network",
    "wifi",
    "internet",
    "connection",
    "device",
    "backup",
    "database",
    "menu item",
    "inventory system",
    "kitchen display",
  ],
  Exterior: [
    "sign",
    "lighting",
    "parking",
    "entrance",
    "exit",
    "door",
    "window",
    "sidewalk",
    "patio",
    "outdoor seating",
    "awning",
    "facade",
    "wall",
    "roof",
    "gutter",
    "drainage",
    "landscape",
    "plants",
    "pest control",
    "garbage area",
    "dumpster",
    "delivery area",
    "loading dock",
  ],
};

// Priority keywords for restaurant operations
const PRIORITY_TERMS = {
  high: [
    "not working",
    "broken",
    "failed",
    "emergency",
    "urgent",
    "critical",
    "severe",
    "dangerous",
    "fire",
    "flood",
    "leak",
    "safety",
    "hazard",
    "contamination",
    "power outage",
    "no power",
    "no water",
    "broken pipe",
    "sewage",
    "pest",
    "food safety",
    "temperature critical",
    "security breach",
  ],
  medium: [
    "malfunction",
    "issue",
    "problem",
    "error",
    "faulty",
    "damaged",
    "needs repair",
    "poor performance",
    "slow",
    "inconsistent",
    "not cooling",
    "not heating",
    "drainage slow",
    "wear and tear",
    "requires maintenance",
    "showing problems",
  ],
  low: [
    "check",
    "inspect",
    "maintain",
    "update",
    "clean",
    "adjust",
    "calibrate",
    "tune up",
    "routine",
    "scheduled",
    "preventive",
    "minor repair",
    "cosmetic",
    "appearance",
    "upgrade needed",
    "improvement suggested",
  ],
};

interface NewTicketProps {
  ticket: Partial<Ticket>;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function NewTicket({
  ticket,
  onInputChange,
  onImageChange,
  onSubmit,
  onCancel,
}: NewTicketProps) {
  const { translations } = useLanguage();

  const generateTitle = () => {
    const details = ticket.description?.toLowerCase() || "";
    const location = ticket.location;

    // Find the primary category
    let primaryCategory = "";
    let maxMatches = 0;

    Object.entries(ISSUE_CATEGORIES).forEach(([category, keywords]) => {
      const matches = keywords.filter((keyword) =>
        details.includes(keyword)
      ).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        primaryCategory = category;
      }
    });

    // Find priority level
    let priority = "";
    Object.entries(PRIORITY_TERMS).forEach(([level, terms]) => {
      if (terms.some((term) => details.includes(term))) {
        priority = level;
      }
    });

    // Extract the main issue (look for specific patterns)
    const issuePatterns = [
      /(\w+(?:\s+\w+){0,2})\s+(?:is|are|has|have)\s+(?:not working|broken|damaged|malfunctioning|leaking|stuck)/i,
      /(\w+(?:\s+\w+){0,2})\s+(?:needs?|requires?)\s+(?:repair|maintenance|attention|fixing)/i,
      /(?:broken|damaged|malfunctioning|leaking|stuck)\s+(\w+(?:\s+\w+){0,2})/i,
    ];

    let mainIssue = "";
    for (const pattern of issuePatterns) {
      const match = details.match(pattern);
      if (match && match[1]) {
        mainIssue = match[1].trim();
        break;
      }
    }

    // If no pattern match, try to extract key nouns near problem words
    if (!mainIssue) {
      const problemWords = [...PRIORITY_TERMS.high, ...PRIORITY_TERMS.medium];
      for (const word of problemWords) {
        if (details.includes(word)) {
          const context = details
            .split(word)[0]
            .split(" ")
            .slice(-3)
            .join(" ")
            .trim();
          if (context) {
            mainIssue = context;
            break;
          }
        }
      }
    }

    // Construct the title
    let title = "";
    if (primaryCategory && mainIssue) {
      title = `${primaryCategory} Issue - ${
        mainIssue.charAt(0).toUpperCase() + mainIssue.slice(1)
      }`;
    } else if (primaryCategory) {
      title = `${primaryCategory} Maintenance Required`;
    } else if (mainIssue) {
      title = mainIssue.charAt(0).toUpperCase() + mainIssue.slice(1) + " Issue";
    }

    // Add location if available
    if (location && !title.includes(location)) {
      title += ` (${location.split(",")[0]})`;
    }

    // Add priority prefix for high-priority issues
    if (priority === "high") {
      title = "Urgent: " + title;
    }

    // Fallback if no title could be generated
    if (!title) {
      title = "Maintenance Request" + (location ? ` - ${location}` : "");
    }

    // Update the title
    onInputChange({
      target: {
        name: "title",
        value: title,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Handle date input change with the native date picker
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange({
      ...e,
      target: {
        ...e.target,
        name: "created_at",
        value: e.target.value,
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(e);
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">{translations.tickets.newTicket}</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
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

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.title}
          </label>
          <Input
            id="title"
            name="title"
            value={ticket.title || ""}
            onChange={onInputChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="submitter_name"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.submitterName}
          </label>
          <Input
            id="submitter_name"
            name="submitter_name"
            value={ticket.submitter_name || ""}
            onChange={onInputChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.location}
          </label>
          <Input
            id="location"
            name="location"
            value={ticket.location || ""}
            onChange={onInputChange}
            className="mt-1"
            required
          />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.priority}
          </label>
          <select
            id="priority"
            name="priority"
            value={ticket.priority || "Low"}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="Low">{translations.common.priority.low}</option>
            <option value="Medium">
              {translations.common.priority.medium}
            </option>
            <option value="High">{translations.common.priority.high}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.description}
          </label>
          <textarea
            id="description"
            name="description"
            value={ticket.description || ""}
            onChange={onInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            {translations.tickets.form.image}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {translations.common.actions.cancel}
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {translations.common.actions.create}
          </button>
        </div>
      </div>
    </div>
  );
}
