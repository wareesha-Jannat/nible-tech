import Link from "next/link";
import React, { Suspense } from "react";
import RecentQueriesWrapper from "./RecentQueriesWrapper";
import RecentQueriesSkeleton from "./RecentQueriesSkeleton";

const RecentQueriesSection = () => {
  return (
    <section className="w-full flex flex-col py-14 px-6 md:px-14 border border-border ">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-primary-dark">Recent Queries</h2>

        <Link href="/queries" className="text-sm text-primary ml-auto hover:underline">
          View All →
        </Link>
      </div>
      <Suspense fallback={<RecentQueriesSkeleton />}>
        <RecentQueriesWrapper />
      </Suspense>
    </section>
  );
};

export default RecentQueriesSection;
