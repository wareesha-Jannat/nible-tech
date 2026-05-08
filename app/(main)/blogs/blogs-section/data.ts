import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { Blog } from "@/models/Blog";
import { BlogItem } from "@/lib/types";

type BlogsResponse = {
  success: boolean;
  message: string;
  data: BlogItem[];
};

export async function getBlogs(): Promise<BlogsResponse> {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // latest first
      .lean();

    return {
      success: true,
      message: "Blogs fetched successfully",
      data: serializeData(blogs) as BlogItem[],
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      success: false,
      message: "Failed to fetch blogs",
      data: [],
    };
  }
}
