"use server";
import { connectDB } from "@/lib/db";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/forgotPassword";
import PasswordResetToken from "@/models/PasswordResetToken";
import { User } from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

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

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    console.log(
      `RESET URL: http://localhost:3000/reset-password?token=${token}`,
    );
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Reset your Password",
      html: `
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    });

    await PasswordResetToken.create({
      email,
      token: hashedToken,
      expiresAt,
    });

    return { success: true };
  } catch (error) {
    console.error("error in forgot password", error);
    return { error: "Something went wrong" };
  }
}
