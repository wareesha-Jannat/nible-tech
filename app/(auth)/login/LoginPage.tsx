"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    console.log("Login data:", data);
  };

  return (
    <section className="relative w-full border-l border-r border-gray-200 min-h-dvh flex items-center justify-center text-foreground overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background -z-20" />

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-300/40 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-100/60 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="w-full px-8 md:px-16 py-12 lg:px-24 mx-auto flex flex-col items-center relative z-10">
        {/* Clean Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10 w-[350px] md:w-[450px] flex flex-col gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/" className="flex items-center space-x-1 group">
              <Image
                src="/logo.png"
                alt="NibleTech Logo"
                width={50}
                height={50}
                priority
                className="w-[50px] h-[50px] object-contain transition-transform group-hover:scale-105"
              />
              <span className="flex items-center font-bold text-lg tracking-wide">
                <span>Nible</span>
                <span className="text-primary-light ml-1">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Admin Dashboard Login
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                type="email"
                placeholder="admin@nibletech.com"
                {...register("email")}
                className={`px-4 py-2.5 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary pr-10`}
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

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register("remember")} />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
