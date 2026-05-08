import { BlogItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";

type GetBlogsResponse =
  | {
      success: true;
      blogs: BlogItem[];
    }
  | {
      success: false;
      error: string;
    };

export async function getBlogs(): Promise<GetBlogsResponse> {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 }) // latest first
      .lean();

    return {
      success: true,
      blogs: serializeData(blogs) as BlogItem[],
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      success: false,
      error: "Failed to fetch blogs",
    };
  }
}
