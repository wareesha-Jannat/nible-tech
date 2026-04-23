import React from "react";
import PersonalInfo from "./PersonalInfo";
import { getUserData } from "./data";

const PersonalInfoWrapper = async () => {
  const result = await getUserData();

  return (
    <>
      {result.success ? (
        <PersonalInfo user={result.data} />
      ) : (
        <div className="text-center text-gray-500 py-10">{result.error}</div>
      )}
    </>
  );
};

export default PersonalInfoWrapper;
