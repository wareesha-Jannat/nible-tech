import React from "react";
import { getFeaturedProjects } from "./data";
import OurWork from "./OurWork";

const OurWorkWrapper = async () => {
  const result = await getFeaturedProjects();
  return (
    <>
      {result.success ? (
        <OurWork projectsData={result.data} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          {result.message || "Failed to load projects"}
        </div>
      )}
    </>
  );
};

export default OurWorkWrapper;
