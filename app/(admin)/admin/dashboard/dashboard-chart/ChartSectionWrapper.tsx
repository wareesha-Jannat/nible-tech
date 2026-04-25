import React from "react";
import { getQueryTrends } from "./data";
import ChartSection from "./ChartSection";

const ChartSectionWrapper = async () => {
  const [weekRes, monthRes, yearRes] = await Promise.all([
    getQueryTrends("week"),
    getQueryTrends("month"),
    getQueryTrends("year"),
  ]);

  // ❌ If any fails → show error UI
  if (!weekRes.success || !monthRes.success || !yearRes.success) {
    return (
      <div className="text-center text-gray-500 py-10">
        {weekRes.message ||
          monthRes.message ||
          yearRes.message ||
          "Failed to load chart data"}
      </div>
    );
  }

  // ✅ All good → pass clean data
  return (
    <ChartSection
      weekData={weekRes.data}
      monthData={monthRes.data}
      yearData={yearRes.data}
    />
  );
};

export default ChartSectionWrapper;
