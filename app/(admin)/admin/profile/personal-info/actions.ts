"use server";

import { Image } from "@/lib/types";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type UpdatePersonalInfoInput = {
  name: string;
  image?: File | null;
  deleteImage?: boolean;
  existingPublicId?: string | null;
};

type UpdateUserPayload = {
  name: string;
  image?: Image | null;
};

export const updatePersonalInfo = async ({
  name,
  image,
  deleteImage,
  existingPublicId,
}: UpdatePersonalInfoInput) => {
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

    let imageData: Image | null | undefined = undefined;

    // 🧠 1️⃣ DELETE IMAGE
    if (deleteImage && existingPublicId) {
      const res = await deleteFromCloudinary(existingPublicId);

      if (!res.success) {
        throw new Error("Failed to delete old image");
      }

      imageData = null; // remove from DB
    }

    // 🧠 2️⃣ NEW IMAGE UPLOAD (replace case)
    if (image) {
      // optional: delete old image first (cleaner storage)
      if (existingPublicId) {
        await deleteFromCloudinary(existingPublicId);
      }

      const uploaded = await uploadToCloudinary(image, "profile", "admin");

      imageData = uploaded;
    }

    // 🧠 3️⃣ BUILD UPDATE OBJECT (SMART WAY)
    const updateData: UpdateUserPayload = {
      name,
    };

    // only include image if it changed
    if (imageData !== undefined) {
      updateData.image = imageData;
    }

    // UPDATE USER
    await User.findByIdAndUpdate(session.user.id, updateData);

    //REVALIDATE
    revalidatePath("/admin/profile");

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error("updatePersonalInfo error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to update profile";

    return {
      success: false,
      error: message,
    };
  }
};
