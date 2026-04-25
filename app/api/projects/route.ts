import { getProjects } from "@/app/(admin)/admin/content/manage-projects/data";
import { ProjectsPage } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "5");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured") === "true";
    const result = await getProjects({
      cursor,
      limit,
      search,
      featured,
    });

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Failed to fetch testimonials",
        },
        { status: 500 },
      );
    }

    const data: ProjectsPage = {
      projects: result.projects,
      nextCursor: result.nextCursor,
      featureCount: result.featureCount,
    };

    return Response.json(data);
  } catch (error) {
    console.error("Error in GET /api/testimonials:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        projects: [],
        nextCursor: null,
        featureCount: 0,
      },
      { status: 500 },
    );
  }
}
