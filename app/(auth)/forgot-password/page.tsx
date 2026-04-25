import React from 'react'
import ForgotPassword from './ForgotPassword'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Nible Tech account password securely",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <>
    <main>
      <ForgotPassword />
      </main>
    </>
  )
}

export default page
