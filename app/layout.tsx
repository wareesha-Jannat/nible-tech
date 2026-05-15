import type { Metadata } from "next";
import "./globals.css";

import { auth } from "@/lib/auth";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./components/ReactQueryProvider";
import SessionWrapper from "./components/SessionWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nibletech.com"),

  title: {
    default: "Nible Tech | Modern IT & Web Development Company in Pakistan",
    template: "%s | Nible Tech",
  },

  description:
    "Nible Tech is a modern IT company based in Lahore, Pakistan, offering web development, digital marketing, WordPress development,  and custom software solutions.",

  keywords: [
    "Nible Tech",
    "IT company Pakistan",
    "web development Lahore",
    "software house Pakistan",
    "digital marketing agency",
    "WordPress development",
    "SEO Optimization",
    "content marketing",
    "custom web solutions",
  ],

  authors: [
    {
      name: "Mastahb Raza",
      url: "https://nibletech.com",
    },
  ],

  openGraph: {
    title: "Nible Tech - Modern IT Solutions Company",
    description:
      "Professional IT services including web development, SEO optimization, digital marketing, and custom software solutions.",
    url: "https://nibletech.com",
    siteName: "Nible Tech",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nible Tech",
    description:
      "Modern IT company delivering high-end digital solutions in Pakistan.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔐 Server-side session (important for hydration consistency)
  const session = await auth();

  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body>
        <ReactQueryProvider>
          <SessionWrapper session={session}>
            {children}

            {/* Global Toasts */}
            <Toaster position="top-right" />
          </SessionWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
