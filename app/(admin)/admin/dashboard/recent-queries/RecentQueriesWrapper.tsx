import React from 'react'
import { getRecentQueries } from './data'
import RecentQueries from './RecentQueries'

const RecentQueriesWrapper = async() => {
  const data = await getRecentQueries()
  return (
   <>
    {data.length !== 0 ? (
              <RecentQueries queries={data} />
            ) : (
              <div className="text-center text-gray-500 py-10">
              Failed to Fetch Recent Queries
              </div>
            )}
   </>
  )
}

export default RecentQueriesWrapper
