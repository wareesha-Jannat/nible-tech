import React from "react";
import { getProjects } from "./data";
import ManageProjects from "./ManageProjects";

const ManageProjectsWrapper = async () => {
  const result = await getProjects();
  return (
    <>
      {!result.success ? (
        <div className="text-center text-gray-500 py-10">
          {" "}
          Failed to load projects
        </div>
      ) : (
        <ManageProjects
          initialProjects={result.projects}
        />
      )}
    </>
  );
};

export default ManageProjectsWrapper;
