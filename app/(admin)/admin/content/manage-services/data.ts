import { ServiceItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

type GetServicesResponse =
  | {
      success: true;
      services: ServiceItem[];
    }
  | {
      success: false;
      error: string;
    };

export async function getServices(): Promise<GetServicesResponse> {
  try {
    await connectDB();

    const services = await Service.find({})
      .select("-slug -metaTitle -metaDescription")
      .lean();

    return {
      success: true,
      services: serializeData(services) as ServiceItem[],
    };
  } catch (error) {
    console.error("Error in getServices:", error);

    return {
      success: false,
      error: "Failed to fetch services",
    };
  }
}
