import React from "react";
import { getSuccessData } from "./data";
import SuccessStories from "./SuccessStories";

const SuccessStoriesWrapper = async () => {
  const result = await getSuccessData();
  return (
    <>
      {result.success ? (
        <SuccessStories
          projectsData={result.data.projects}
          testimonialsData={result.data.testimonials}
        />
      ) : (
        <div className="text-center text-gray-500 py-10">
          {result.message || "Failed to load Success stories"}
        </div>
      )}
    </>
  );
};

export default SuccessStoriesWrapper;
