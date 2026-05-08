import React from "react";
import ManageServices from "./ManageServices";
import { getServices } from "./data";

const ManageServicesWrapper = async () => {
  const result = await getServices();

  return (
    <>
      {!result.success ? (
        <div className="text-center text-gray-500 py-10">
          {" "}
          Failed to load services
        </div>
      ) : (
        <ManageServices initialServices={result.services} />
      )}
    </>
  );
};

export default ManageServicesWrapper;
