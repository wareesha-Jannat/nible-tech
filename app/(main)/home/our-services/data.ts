import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import Service from "@/models/Service";

export type ServicePreview = {
  _id: string;
  title: string;
  shortDescription: string;
  features: string[];
};

type ServicesResponse = {
  success: boolean;
  message: string;
  data: ServicePreview[];
};

type Feature = { title: string; description: string };

export async function getServices(): Promise<ServicesResponse> {
  try {
    await connectDB();

    const services = await Service.find({ order: 1 })
      .select("title shortDescription features ")
      .sort({ order: 1 })
      .lean();

    const mappedServices = services.map((service) => ({
      _id: service._id,
      title: service.title,
      shortDescription: service.shortDescription,
      features: service.features?.map((f: Feature) => f.title) || [],
    }));
    const result = serializeData(mappedServices) as ServicePreview[];

    return {
      success: true,
      message: "Services fetched successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error fetching services:", error);

    return {
      success: false,
      message: "Failed to fetch services",
      data: [],
    };
  }
}
