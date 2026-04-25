"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { loginSchema, LoginInput } from "@/lib/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      
      if (res?.error) {
        toast.error(res.code ?? "login failed");
      } else {
        toast.success("Login successful 🚀");
        reset();
        router.push("/admin/dashboard");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    }
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

            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded min-w-[110px] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Login
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
