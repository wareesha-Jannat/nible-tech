import ChangePassword from "./change-password/ChangePassword";
import PersonalInfoSection from "./personal-info/PersonalInfoSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account settings and personal information",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <main>
      <PersonalInfoSection />
      <ChangePassword />
    </main>
  );
};

export default page;
