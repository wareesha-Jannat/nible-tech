import React from 'react'
import { getFeaturedFaqs } from './data'
import FAQs from './FAQs';

const FAQWrapper = async() => {
 const result = await getFeaturedFaqs();
  return (
    <>
    {(result.success) ? (
        <FAQs faqsData={result.data} />
       ) : (
        <div className="text-center text-gray-500 py-10">
           {result.message || "Failed to load Faqs"}
          </div>
       )}
    </>
  )
}

export default FAQWrapper
