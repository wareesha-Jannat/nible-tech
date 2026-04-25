import {
  Brain,
  Code,
  MessageSquare,
  Monitor,
  PenTool,
  Smartphone,
} from "lucide-react";

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

export const iconMap: Record<string, React.ElementType> = {
  development: Code,
  mobile: Smartphone,
  ai: Brain,
  consulting: MessageSquare,
  marketing: Monitor,
  design: PenTool,
};

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

// lib/serialize.ts

export function serializeData(data: unknown): unknown {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  if (typeof data !== "object") {
    return data;
  }

  const result = { ...(data as Record<string, unknown>) };

  // _id
  if (
    typeof result._id === "object" &&
    result._id !== null &&
    "toString" in result._id
  ) {
    result._id = (result._id as { toString: () => string }).toString();
  }

  // createdAt
  if (result.createdAt instanceof Date) {
    result.createdAt = result.createdAt.toISOString();
  }

  // updatedAt
  if (result.updatedAt instanceof Date) {
    result.updatedAt = result.updatedAt.toISOString();
  }

  return result;
}

