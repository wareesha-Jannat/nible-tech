import React, { Suspense } from 'react'
import ManageStatsSkeleton from './ManageStatsSkeleton'
import ManageStatsWrapper from './ManageStatsWrapper'

const ManageStatsSection = () => {
  return (
   <>
    <section id="stats" className="w-full px-6 md:px-10 py-16 md:py-24 border-l border-r border-b border-border">
         {/* Title */}
         <div className="mb-10">
           <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
             Homepage Stats
           </h2>
           <p className="text-gray-500 text-sm mt-1">
             Manage statistics displayed on homepage
           </p>
         </div>
         <Suspense fallback={<ManageStatsSkeleton />}>
           <ManageStatsWrapper />
         </Suspense>
         </section>
   </>
  )
}

export default ManageStatsSection
