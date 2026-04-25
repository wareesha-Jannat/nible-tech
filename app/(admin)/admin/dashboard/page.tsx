import React from "react";
import ContentCards from "./components/ContentCards";
import DashboardStatsSection from "./dashboard-stats/DashboardStatsSection";
import RecentQueriesSection from "./recent-queries/RecentQueriesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for managing Nible Tech platform",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <main>
      <DashboardStatsSection />
      <ContentCards />
      <RecentQueriesSection />
    </main>
  );
};

export default page;
