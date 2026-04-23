import { getServices } from "@/app/(admin)/content/manage-services/data";
import { ServicesPage } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "5");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured") === "true";

    const result = await getServices({ cursor, limit, search, featured });

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Failed to fetch services",
        },
        { status: 500 },
      );
    }

    const data: ServicesPage = {
      services: result.services,
      nextCursor: result.nextCursor,
      featureCount: result.featureCount, // if you added this
    };

    return Response.json(data);
  } catch (error) {
    console.error("Error in GET /api/services:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        services: [],
        nextCursor: null,
        featureCount: 0,
      },
      { status: 500 },
    );
  }
}
