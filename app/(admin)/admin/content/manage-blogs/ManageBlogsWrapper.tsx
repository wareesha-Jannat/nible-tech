import React from "react";
import { getBlogs } from "./data";
import ManageBlogs from "./ManageBlogs";

const ManageBlogsWrapper = async () => {
  const result = await getBlogs();

  return (
    <>
      {!result.success ? (
        <div className="text-center text-gray-500 py-10">
          {" "}
          Failed to load Testimonials
        </div>
      ) : (
        <ManageBlogs initialBlogs={result.blogs} />
      )}
    </>
  );
};

export default ManageBlogsWrapper;
