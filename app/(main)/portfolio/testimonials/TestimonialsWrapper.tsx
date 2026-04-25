import React from 'react'
import { getFeaturedTestimonials } from './data'
import Testimonials from './Testimonials';


const TestimonialsWrapper = async() => {
    const result  = await getFeaturedTestimonials();
   
  return (
     <>
       {(result.success) ? (
           <Testimonials testimonialsData={result.data} />
          ) : (
           <div className="text-center text-gray-500 py-10">
              {result.message || "Failed to load Testimonials"}
             </div>
          )}
       </>
  )
}

export default TestimonialsWrapper
