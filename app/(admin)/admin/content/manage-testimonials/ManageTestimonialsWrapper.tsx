import React from "react";
import { getTestimonials } from "./data";
import ManageTestimonials from "./ManageTestimonials";

const ManageTestimonialsWrapper = async () => {
  const result = await getTestimonials();

  return (
    <>
      {!result.success ? (
        <div className="text-center text-gray-500 py-10">
          {" "}
          Failed to load Testimonials
        </div>
      ) : (
        <ManageTestimonials initialTestimonials={result.testimonials} />
      )}
    </>
  );
};

export default ManageTestimonialsWrapper;
