import { TestimonialItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";
import mongoose from "mongoose";

type GetTestimonialsParams = {
  cursor?: string | null;
  limit?: number;
  search?: string;
};

type GetTestimonialsResponse =
  | {
      success: true;
      testimonials: TestimonialItem[];
      nextCursor: string | null;
      featureCount: number;
    }
  | {
      success: false;
      error: string;
    };

export async function getTestimonials({
  cursor = null,
  limit = 5,
  search = "",
}: GetTestimonialsParams): Promise<GetTestimonialsResponse> {
  try {
    await connectDB();

    const query: any = cursor
      ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
      : {};

    // 🔍 search (name + message is better UX)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const [testimonials, featureCount] = await Promise.all([
      Testimonial.find(query)
        .sort({ _id: -1 }) // or createdAt: -1
        .limit(limit + 1)
        .lean(),

      Testimonial.countDocuments({ featured: true }),
    ]);

    const hasMore = testimonials.length > limit;
    const data = hasMore ? testimonials.slice(0, limit) : testimonials;

    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return {
      success: true,
      testimonials: serializeData(data),
      nextCursor,
      featureCount,
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return {
      success: false,
      error: "Failed to fetch testimonials",
    };
  }
}
