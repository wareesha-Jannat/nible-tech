"use server"
import { connectDB } from "@/lib/db";
import { ResetPasswordInput, resetPasswordSchema } from "@/lib/validations/resetPassword";
import PasswordResetToken from "@/models/PasswordResetToken";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto"

export async function ChangePassword({data, token} : {data : ResetPasswordInput, token: string}) {
  try {
    await connectDB();
    const result = resetPasswordSchema.safeParse(data);
    if (!result.success) {
      return {
        error: "Invalid input",
      };
    }
    const { password } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const existingToken = await PasswordResetToken.findOne({
      token: hashedToken,
    });
    if (!existingToken) {
      return { error: "Token not found or expired" };
    }

    if (existingToken.expiresAt < Date.now()) {
      await existingToken.deleteOne();
      return {
        error: "Token expired ",
      };
    }

    await User.updateOne(
      { email: existingToken.email },
      { $set: { password: hashedPassword } }
    );

    await existingToken.deleteOne();
    return {
      success: true,
    };
  } catch (error) {
    console.log(error)
    return {
      error: "Something went wrong. Please try again",
    };
  }
}
