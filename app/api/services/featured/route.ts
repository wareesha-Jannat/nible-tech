import { getWhatWeOffer } from "@/app/(main)/services/what-we-offer/data";

export async function GET() {
  try {
    const result = await getWhatWeOffer();

    if (!result.success) {
      return Response.json({ message: result.message }, { status: 500 });
    }

    const simplified = result.data.map((service) => ({
      _id: service._id,
      title: service.title,
    }));

    return Response.json(simplified, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /services/featured error:", error);

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
