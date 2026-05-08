import React, { Suspense } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ManageBlogsWrapper from "./ManageBlogsWrapper";

const ManageBlogsSection = () => {
  return (
    <section
      id="testimonials"
      className="w-full  px-4 md:px-10 py-10 border-l border-r border-b border-border"
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <ManageBlogsWrapper />
      </Suspense>
    </section>
  );
};

export default ManageBlogsSection;
