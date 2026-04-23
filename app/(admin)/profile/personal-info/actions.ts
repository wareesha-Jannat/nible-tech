"use server";

import { UserImage } from "@/lib/types";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";

type UpdatePersonalInfoInput = {
  name: string;
  image?: File | null;
  deleteImage?: boolean;
  existingPublicId?: string | null;
};

export const updatePersonalInfo = async ({
  name,
  image,
  deleteImage,
  existingPublicId,
}: UpdatePersonalInfoInput) => {
  try {
    await connectDB();

    let imageData: UserImage | null | undefined = undefined;

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
    const updateData: any = {
      name,
    };

    // only include image if it changed
    if (imageData !== undefined) {
      updateData.image = imageData;
    }

    // 🧠 4️⃣ UPDATE USER
    await User.findOneAndUpdate({}, updateData);

    // 🧠 5️⃣ REVALIDATE
    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("updatePersonalInfo error:", error);

    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
};

// export const deleteProject = async (projectId: string) => {
//   try {
//     await connectDB();

//     const project = await Project.findById(projectId);

//     if (project?.image?.public_id) {
//       await deleteFromCloudinary(project.image.public_id);
//     }

//     await Project.findByIdAndDelete(projectId);

//     return { success: true };
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to delete project");
//   }
// };
