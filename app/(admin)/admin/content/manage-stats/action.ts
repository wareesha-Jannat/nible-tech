"use server";

import { connectDB } from "@/lib/db";
import { statSchema } from "@/lib/validations/stat";
import { Stat } from "@/models/stat";
import { StatItem } from "@/lib/types";
import { auth } from "@/lib/auth";

export async function updateStat(data: StatItem) {
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
    const { _id, ...rest } = data;
    const parsed = statSchema.safeParse(rest);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid stat data",
      };
    }
    const { value, suffix, label } = parsed.data;
    await connectDB();

    await Stat.findByIdAndUpdate(
      _id,
      { value, suffix, label },
      {
        runValidators: true,
      },
    );

    return {
      success: true,
      message: "Stat updated successfully",
    };
  } catch (error) {
    console.error("Error updating stat:", error);
    return {
      success: false,
      message: "An error occurred while updating the stat",
    };
  }
}
