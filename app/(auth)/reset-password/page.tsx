import React from "react";
import ResetPassword from "./ResetPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Securely reset your Nible Tech account password",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <>
      <ResetPassword />
    </>
  );
};

export default page;
