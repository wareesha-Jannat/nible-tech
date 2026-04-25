import { connectDB } from "@/lib/db";
import { serializeData } from "@/lib/utils";
import { Faq } from "@/models/FAQ";// adjust path
import { FaqItem } from "@/lib/types"; // create if not exists

type FaqsResponse = {
  success: boolean;
  message: string;
  data: FaqItem[];
};

export async function getFeaturedFaqs(): Promise<FaqsResponse> {
  try {
    await connectDB();

    const faqs = await Faq.find({ featured: true })
      .sort({ priority: 1 }) // lower priority = higher position
      .lean();

    const result = serializeData(faqs) as FaqItem[];

    return {
      success: true,
      message: "FAQs fetched successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error fetching featured FAQs:", error);

    return {
      success: false,
      message: "Failed to fetch FAQs",
      data: [],
    };
  }
}