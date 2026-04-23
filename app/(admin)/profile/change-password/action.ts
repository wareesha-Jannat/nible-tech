"use server";

import { connectDB } from "@/lib/db";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/lib/validations/changePassword";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function updatePassword(data: ChangePasswordType) {
  try {
    await connectDB();
    //validate
    const parsed = changePasswordSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, message: "Invalid password format" };
    }

    const { currentPassword, newPassword } = parsed.data;

    //get user
    const user = await User.findOne();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    //match password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return {
        success: false,
        message: "New password cannot be the same as current password",
      };
    }

    //hash password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    //update user
    await user.save();
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, message: "Failed to update password" };
  }
}
