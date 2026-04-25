import React from "react";
import LoginPage from "./LoginPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Nible Tech admin dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <LoginPage />;
};

export default page;
