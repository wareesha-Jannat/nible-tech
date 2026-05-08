import { ProjectItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Project } from "@/models/Project";

type GetProjectsResponse =
  | {
      success: true;
      projects: ProjectItem[];
    }
  | {
      success: false;
      error: string;
    };

export async function getProjects(): Promise<GetProjectsResponse> {
  try {
    await connectDB();

    const projects = await Project.find({})
      .sort({ priority: -1 }) // highest priority first
      .lean();

    return {
      success: true,
      projects: serializeData(projects) as ProjectItem[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    return {
      success: false,
      error: "Failed to fetch projects",
    };
  }
}
