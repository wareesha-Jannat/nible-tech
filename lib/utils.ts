import {
  Brain,
  Code,
  MessageSquare,
  Monitor,
  PenTool,
  Smartphone,
  Zap,
  Search,
  BarChart3,
  Shield,
  Globe,
  Settings,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { ServiceBackendType, ServiceFormType } from "./validations/service";
import { Category } from "@/lib/serviceDesignConfig";
import { ServiceNavItem } from "@/hooks/useServices";

/* ---------------- STATUS STYLES ---------------- */

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-600";
    case "in-progress":
      return "bg-yellow-100 text-yellow-600";
    case "completed":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

/* ---------------- GENERIC ICON MAP ---------------- */

export const iconMap: Record<string, React.ElementType> = {
  development: Code,
  mobile: Smartphone,
  ai: Brain,
  consulting: MessageSquare,
  marketing: Monitor,
  design: PenTool,
};

/* ---------------- FEATURE ICON SYSTEM ---------------- */

// Icon pool (small, controlled)
const featureIconPool: LucideIcon[] = [
  Zap,
  Search,
  BarChart3,
  Shield,
  Globe,
  Smartphone,
  Settings,
];

// Category offsets (gives different "feel" per category)
const categoryOffset: Record<string, number> = {
  seo: 1,
  web: 3,
  marketing: 5,
};

// Stable hash function
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * 🔹 Get feature icon automatically
 * - based on title + category
 * - stable (same feature → same icon always)
 * - no admin input needed
 */
export function getFeatureIcon(
  title: string,
  category: "seo" | "web" | "marketing",
): LucideIcon {
  const baseIndex = hashString(title) % featureIconPool.length;
  const offset = categoryOffset[category] || 0;

  const finalIndex = (baseIndex + offset) % featureIconPool.length;

  return featureIconPool[finalIndex] || Settings;
}

/* ---------------- DATE FORMAT ---------------- */

export const formatDateTime = (dateString?: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return (
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " • " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

/* ---------------- SERIALIZE ---------------- */

type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Serializable[]
  | { [key: string]: Serializable }
  | Date
  | { toString(): string };

export function serializeData<T>(data: T): T {
  return serialize(data) as T;
}

function serialize(data: unknown): Serializable {
  if (data === null || data === undefined) return data;

  // Date
  if (data instanceof Date) {
    return data.toISOString();
  }

  // Array
  if (Array.isArray(data)) {
    return data.map(serialize);
  }

  // Object
  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const result: Record<string, Serializable> = {};

    for (const [key, value] of Object.entries(obj)) {
      // Mongo _id handling
      if (
        key === "_id" &&
        value &&
        typeof value === "object" &&
        "toString" in value
      ) {
        result[key] = (value as { toString(): string }).toString();
        continue;
      }

      result[key] = serialize(value);
    }

    return result;
  }

  return data as Serializable;
}

export function toBackendService(data: ServiceFormType): ServiceBackendType {
  return {
    title: data.title,
    shortDescription: data.shortDescription,
    overview: data.overview,
    category: data.category,
    order: data.order ?? 0,

    // ✅ no transformation needed anymore
    features: data.features.map((f) => ({
      title: f.title.trim(),
      description: f.description.trim(),
    })),

    technologies: data.technologies.map((t) => t.value.trim()),
  };
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → -
    .replace(/-+/g, "-"); // remove duplicate -
}

type GroupedServices = Record<Category, { name: string; path: string }[]>;

export function groupServicesByCategory(services: ServiceNavItem[]) {
  return services.reduce(
    (acc, service) => {
      const category = service.category;

      acc[category].push({
        name: service.title,
        path: `/services/${category}/${service.slug}`,
      });

      return acc;
    },
    {
      seo: [],
      web: [],
      marketing: [],
    } as GroupedServices,
  );
}
