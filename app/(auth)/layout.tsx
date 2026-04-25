import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  description: "Login and account recovery for Nible Tech admin panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    redirect("/admin/dashboard");
  }
  return <main className=" min-h-dvh ">{children}</main>;
}
