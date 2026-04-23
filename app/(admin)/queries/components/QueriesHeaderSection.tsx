"use client";

import React, { useState } from "react";

const tabs = ["all", "new", "in-progress", "completed"];

interface QueriesHeaderSectionProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const QueriesHeaderSection = ({
  activeTab,
  setActiveTab,
}: QueriesHeaderSectionProps) => {
  return (
    <section className="w-full px-6 py-10 border-b border-gray-200">
      {/* Title + Subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-dark">Queries</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Manage and track client inquiries
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {tab === "all"
              ? "All"
              : tab === "new"
                ? "New"
                : tab === "in-progress"
                  ? "In Progress"
                  : "Completed"}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QueriesHeaderSection;
