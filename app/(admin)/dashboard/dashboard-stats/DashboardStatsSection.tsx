import React, { Suspense } from "react";
import ManageStatsSkeleton from "../../content/manage-stats/ManageStatsSkeleton";
import DashboardStatsWrapper from "./DashboardStatsWrapper";
import ChartSectionWrapper from "../dashboard-chart/ChartSectionWrapper";
import DashboardStatsSkeleton from "./DashboardStatsSkeleton";
import ChartSectionSkeleton from "../dashboard-chart/ChartSectionSkeleton";

const DashboardStatsSection = () => {
  return (
    <section className="relative w-full py-18 px-8 border-l border-r  border-border overflow-hidden">
      {/* Background Glow (subtle for dashboard) */}
      <div className="absolute top-[50%] left-[20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary-dark text-center">
          Queries Overview
        </h2>
        <Suspense fallback={<DashboardStatsSkeleton />}>
          <DashboardStatsWrapper />
        </Suspense>
      </div>
      <Suspense fallback={<ChartSectionSkeleton />}>
        <ChartSectionWrapper />
      </Suspense>
    </section>
  );
};

export default DashboardStatsSection;
