import React, { Suspense } from "react";

import ManageTestimonialsWrapper from "./ManageTestimonialsWrapper";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ManageTestimonialsSection = () => {
  return (
    <section id="testimonials" className="w-full  px-4 md:px-10 py-10 border-l border-r border-b border-border">
      <Suspense fallback={<LoadingSkeleton />}>
        <ManageTestimonialsWrapper />
      </Suspense>
    </section>
  );
};

export default ManageTestimonialsSection;
