"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "@/lib/validations/resetPassword";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ChangePassword } from "./action";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    console.log("Reset Password:", data);
    try {
      const result = await ChangePassword({ data, token });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("password saved successfully");
        reset();
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong");
    }
  };

  return (
    <section className="w-full min-h-dvh flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your new password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="text-sm text-gray-600">New Password</label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10 outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-10 outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg"
          >
            {isSubmitting ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
