import React from "react";

import ManageStatsSection from "./manage-stats/ManageStatsSection";
import ManageServicesSection from "./manage-services/ManageServicesSection";
import ManageTestimonialsSection from "./manage-testimonials/ManageTestimonialsSection";
import ManageProjectsSection from "./manage-projects/ManageProjectsSection";
import ManageFAQSection from "./manage-faqs/ManageFAQSection";
import type { Metadata } from "next";
import ManageBlogsSection from "./manage-blogs/ManageBlogsSection";

export const metadata: Metadata = {
  title: "Content Management",
  description: "Manage website content for Nible Tech",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <main>
      <ManageStatsSection />
      <ManageServicesSection />
      <ManageTestimonialsSection />
      <ManageProjectsSection />
      <ManageFAQSection />
      <ManageBlogsSection />
    </main>
  );
};

export default page;
