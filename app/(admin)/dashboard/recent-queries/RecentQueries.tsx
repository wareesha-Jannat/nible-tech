"use client";
import React from "react";
import GlassCard from "@/app/components/GlassCard";
import Link from "next/link";
import { queries } from "@/app/utils/dummyData";
import { getStatusStyle } from "@/lib/utils";
import { QueryItem } from "@/lib/types";

type RecentQueriesProps = {
  queries: QueryItem[];
};

const RecentQueries = ({ queries }: RecentQueriesProps) => {
  return (
    <>
      {/* Queries List */}
      <GlassCard className="px-4 sm:px-6 py-4">
        {queries.slice(0, 5).map((query, index) => (
          <div
            key={query._id}
            className={`flex items-center flex-wrap gap-3 px-2 py-3 transition hover:bg-gray-50 ${
              index !== queries.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="flex gap-3 items-start">
              {/* Left: Number */}
              <span className="text-sm font-semibold text-gray-400 mt-1 min-w-[20px]">
                {index + 1}.
              </span>

              {/* Right: Content */}
              <div>
                <h3 className="font-semibold text-primary-dark">
                  {query.name}
                </h3>

                <p className="text-sm text-gray-500">{query.projectType}</p>

                <p className="text-sm text-gray-400">{query.budget}</p>
              </div>
            </div>

            {/* Status */}
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ml-auto ${getStatusStyle(
                query.status,
              )}`}
            >
              {query.status}
            </span>
          </div>
        ))}
      </GlassCard>
    </>
  );
};

export default RecentQueries;
