import React, { Suspense } from "react";
import PersonalInfoWrapper from "./PersonalInfoWrapper";
import PersonalInfoSkeleton from "./PersonalInfoSkeleton";

const PersonalInfoSection = () => {
  return (
    <section className="w-full py-16 px-6 border-l border-r border-b border-border">
      {/* Heading */}
      <div className="max-w-3xl text-center mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold">Personal Info</h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your profile details
        </p>
      </div>
      <Suspense fallback={<PersonalInfoSkeleton />}>
        {/* Personal Info Form */}
        <PersonalInfoWrapper />
      </Suspense>
    </section>
  );
};

export default PersonalInfoSection;
