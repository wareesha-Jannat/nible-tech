import { Service } from "@/models/Service"; // adjust path
import { serializeData } from "@/lib/utils"; // if you already use this
import { connectDB } from "@/lib/db";

export type ServicePreview = {
  _id: string;
  title: string;
  description: string;
  category: string;
};

type ServicesResponse = {
  success: boolean;
  message: string;
  data: ServicePreview[];
};

export async function getFeaturedServices(): Promise<ServicesResponse> {
  try {
    await connectDB();
    const services = await Service.find({ featured: true })
      .select("title description category") // only needed fields
      .sort({ priority: 1 }) // latest first (optional)
      .limit(3)
      .lean();

    const result = serializeData(services);
    console.log(result);
    return {
      success: true,
      message: "Services fetched successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error fetching featured services:", error);

    return {
      success: false,
      message: "Failed to fetch services",
      data: [],
    };
  }
}
