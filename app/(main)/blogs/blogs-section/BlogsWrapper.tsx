import React from "react";
import Blogs from "./Blogs";
import { getBlogs } from "./data";

const BlogsWrapper = async () => {
  const result = await getBlogs();
  return (
    <>
      {result.success ? (
        <Blogs blogsData={result.data} />
      ) : (
        <div className="text-center text-gray-500 py-10">
          {result.message || "Failed to load projects"}
        </div>
      )}
    </>
  );
};

export default BlogsWrapper;
