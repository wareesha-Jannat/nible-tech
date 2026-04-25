import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { Testimonial } from "@/models/Testimonial"; // adjust path
import { TestimonialItem } from "@/lib/types";

type TestimonialsResponse = {
  success: boolean;
  message: string;
  data: TestimonialItem[];
};

export async function getFeaturedTestimonials(): Promise<TestimonialsResponse> {
  try {
    await connectDB();

    const testimonials = await Testimonial.find({ featured: true })
      .sort({ priority: 1 })
      .lean();

    return {
      success: true,
      message: "Testimonials fetched successfully",
      data: serializeData(testimonials) as TestimonialItem[],
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return {
      success: false,
      message: "Failed to fetch testimonials",
      data: [],
    };
  }
}
