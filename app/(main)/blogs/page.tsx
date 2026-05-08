import React from "react";
import type { Metadata } from "next";
import BlogsSection from "./blogs-section/BlogsSection";



export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read insightful articles, tutorials, and updates from Nible Tech on web development, design, and modern technologies.",
};

export default function BlogsPage() {
  return (
    <>
      <BlogsSection />
    </>
  );
}