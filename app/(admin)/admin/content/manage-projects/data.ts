import { ProjectItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";
import mongoose from "mongoose";

type GetProjectsParams = {
  cursor?: string | null;
  limit?: number;
  search?: string;
  featured?: boolean;
};

type GetProjectsResponse =
  | {
      success: true;
      projects: ProjectItem[];
      nextCursor: string | null;
      featureCount: number;
    }
  | {
      success: false;
      error: string;
    };

type MongoIdQuery = {
  $lt?: mongoose.Types.ObjectId;
};

type MongoTextQuery = {
  $regex: string;
  $options?: string;
};

type ProjectFilter = {
  _id?: MongoIdQuery;
  status?: string;
  featured?: boolean;
  title?: MongoTextQuery;
};

export async function getProjects({
  cursor = null,
  limit = 5,
  search = "",
  featured = false,
}: GetProjectsParams): Promise<GetProjectsResponse> {
  try {
    await connectDB();

    const query: ProjectFilter = cursor
      ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
      : {};

    // 🔍 search (title-based like services)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // featured filter
    if (featured) {
      query.featured = true;
    }

    const [projects, featureCount] = await Promise.all([
      Project.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean(),

      Project.countDocuments({ featured: true }),
    ]);

    const hasMore = projects.length > limit;
    const data = hasMore ? projects.slice(0, limit) : projects;

    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return {
      success: true,
      projects: serializeData(data) as ProjectItem[],
      nextCursor,
      featureCount,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    return {
      success: false,
      error: "Failed to fetch projects",
    };
  }
}
