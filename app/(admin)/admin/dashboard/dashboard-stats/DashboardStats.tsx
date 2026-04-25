"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";
import { Mail, Clock, CheckCircle, Inbox } from "lucide-react";
import { Stats } from "@/lib/types";

// Reuse your Counter component (no change needed)

type Props = {
  statsData: Stats;
};

const DashboardStats = ({ statsData }: Props) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Total */}
        <GlassCard className="relative flex flex-col justify-between min-h-[150px] group hover:-translate-y-1 transition-all duration-300">
          <Inbox className="absolute top-6 right-6 w-12 h-12 text-primary/50" />
          <div className="">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              Total Queries
            </p>
            <h3 className="text-4xl md:text-5xl font-extrabold text-primary ">
              {statsData.total}
            </h3>
          </div>
        </GlassCard>

        {/* New */}
        <GlassCard className="relative p-6 flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-all duration-300">
          <Mail className="absolute top-5 right-5 w-12 h-12 text-blue-400/50" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              New
            </p>
            <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500">
              {statsData.new}
            </h3>
          </div>
        </GlassCard>

        {/* In Progress */}
        <GlassCard className="relative p-6 flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-all duration-300">
          <Clock className="absolute top-5 right-5 w-12 h-12 text-yellow-400/50" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              In Progress
            </p>
            <h3 className="text-4xl md:text-5xl font-extrabold text-yellow-500">
              {statsData.inProgress}
            </h3>
          </div>
        </GlassCard>

        {/* Completed */}
        <GlassCard className="relative p-6 flex flex-col justify-between min-h-[140px] group hover:-translate-y-1 transition-all duration-300">
          <CheckCircle className="absolute top-5 right-5 w-12 h-12 text-green-400/50" />
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
              Completed
            </p>
            <h3 className="text-4xl md:text-5xl font-extrabold text-green-500">
              {statsData.completed}
            </h3>
          </div>
        </GlassCard>
      </div>
    </>
  );
};

export default DashboardStats;
