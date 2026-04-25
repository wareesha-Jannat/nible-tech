"use client";

import React, { useState } from "react";
import GlassCard from "@/app/components/GlassCard";
import { formatDateTime, getStatusStyle } from "@/lib/utils";
import { ChevronDown, Loader2, Pencil, Trash, X } from "lucide-react";
import { QueryItem } from "@/lib/types";
import QueryForm from "@/app/components/QueryForm";
import { ContactFormType } from "@/lib/validations/contact";
import { useEffect } from "react";
import { useQueries } from "@/hooks/useQueries";
import {
  useDeleteQueryMutation,
  useUpdateQueryMutation,
  useUpdateQueryStatusMutation,
} from "./mutations";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";
import QueryListSkeleton from "./QueryListSkeleton";

const statusOptions = ["new", "in-progress", "completed"];

const QueriesList = ({ activeTab }: { activeTab: string }) => {
  const [selectedQuery, setSelectedQuery] = useState<QueryItem | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const updateStatusMutation = useUpdateQueryStatusMutation();
  const updateQueryMutation = useUpdateQueryMutation();
  const deleteQueryMutation = useDeleteQueryMutation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useQueries({
      status: activeTab,
      search: debouncedSearch,
    });

  const queries = data?.pages.flatMap((p) => p.queries) ?? [];

  const closeDrawer = () => setSelectedQuery(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openDrawer = (query: QueryItem) => setSelectedQuery(query);

  const saveQuery = async (data: ContactFormType): Promise<boolean> => {
    if (!selectedQuery) return false;

    try {
      await updateQueryMutation.mutateAsync({
        id: selectedQuery._id,
        data,
      });

      toast.success("Query updated successfully");

      return true;
    } catch (err) {
      console.log(err)
      toast.error("Failed to update query");
      return false;
    } finally {
      closeDrawer();
    }
  };

  const loadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({
      id,
      status: status as "new" | "in-progress" | "completed",
    });
  };

  const handleDelete = (id: string) => {
    deleteQueryMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Query deleted Successfully");
      },
    });
  };

  return (
    <section className="w-full px-4 md:px-10 py-10">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, email, message..."
        className="w-full mb-5 md:w-[400px] px-4 py-2 border rounded-md outline-none focus:border-primary"
      />
      <GlassCard className="px-4 overflow-hidden">
        {isLoading ? (
          <QueryListSkeleton />
        ) : queries.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No queries found</div>
        ) : (
          queries.map((query, index) => {
            const isDeleting =
              deleteQueryMutation.isPending &&
              deleteQueryMutation.variables === query._id;
            return (
              <details
                key={query._id}
                className="group border-b border-gray-200"
              >
                {/* Header */}
                <summary className="flex flex-wrap gap-4 px-2 sm:px-6 py-2 cursor-pointer">
                  {/* Left */}
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-500">
                      {index + 1}.
                    </span>
                    <h3 className="font-semibold text-primary-dark">
                      {query.name}
                    </h3>
                  </div>

                  {/* Right */}
                  <div className="flex items-center ml-auto gap-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(
                        query.status,
                      )}`}
                    >
                      {query.status}
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openDrawer(query);
                      }}
                      className="p-1.5 rounded-md border border-primary text-primary 
                 hover:bg-primary hover:text-white transition flex items-center justify-center"
                    >
                      <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(query._id);
                      }}
                      disabled={isDeleting}
                      className="p-1.5 rounded-md border border-red-300 text-red-500 
                 hover:bg-red-500 hover:text-white transition 
                 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <ChevronDown className="text-gray-400 transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>

                {/* Expanded Content */}
                <div className="px-6 pb-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {/* Contact Info */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium">{query.name}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{query.email}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="font-medium">{query.phone || "-"}</p>
                    </div>

                    {/* Project Info */}
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Project Type</p>
                      <p className="font-medium">{query.projectType}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Budget</p>
                      <p className="font-medium">{query.budget}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Timeline</p>
                      <p className="font-medium">{query.timeline || "-"}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Created At</p>
                      <p className="font-medium">
                        {formatDateTime(query.createdAt)}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                      <p className="font-medium">
                        {formatDateTime(query.updatedAt)}
                      </p>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500 mb-1">Message</p>
                      <p className="font-medium">{query.message}</p>
                    </div>

                    {/* Status Update */}
                    <div className="md:col-span-2 mt-2">
                      <label className="font-semibold mr-2">
                        Update Status:
                      </label>
                      <select
                        value={query.status}
                        onChange={(e) =>
                          handleStatusChange(query._id, e.target.value)
                        }
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </details>
            );
          })
        )}
      </GlassCard>
      {/* Load More */}
      {hasNextPage && (
        <button
          onClick={loadMore}
          disabled={isFetchingNextPage}
          className="mt-6 px-4 py-2 border rounded-md flex items-center gap-2"
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

      {/* Drawer */}
      {selectedQuery && (
        <>
          {/* 🔥 Overlay */}
          <div
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-xl z-50">
            <div className="flex flex-col h-full m-4 border border-primary-dark rounded-sm">
              {/* Header (fixed) */}
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Query</h2>

                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-full hover:bg-gray-200 hover:scale-105 transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* 🔥 Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <QueryForm
                  defaultValues={{
                    name: selectedQuery.name,
                    email: selectedQuery.email,
                    phone: selectedQuery.phone,
                    projectType: selectedQuery.projectType,
                    budget: selectedQuery.budget,
                    timeline: selectedQuery.timeline,
                    message: selectedQuery.message,
                  }}
                  onSubmit={saveQuery}
                  submitText="Save"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default QueriesList;
