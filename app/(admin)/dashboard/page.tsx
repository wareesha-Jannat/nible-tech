import React from "react";
import DashboardStats from "./dashboard-stats/DashboardStats";
import ContentCards from "./components/ContentCards";
import RecentQueries from "./recent-queries/RecentQueries";
import DashboardStatsSection from "./dashboard-stats/DashboardStatsSection";
import RecentQueriesSection from "./recent-queries/RecentQueriesSection";

const page = () => {
  return (
    <>
      <DashboardStatsSection />
      <ContentCards />
      <RecentQueriesSection />
    </>
  );
};

export default page;
