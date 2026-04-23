import { ServiceItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import mongoose from "mongoose";

type GetServicesParams = {
  cursor?: string | null;
  limit?: number;
  search?: string;
  featured?: boolean;
};

type GetServicesResponse =
  | {
      success: true;
      services: ServiceItem[];
      nextCursor: string | null;
      featureCount: number;
    }
  | {
      success: false;
      error: string;
    };

export async function getServices({
  cursor = null,
  limit = 5,
  search = "",
  featured = false,
}: GetServicesParams): Promise<GetServicesResponse> {
  try {
    await connectDB();

    const query: any = cursor
      ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
      : {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    // featured filter
    if (featured) {
      query.featured = true;
    }

    const [services, featureCount] = await Promise.all([
      Service.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean(),

      Service.countDocuments({ featured: true }),
    ]);

    const hasMore = services.length > limit;
    const data = hasMore ? services.slice(0, limit) : services;

    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return {
      success: true,
      services: serializeData(data),
      nextCursor,
      featureCount,
    };
  } catch (error) {
    console.error("Error in getServicesWithCursor:", error);

    return {
      success: false,
      error: "Failed to fetch services",
    };
  }
}
