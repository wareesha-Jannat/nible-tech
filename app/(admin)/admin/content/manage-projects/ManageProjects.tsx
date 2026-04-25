"use client";

import React, { useState } from "react";
import { ProjectItem, ProjectsPage } from "@/lib/types";
import ProjectDrawer from "./ProjectDrawer";
import Image from "next/image";
import { ChevronDown, Loader2 } from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";
import { useProjects } from "@/hooks/useProjects";

import {
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectPriorityMutation,
} from "./mutations";
import { ProjectBackendType } from "@/lib/validations/project";

export type ProjectDrawerResponse = {
  data: ProjectBackendType;
  imageFile: File | null;
  removeImage: boolean;
  _id?: string;
};

type ManageProjectsProps = {
  initialProjects: ProjectItem[];
  cursor: string | null;
  featureCount: number;
};

const ManageProjects = ({
  initialProjects,
  cursor,
  featureCount,
}: ManageProjectsProps) => {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // ----------------------------
  // Queries
  // ----------------------------
  const isSearching = debouncedSearch.length > 0;

  const initialData = {
    projects: initialProjects,
    nextCursor: cursor,
    featureCount,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProjects({
    initialData: isSearching || showFeaturedOnly ? undefined : initialData,
    search: debouncedSearch,
    featuredOnly: showFeaturedOnly,
  });

  const projects =
    data?.pages.flatMap((page: ProjectsPage) => page.projects) ?? [];

  const featuredCount = data?.pages[0]?.featureCount ?? 0;

  // ----------------------------
  // Mutations
  // ----------------------------
  const addMutation = useAddProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const deleteMutation = useDeleteProjectMutation();
  const priorityMutation = useUpdateProjectPriorityMutation();
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
    if (isCreating) {
      await addMutation.mutateAsync(payload, {
        onSuccess: () => closeDrawer(),
      });
    } else {
      await updateMutation.mutateAsync(payload, {
        onSuccess: () => closeDrawer(),
      });
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const deleteProject = (id: string) => {
    deleteMutation.mutate(id);
  };

  // ----------------------------
  // Load more
  // ----------------------------
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const changePriority = (id: string, value: number) => {
    if (value < 0) return;

    priorityMutation.mutate({
      id,
      priority: value,
    });
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
          disabled={addMutation.isPending}
          className="px-4 w-full sm:w-auto ml-auto py-2 bg-primary text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {addMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "+ Add Project"
          )}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={() => setShowFeaturedOnly((prev) => !prev)}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
            showFeaturedOnly
              ? "bg-primary text-white border-primary"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          {showFeaturedOnly ? "All Projects" : "Featured"}
        </button>
      </div>

      {/* Grid */}
      <div className="space-y-3">
        {projects.length > 0 ? (
          projects.map((p, index) => {
            const isDeleting =
              deleteMutation.isPending && deleteMutation.variables === p._id;

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
                    {p.featured && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                        Featured
                      </span>
                    )}

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
                      disabled={isDeleting}
                      className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                    >
                      {isDeleting ? (
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
                      />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted mb-3">{p.description}</p>
                      {p.featured && (
                        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
                          {/* Priority Display */}
                          <div className="text-sm">
                            <span className="text-gray-500 mr-2">
                              Priority:
                            </span>
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
                              changePriority(p._id, Number(e.target.value))
                            }
                            className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                      )}
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

        {hasNextPage && (
          <button
            onClick={loadMore}
            disabled={isFetchingNextPage}
            className="mt-6 px-4 py-2 border rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>

      {/* Drawer */}
      {(selected || isCreating) && (
        <ProjectDrawer
          project={selected}
          onClose={closeDrawer}
          onSave={saveProject}
          featuredCount={featuredCount}
        />
      )}
    </>
  );
};

export default ManageProjects;
