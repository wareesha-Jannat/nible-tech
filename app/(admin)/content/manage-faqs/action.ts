"use server";

import { connectDB } from "@/lib/db";

import { serializeData } from "@/lib/utils";
import { faqSchema, FAQFormType } from "@/lib/validations/faq";
import { FaqItem } from "@/lib/types";
import { Faq } from "@/models/FAQ";

/* ----------------------------- ADD FAQ ----------------------------- */

type AddFaqResponse =
  | {
      success: true;
      message: string;
      newFaq: FaqItem;
    }
  | {
      success: false;
      message: string;
    };

export async function addFaq(data: FAQFormType): Promise<AddFaqResponse> {
  try {
    const parsed = faqSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid FAQ data",
      };
    }

    await connectDB();

    const faq = await Faq.create(parsed.data);
    const plain = faq.toObject();

    return {
      success: true,
      message: "FAQ added successfully",
      newFaq: serializeData(plain),
    };
  } catch (error) {
    console.error("addFaq error:", error);

    return {
      success: false,
      message: "Failed to add FAQ",
    };
  }
}

/* ----------------------------- UPDATE FAQ ----------------------------- */

type UpdateFaqResponse =
  | {
      success: true;
      message: string;
      updated: FaqItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateFaq(
  id: string,
  data: FAQFormType,
): Promise<UpdateFaqResponse> {
  try {
    const parsed = faqSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid FAQ data",
      };
    }

    await connectDB();

    const updatedFaq = await Faq.findByIdAndUpdate(id, parsed.data, {
      new: true,
    }).lean();

    if (!updatedFaq) {
      return {
        success: false,
        message: "FAQ not found",
      };
    }

    return {
      success: true,
      message: "FAQ updated successfully",
      updated: serializeData(updatedFaq),
    };
  } catch (error) {
    console.error("updateFaq error:", error);

    return {
      success: false,
      message: "Failed to update FAQ",
    };
  }
}

/* ----------------------------- DELETE FAQ ----------------------------- */

type DeleteFaqResponse =
  | {
      success: true;
      message: string;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteFaqDB(id: string): Promise<DeleteFaqResponse> {
  try {
    await connectDB();

    const deleted = await Faq.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
        message: "FAQ not found",
      };
    }

    return {
      success: true,
      message: "FAQ deleted successfully",
      deletedId: deleted._id.toString(),
    };
  } catch (error) {
    console.error("deleteFaq error:", error);

    return {
      success: false,
      message: "Failed to delete FAQ",
    };
  }
}
