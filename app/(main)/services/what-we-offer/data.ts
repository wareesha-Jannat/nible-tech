import { Service } from "@/models/Service"; // adjust path
import { serializeData } from "@/lib/utils"; // if you already use this
import { connectDB } from "@/lib/db";
import { ServiceItem } from "@/lib/types";

type ServicesResponse = {
  success: boolean;
  message: string;
  data: ServiceItem[];
};

export async function getWhatWeOffer(): Promise<ServicesResponse> {
  try {
    await connectDB();
    const services = await Service.find({ featured: true })
      .sort({ priority: 1 }) 
      .lean();

    const result = serializeData(services) as ServiceItem[];
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
