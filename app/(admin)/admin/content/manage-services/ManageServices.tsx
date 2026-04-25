"use client";

import React, { useEffect, useState } from "react";
import { ServiceItem } from "@/lib/types";
import { ChevronDown, Loader2 } from "lucide-react";
import ServiceDrawer from "./ServiceDrawer";

import { useServices } from "@/hooks/useServices";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServicePriorityMutation,
} from "./mutations";
import { useDebounce } from "@/hooks/useDebounce";

type ManageServicesProps = {
  initialServices: ServiceItem[];
  cursor: string | null;
  featureCount: number;
};

const ManageServices = ({
  initialServices,
  cursor,
  featureCount,
}: ManageServicesProps) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );

  const [isCreating, setIsCreating] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // ----------------------------
  // Queries
  // ----------------------------
  const isSearching = debouncedSearch.length > 0;
  const initialData = {
    services: initialServices,
    nextCursor: cursor,
    featureCount,
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useServices({
    initialData: isSearching || showFeaturedOnly ? undefined : initialData,
    search: debouncedSearch,
    featuredOnly: showFeaturedOnly,
  });
  const services = data?.pages.flatMap((page) => page.services) ?? [];

  const featuredCount = data?.pages[0]?.featureCount ?? 0;

  // ----------------------------
  // Mutations
  // ----------------------------
  const addMutation = useAddServiceMutation();
  const updateMutation = useUpdateServiceMutation();
  const deleteMutation = useDeleteServiceMutation();
  const priorityMutation = useUpdateServicePriorityMutation();
  // ----------------------------
  // Load more
  // ----------------------------
  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const closeDrawer = () => {
    setSelectedService(null);
    setIsCreating(false);
  };

  // ----------------------------
  // ESC + scroll lock
  // ----------------------------
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow =
      selectedService || isCreating ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedService, isCreating]);

  // ----------------------------
  // Drawer handlers
  // ----------------------------
  const openEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setIsCreating(false);
  };

  const openCreate = () => {
    setSelectedService(null);
    setIsCreating(true);
  };

  // ----------------------------
  // SAVE (ADD / UPDATE)
  // ----------------------------
  const saveService = async (data: ServiceItem) => {
    const { _id, ...rest } = data;

    if (isCreating) {
      await addMutation.mutateAsync(rest, {
        onSuccess: () => {
          closeDrawer();
        },
      });
    } else {
      await updateMutation.mutateAsync(
        {
          id: _id,
          data: rest,
        },
        {
          onSuccess: () => {
            closeDrawer();
          },
        },
      );
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const deleteService = (id: string) => {
    deleteMutation.mutate(id);
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
      <div className="flex flex-wrap items-center  gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Services
          </h2>
          <p className="text-sm text-gray-500">Manage your services</p>
        </div>

        <button
          onClick={openCreate}
          disabled={addMutation.isPending}
          className="w-full sm:w-auto ml-auto px-4 py-2 bg-primary text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {addMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "+ Add Service"
          )}
        </button>
      </div>

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
          {showFeaturedOnly ? "All Services" : "Featured"}
        </button>
      </div>
      {/*Cards*/}
      <div className="p-3 sm:p-4 bg-white overflow-hidden rounded-2xl border border-border hover:shadow-lg transition-shadow">
        {services && services.length > 0 ? (
          services.map((service, index) => {
            const isDeleting =
              deleteMutation.isPending &&
              deleteMutation.variables === service._id;
            return (
              <details
                key={service._id}
                className="group border-b rounded-2xl border-border"
              >
                {/* Summary */}
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer list-none">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <span className="text-muted font-medium text-sm">
                      {index + 1}.
                    </span>
                    <h3 className="font-semibold text-primary-dark text-sm sm:text-base">
                      {service.title}
                    </h3>
                  </div>

                  {/* RIGHT */}
                  <div className="flex ml-auto items-center gap-2 sm:gap-3">
                    {service.featured && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                        Featured
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEdit(service);
                      }}
                      className="px-3 py-1 text-xs sm:text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteService(service._id);
                      }}
                      disabled={isDeleting}
                      className="px-3 py-1 text-xs sm:text-sm border border-red-300 text-red-500 rounded 
             hover:bg-red-500 hover:text-white transition disabled:opacity-50 
             flex items-center justify-center min-w-[80px]"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>

                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" />
                  </div>
                </summary>

                {/* Expanded */}
                <div className="px-4 sm:px-6 py-3 border-t">
                  <p className="text-sm text-muted mb-3">
                    {service.description}
                  </p>
                  {service.featured && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
                      {/* Priority Display */}
                      <div className="text-sm">
                        <span className="text-gray-500 mr-2">Priority:</span>
                        <span className="font-semibold">
                          {service.priority ?? 0}
                        </span>
                      </div>

                      {/* Controls */}
                      <input
                        type="number"
                        defaultValue={service.priority ?? 0}
                        min={0}
                        onBlur={(e) =>
                          changePriority(service._id, Number(e.target.value))
                        }
                        className="w-20 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}
                  <div className="mb-2">
                    <p className="text-sm text-muted mb-1">Features</p>
                    <ul className="list-disc list-inside text-sm">
                      {service.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
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
              </details>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">
            No services found
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

      {(selectedService || isCreating) && (
        <ServiceDrawer
          service={selectedService}
          onClose={closeDrawer}
          onSave={saveService}
          featuredCount={featuredCount}
        />
      )}
    </>
  );
};

export default ManageServices;
