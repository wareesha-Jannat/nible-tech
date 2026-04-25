import React, { Suspense } from 'react'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ManageFaqWrapper from './ManageFaqWrapper'

const ManageFAQSection = () => {
  return (
     <section id="faqs" className="w-full  px-4 md:px-10 py-10 border-l border-r border-b border-border">
          <Suspense fallback={<LoadingSkeleton />}>
            <ManageFaqWrapper />
          </Suspense>
        </section>
  )
}

export default ManageFAQSection
