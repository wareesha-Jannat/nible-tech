"use server";

import { TestimonialItem } from "@/lib/types";
import { serializeData } from "@/lib/utils";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import {
  TestimonialFormType,
  testimonialSchema,
} from "@/lib/validations/testimonials";
import { Testimonial } from "@/models/Testimonial";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type AddTestimonialResponse =
  | {
      success: true;
      message: string;
      newTestimonial: TestimonialItem;
    }
  | {
      success: false;
      message: string;
    };

type AddTestimonialData = {
  imageFile: File | null;
  restData: TestimonialFormType;
};

export async function addTestimonial({
  imageFile,
  restData,
}: AddTestimonialData): Promise<AddTestimonialResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }
    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }
    const parsed = testimonialSchema.safeParse(restData);

    if (!parsed.success) {
      return { success: false, message: "Invalid testimonial data" };
    }

    await connectDB();

    // 1️⃣ Create first (to get ID)
    const testimonial = await Testimonial.create(parsed.data);

    let imageData = null;

    // 2️⃣ Upload image if exists
    if (imageFile) {
      imageData = await uploadToCloudinary(
        imageFile,
        "testimonials",
        testimonial._id.toString(),
      );

      testimonial.image = imageData;
      await testimonial.save();
    }
    await revalidatePath("/admin/content");
    const plain = testimonial.toObject();

    return {
      success: true,
      message: "Testimonial added successfully",
      newTestimonial: serializeData(plain) as TestimonialItem,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to add testimonial",
    };
  }
}

type UpdateTestimonialResponse =
  | {
      success: true;
      message: string;
      updated: TestimonialItem;
    }
  | {
      success: false;
      message: string;
    };

type UpdateTestimonialData = {
  id: string;
  imageFile: File | null;
  removeImage: boolean;
  restData: TestimonialFormType;
};

export async function updateTestimonial({
  id,
  imageFile,
  removeImage,
  restData,
}: UpdateTestimonialData): Promise<UpdateTestimonialResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }
    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }

    const parsed = testimonialSchema.safeParse(restData);

    if (!parsed.success) {
      return { success: false, message: "Invalid testimonial data" };
    }

    await connectDB();

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return { success: false, message: "Testimonial not found" };
    }

    if (imageFile) {
      // upload replaces automatically
      const imageData = await uploadToCloudinary(imageFile, "testimonials", id);

      testimonial.image = {
        url: imageData.url,
        public_id: imageData.public_id,
      };
    } else if (removeImage && testimonial.image?.public_id) {
      await deleteFromCloudinary(testimonial.image.public_id);
      testimonial.image = null;
    }
    // 3️⃣ UPDATE OTHER DATA
    testimonial.name = parsed.data.name;
    testimonial.role = parsed.data.role;
    testimonial.message = parsed.data.message;
    testimonial.company = parsed.data.company;

    await testimonial.save();
    const plain = testimonial.toObject();
    await revalidatePath("/admin/content");
    return {
      success: true,
      message: "Testimonial updated successfully",
      updated: serializeData(plain) as TestimonialItem,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update testimonial",
    };
  }
}

type DeleteTestimonialResponse =
  | {
      success: true;
      message: string;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteTestimonialDB(
  id: string,
): Promise<DeleteTestimonialResponse> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        success: false,
        message: "unauthorized",
      };
    }
    if (session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Forbidden",
      };
    }
    await connectDB();
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return {
        success: false,
        message: "Testimonial not found",
      };
    }

    if (testimonial.image?.public_id) {
      await deleteFromCloudinary(testimonial.image.public_id);
    }

    await Testimonial.findByIdAndDelete(id);
    await revalidatePath("/admin/content");
    return {
      success: true,
      message: "Testimonial deleted successfully",
      deletedId: id,
    };
  } catch (error) {
    console.error("delete testimonial error:", error);

    return {
      success: false,
      message: "An error occurred while deleting the testimonial",
    };
  }
}


