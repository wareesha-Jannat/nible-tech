import { Query } from "@/models/Query";
import { QueryItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";

export async function getRecentQueries(): Promise<QueryItem[]> {
  try {
    const queries = await Query.find()
      .select("name projectType budget status createdAt")
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .lean();
    const result = serializeData(queries);
    return result;
  } catch (error) {
    console.error("Error fetching recent queries:", error);
    return [];
  }
}
