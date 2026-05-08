"use server";
import { connectDB } from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/email";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/forgotPassword";
import PasswordResetToken from "@/models/PasswordResetToken";
import { User } from "@/models/User";
import crypto from "crypto";

export async function ResetPasswordLink(data: ForgotPasswordInput) {
  try {
    await connectDB();

    const result = forgotPasswordSchema.safeParse(data);
    if (!result.success) {
      return { error: "Invalid email" };
    }

    const { email } = result.data;

    const existingEmail = await User.findOne({ email });

    // prevent email enumeration
    if (!existingEmail) {
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await PasswordResetToken.create({
      email,
      token: hashedToken,
      expiresAt,
    });
    await sendResetPasswordEmail({
      email,
      resetLink,
    });

    return { success: true };
  } catch (error) {
    console.error("error in forgot password", error);
    return { error: "Something went wrong" };
  }
}
