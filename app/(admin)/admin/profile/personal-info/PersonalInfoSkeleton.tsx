import React from "react";

const PersonalInfoSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-8">
      <div className="flex flex-col items-center gap-8 animate-pulse">
        {/* Profile Image */}
        <div className="w-[120px] h-[120px] rounded-full bg-gray-200" />

        {/* Meta Info (Role, Joined, Updated) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-gray-100 rounded-xl py-4">
            <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>

          <div className="flex flex-col items-center bg-gray-100 rounded-xl py-4">
            <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          <div className="flex flex-col items-center bg-gray-100 rounded-xl py-4">
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-200" />

        {/* Form Fields */}
        <div className="w-full space-y-5">
          {/* Name */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>

          {/* Email */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-12 w-full bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-end">
          <div className="h-10 w-32 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSkeleton;
