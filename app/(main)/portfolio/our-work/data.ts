import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { Project } from "@/models/Project"; // adjust path
import { ProjectItem } from "@/lib/types";

type ProjectsResponse = {
  success: boolean;
  message: string;
  data: ProjectItem[];
};

export async function getFeaturedProjects(): Promise<ProjectsResponse> {
  try {
    await connectDB();

    const projects = await Project.find()
      .sort({ priority: 1 }) // latest first
      .lean();

    return {
      success: true,
      message: "Projects fetched successfully",
      data: serializeData(projects) as ProjectItem[],
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    return {
      success: false,
      message: "Failed to fetch projects",
      data: [],
    };
  }
}
