"use client";

import React, { useState } from "react";
import QueriesHeaderSection from "./QueriesHeaderSection";
import QueriesList from "./QueriesList";

const QueriesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
 
  return (
    <>
      <QueriesHeaderSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <QueriesList activeTab={activeTab} />
    </>
  );
};

export default QueriesPage;