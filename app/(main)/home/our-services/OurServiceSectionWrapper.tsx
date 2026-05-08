import React from 'react'
import { getServices } from './data'
import Services from './Services';

const OurServiceSectionWrapper = async() => {
    const result = await getServices();

  return (
    <>
   {(result.success) ? (
    <Services serviceData={result.data} />
   ) : (
    <div className="text-center text-gray-500 py-10">
       {result.message || "Failed to load Services"}
      </div>
   )}
   </>
  )
}

export default OurServiceSectionWrapper
