import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { Project } from "@/models/Project";
import { Testimonial } from "@/models/Testimonial";
import { ProjectItem, TestimonialItem } from "@/lib/types";

type ProjectsResponse = {
  success: boolean;
  message: string;
  data: {
    projects: ProjectItem[];
    testimonials: TestimonialItem[];
  };
};

export async function getSuccessData(): Promise<ProjectsResponse> {
  try {
    await connectDB();

    // 🔥 Top 3 projects by priority
    const projects = await Project.find()
      .sort({ priority: 1 })
      .limit(3)
      .lean();

    // 🔥 All testimonials
    const testimonials = await Testimonial.find().lean();

    return {
      success: true,
      message: "Homepage data fetched successfully",
      data: {
        projects: serializeData(projects) as ProjectItem[],
        testimonials: serializeData(testimonials) as TestimonialItem[],
      },
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);

    return {
      success: false,
      message: "Failed to fetch homepage data",
      data: {
        projects: [],
        testimonials: [],
      },
    };
  }
}