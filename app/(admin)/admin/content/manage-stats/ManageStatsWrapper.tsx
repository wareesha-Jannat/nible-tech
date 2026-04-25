import React from "react";
import { getStats } from "./data";
import ManageStats from "./ManageStats";

const ManageStatsWrapper = async () => {
  const result = await getStats();

  return (
    <>
      {result.success && result.data !== null ? (
        <ManageStats statsData={result.data} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          {result.error || "Failed to load stats"}
        </div>
      )}
    </>
  );
};

export default ManageStatsWrapper;
