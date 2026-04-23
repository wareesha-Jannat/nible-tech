"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/lib/validations/changePassword";
import { Eye, EyeOff } from "lucide-react";
import { updatePassword } from "./action";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordType) => {
    
    const response = await updatePassword(data);
   
    if (response.success) {
      toast.success("Password updated successfully");
    } else {
      toast.error(response.message || "Failed to update password");
    }
    reset();
  };

  return (
    <section className="w-full py-16 px-6">
      {/* Heading */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold">Security</h2>
        <p className="text-sm text-gray-500 mt-1">Update your password</p>
      </div>

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-8 transition hover:shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Current Password
            </label>

            <div className="relative mt-2">
              <input
                type={showCurrent ? "text" : "password"}
                {...register("currentPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none pr-10 focus:ring-2 focus:ring-primary-light"
              />

              <button
                type="button"
                onClick={() => setShowCurrent((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none pr-10 focus:ring-2 focus:ring-primary-light"
              />

              <button
                type="button"
                onClick={() => setShowNew((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none pr-10 focus:ring-2 focus:ring-primary-light"
              />

              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
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

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary-dark active:bg-primary-dark transition-colors duration-200 text-white rounded-md disabled:opacity-30"
            >
              {isSubmitting ? "Saving..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
