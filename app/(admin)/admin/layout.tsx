import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminHeader from "./AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard | Nible Tech",
  description: "admin panel for Nible Tech management system",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const user = session?.user;
//redirect if not logged in
if (!user || user.role !== "SUPER_ADMIN") {
  redirect("/login");
}

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader user={session?.user} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
