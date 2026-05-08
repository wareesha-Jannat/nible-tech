import Service from "@/models/Service";

export async function GET() {
  try {
    const services = await Service.find({}, "title slug category order");

    return Response.json(services, { status: 200 });
  } catch (error) {
    console.error("GET /services error:", error);

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
