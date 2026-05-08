import { FaqItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/FAQ";

type GetFaqsResponse =
  | {
      success: true;
      faqs: FaqItem[];
    }
  | {
      success: false;
      error: string;
    };

export async function getFaqs(): Promise<GetFaqsResponse> {
  try {
    await connectDB();

    const faqs = await Faq.find({}).sort({ priority: 1 }).lean();

    return {
      success: true,
      faqs: serializeData(faqs) as FaqItem[],
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);

    return {
      success: false,
      error: "Failed to fetch FAQs",
    };
  }
}
