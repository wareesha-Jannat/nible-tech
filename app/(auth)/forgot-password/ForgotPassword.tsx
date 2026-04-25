"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordInput,
} from "@/lib/validations/forgotPassword";
import toast from "react-hot-toast";
import { ResetPasswordLink } from "./action";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    console.log("Send reset link to:", data.email);

    try {
      const result = await ResetPasswordLink(data);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Password Reset link sent successfully");
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
          <h2 className="text-2xl font-semibold">Forgot Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email Address</label>

            <input
              type="email"
              placeholder="admin@nibletech.com"
              {...register("email")}
              className={`w-full mt-2 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
