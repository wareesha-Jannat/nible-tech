import React from "react";
import PersonalInfo from "./PersonalInfo";
import { getUserData } from "./data";
import { auth } from "@/lib/auth";

const PersonalInfoWrapper = async () => {
  const session = await auth();
  if (session) {
    const result = await getUserData(session?.user.id);

    return (
      <>
        {result.success && result.data !== null ? (
          <PersonalInfo user={result.data} />
        ) : (
          <div className="text-center text-gray-500 py-10">{result.error}</div>
        )}
      </>
    );
  }
  return null;
};

export default PersonalInfoWrapper;
