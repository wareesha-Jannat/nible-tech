import { getFaqs } from "@/app/(admin)/admin/content/manage-faqs/data";
import { FaqsPage } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "5");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured") === "true";
    const result = await getFaqs({
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

    const data: FaqsPage = {
      faqs: result.faqs,
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
        faqs: [],
        nextCursor: null,
        featureCount: 0,
      },
      { status: 500 },
    );
  }
}
