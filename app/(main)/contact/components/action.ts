"use server";

import { connectDB } from "@/lib/db";
import { Query } from "@/models/Query";
import { ContactFormType, contactSchema } from "@/lib/validations/contact";

export async function createQuery(data: ContactFormType) {
  try {
    // Validate
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    await connectDB();

     await Query.create(parsed.data);

    return {
      success: true,
      message: "Query submitted successfully",
    };
  } catch (error) {
    console.error("createQuery error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}