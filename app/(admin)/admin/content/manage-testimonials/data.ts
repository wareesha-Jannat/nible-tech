import { TestimonialItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

type GetTestimonialsResponse =
  | {
      success: true;
      testimonials: TestimonialItem[];
    }
  | {
      success: false;
      error: string;
    };

export async function getTestimonials(): Promise<GetTestimonialsResponse> {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({})
      .sort({ priority: -1 }) // highest priority first
      .lean();

    return {
      success: true,
      testimonials: serializeData(testimonials) as TestimonialItem[],
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return {
      success: false,
      error: "Failed to fetch testimonials",
    };
  }
}
