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

    const plain = testimonial.toObject();

    return {
      success: true,
      message: "Testimonial added successfully",
      newTestimonial: serializeData(plain) as TestimonialItem,
    };
  } catch (error) {
    console.log(error)
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
    testimonial.featured = parsed.data.featured;

    await testimonial.save();
    const plain = testimonial.toObject();

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
type UpdatePriorityResponse = 
  | {
      success: true;
      updated: TestimonialItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateTestimonialPriority(id: string, priority: number) : Promise<UpdatePriorityResponse> {
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
    if (!id) {
      return {
        success: false,
        message: "Testimonial ID is required",
      };
    }

    const parsedPriority = Number(priority);

    if (isNaN(parsedPriority)) {
      return {
        success: false,
        message: "Priority must be a valid number",
      };
    }

    if (parsedPriority < 0) {
      return {
        success: false,
        message: "Priority cannot be negative",
      };
    }

    const updatedDoc = await Testimonial.findByIdAndUpdate(
      id,
      { priority: parsedPriority },
      { new: true },
    ).lean();

    if (!updatedDoc) {
      return {
        success: false,
        message: "Testimonial not found",
      };
    }

    return {
      success: true,
      updated: serializeData(updatedDoc) as TestimonialItem,
    };
  } catch (error) {
    console.error("updateTestimonialPriority error:", error);

    return {
      success: false,
      message: "Something went wrong while updating priority",
    };
  }
}
