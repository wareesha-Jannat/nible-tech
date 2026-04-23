"use client";

import React, { useState } from "react";
import GlassCard from "@/app/components/GlassCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export type ChartData = {
  name: string;
  queries: number;
};

type Props = {
  weekData: ChartData[];
  monthData: ChartData[];
  yearData: ChartData[];
};

const ChartSection = ({ weekData, monthData, yearData }: Props) => {
  const [filter, setFilter] = useState<"week" | "month" | "year">("week");

  const getData = () => {
    switch (filter) {
      case "month":
        return monthData;
      case "year":
        return yearData;
      default:
        return weekData;
    }
  };

  const getTotal = () => {
    return getData().reduce((acc, item) => acc + item.queries, 0);
  };

  return (
   
      <GlassCard className="px-4 sm:px-6 mt-16 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-primary-dark">
              Query Trends
            </h3>
            <p className="text-sm text-gray-500">Total: {getTotal()} queries</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {["week", "month", "year"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item as "week" | "month" | "year")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  filter === item
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[500px] md:min-w-0 h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#070708" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />

                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#bb69f1"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
  );
};

export default ChartSection;
