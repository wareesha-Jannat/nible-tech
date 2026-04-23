import React from "react";

import ManageStatsSection from "./manage-stats/ManageStatsSection";
import ManageServicesSection from "./manage-services/ManageServicesSection";
import ManageTestimonialsSection from "./manage-testimonials/ManageTestimonialsSection";
import ManageProjectsSection from "./manage-projects/ManageProjectsSection";
import ManageFAQSection from "./manage-faqs/ManageFAQSection";

const page = () => {
  return (
    <>
      <ManageStatsSection />
      <ManageServicesSection />
      <ManageTestimonialsSection />
      <ManageProjectsSection />
      <ManageFAQSection />
    </>
  );
};

export default page;
