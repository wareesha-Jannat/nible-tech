import React from "react";
import { getStatsData } from "./data";
import Stats from "./Stats";

const StatsSectionWrapper = async () => {
  const result = await getStatsData();
  return (
    <>
      {result.success ? (
        <Stats statsData={result.stats} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          {result.message || "Failed to load Stats"}
        </div>
      )}
    </>
  );
};

export default StatsSectionWrapper;
