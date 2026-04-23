import React from 'react'
import DashboardStats from './DashboardStats'
import { getQueriesOverview } from './data'

const DashboardStatsWrapper = async() => {
const result = await getQueriesOverview()

  return (
   <>
         {result.success && result.data !== null ? (
           <DashboardStats statsData={result.data} />
         ) : (
           <div className="text-center text-gray-500 py-10">
             {result.message || "Failed to load stats"}
           </div>
         )}
       </>
  )
}

export default DashboardStatsWrapper
