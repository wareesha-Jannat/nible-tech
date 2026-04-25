import { FaqItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/FAQ";
import mongoose from "mongoose";

type GetFaqsParams = {
  cursor?: string | null;
  limit?: number;
  search?: string;
  featured?: boolean;
};

type GetFaqsResponse =
  | {
      success: true;
      faqs: FaqItem[];
      nextCursor: string | null;
      featureCount: number; // keeping same shape as services
    }
  | {
      success: false;
      error: string;
    };
type MongoIdQuery = {
  $lt?: mongoose.Types.ObjectId;
};

type MongoTextQuery = {
  $regex: string;
  $options?: string;
};
type FaqFilter = {
  _id?: MongoIdQuery;
  status?: string;
  featured?: boolean;
  question?: MongoTextQuery;
};

export async function getFaqs({
  cursor = null,
  limit = 5,
  search = "",
  featured = false,
}: GetFaqsParams): Promise<GetFaqsResponse> {
  try {
    await connectDB();

    const query: FaqFilter = cursor
      ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
      : {};

    //search
    if (search) {
      query.question = { $regex: search, $options: "i" };
    }

    // featured filter
    if (featured) {
      query.featured = true;
    }
    const [faqs, featureCount] = await Promise.all([
      Faq.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .lean(),

      Faq.countDocuments({ featured: true }),
    ]);

    const hasMore = faqs.length > limit;
    const data = hasMore ? faqs.slice(0, limit) : faqs;

    const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

    return {
      success: true,
      faqs: serializeData(data) as FaqItem[],
      nextCursor,
      featureCount,
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);

    return {
      success: false,
      error: "Failed to fetch FAQs",
    };
  }
}
