import React, { Suspense } from "react"
import ManageServicesWrapper from "./ManageServicesWrapper";
import LoadingSkeleton from "../components/LoadingSkeleton";

const ManageServicesSection = () => {
  return (
    <section id="services" className="w-full  px-4 md:px-10 py-10 border-l border-r border-b border-border">
      <Suspense fallback={<LoadingSkeleton />}>
        <ManageServicesWrapper />
      </Suspense>
    </section>
  );
};

export default ManageServicesSection;
