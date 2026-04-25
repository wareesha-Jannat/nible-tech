import React, { Suspense } from 'react'
import ManageProjectsWrapper from './ManageProjectsWrapper'
import LoadingSkeleton from '../components/LoadingSkeleton'

const ManageProjectsSection = () => {
  return (
     <section id="projects" className="w-full  px-4 md:px-10 py-10 border-l border-r border-b border-border">
         <Suspense fallback={<LoadingSkeleton />}>
           <ManageProjectsWrapper />
         </Suspense>
       </section>
  )
}

export default ManageProjectsSection
