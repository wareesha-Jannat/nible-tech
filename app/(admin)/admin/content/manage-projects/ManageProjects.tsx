"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/lib/types";
import ProjectDrawer from "./ProjectDrawer";
import Image from "next/image";
import { ChevronDown, Loader2 } from "lucide-react";

import { ProjectBackendType } from "@/lib/validations/project";
import {
  addProject,
  deleteProjectDB,
  updateProject,
  updateProjectPriority,
} from "./action";
import toast from "react-hot-toast";

export type ProjectDrawerResponse = {
  data: ProjectBackendType;
  imageFile: File | null;
  removeImage: boolean;
  _id?: string;
};

type ManageProjectsProps = {
  initialProjects: ProjectItem[];
};

const ManageProjects = ({ initialProjects }: ManageProjectsProps) => {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ----------------------------
  // Drawer handlers
  // ----------------------------
  const openCreate = () => {
    setSelected(null);
    setIsCreating(true);
  };

  const closeDrawer = () => {
    setSelected(null);
    setIsCreating(false);
  };

  const openEdit = (p: ProjectItem) => {
    setSelected(p);
    setIsCreating(false);
  };

  // ----------------------------
  // SAVE
  // ----------------------------
  const saveProject = async (payload: ProjectDrawerResponse) => {
    try {
      if (isCreating) {
        const res = await addProject({
          restData: payload.data,
          imageFile: payload.imageFile,
        });

        if (!res.success) {
          throw new Error(res.message);
        }

        // ✅ add new project to state (top of list)
        setProjects((prev) => [res.newProject, ...prev]);

        toast.success("Project added successfully");
      } else {
        if (!payload._id) {
          toast.error("No project selected");
          return;
        }

        const res = await updateProject({
          id: payload._id,
          restData: payload.data,
          imageFile: payload.imageFile,
          removeImage: payload.removeImage,
        });

        if (!res.success) {
          throw new Error(res.message);
        }

        // ✅ update project in state
        setProjects((prev) =>
          prev.map((p) => (p._id === payload._id ? res.updated : p)),
        );

        toast.success("Project updated successfully");
      }

      closeDrawer();
    } catch (err: unknown) {
      console.error(err);

      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const deleteProject = async (id: string) => {
    if (loadingId) return;
    try {
      setLoadingId(id);

      const res = await deleteProjectDB(id);

      if (!res.success) throw new Error(res.message);

      setProjects((prev) => prev.filter((s) => s._id !== id));

      toast.success("Project deleted");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const updatePriority = async (id: string, priority: number) => {
    try {
      const res = await updateProjectPriority(id, priority);

      if (!res.success) throw new Error(res.message);
      toast.success("Priority updated");
      setProjects((prev) => prev.map((s) => (s._id === id ? res.updated : s)));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update Priority");
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Projects
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your projects and portfolio
          </p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 w-full sm:w-auto ml-auto py-2 bg-primary text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          + Add Project
        </button>
      </div>

      {/* Grid */}
      <div className="space-y-3">
        {projects.length > 0 ? (
          projects.map((p, index) => {
            return (
              <details
                key={p._id}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {/* SUMMARY */}
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted font-semibold">
                      {index + 1}.
                    </span>

                    <div>
                      <h3 className="font-semibold text-primary-dark text-sm">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center ml-auto gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openEdit(p);
                      }}
                      className="px-3 py-1 text-xs border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteProject(p._id);
                      }}
                      disabled={p._id == loadingId}
                      className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                    >
                      {p._id === loadingId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <ChevronDown className="transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>

                {/* EXPANDED */}
                <div className="px-5 pb-5 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Image */}
                    <div className="relative w-full h-[200px] md:h-[150px] rounded-lg overflow-hidden border">
                      <Image
                        src={p.image?.url || "/default-cover.jpg"}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted mb-3">{p.description}</p>
                      {p.demoUrl && (
                        <div className="mb-4">
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 text-xs bg-primary text-white rounded-md hover:opacity-90 transition"
                          >
                            View Demo
                          </a>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
                        {/* Priority Display */}
                        <div className="text-sm">
                          <span className="text-gray-500 mr-2">Priority:</span>
                          <span className="font-semibold">
                            {p.priority ?? 0}
                          </span>
                        </div>

                        {/* Controls */}
                        <input
                          type="number"
                          defaultValue={p.priority ?? 0}
                          min={0}
                          onBlur={(e) =>
                            updatePriority(p._id, Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      <div className="mb-2">
                        <p className="text-sm text-muted mb-1">Features</p>
                        <ul className="list-disc list-inside text-sm">
                          {p.features?.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.technologies?.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-primary/10 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">
            No projects found
          </div>
        )}
      </div>

      {/* Drawer */}
      {(selected || isCreating) && (
        <ProjectDrawer
          project={selected}
          onClose={closeDrawer}
          onSave={saveProject}
        />
      )}
    </>
  );
};

export default ManageProjects;
