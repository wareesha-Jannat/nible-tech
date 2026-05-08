import React from 'react'
import { getFaqs } from './data'
import ManageFaqs from './ManageFaqs'

const ManageFaqWrapper = async() => {
    const result = await getFaqs()
  return (
    <>
     {!result.success ? (
        <div className="text-center text-gray-500 py-10">
          {" "}
          Failed to load Faqs
        </div>
      ) : (
        <ManageFaqs
          initialFaqs={result.faqs}
        />
      )}
    </>
  )
}

export default ManageFaqWrapper
