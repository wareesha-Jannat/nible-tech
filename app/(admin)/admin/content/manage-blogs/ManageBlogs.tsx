"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { BlogItem } from "@/lib/types";
import { BlogFormType } from "@/lib/validations/blog";

import { addBlog, updateBlog, deleteBlog } from "./action";

import BlogDrawer from "./BlogDrawer";

export type BlogDrawerResponse = {
  data: BlogFormType;
  imageFile: File | null;
  removeImage: boolean;
  _id?: string;
};

type ManageBlogsProps = {
  initialBlogs: BlogItem[];
};

const ManageBlogs = ({ initialBlogs }: ManageBlogsProps) => {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [selected, setSelected] = useState<BlogItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const openCreate = () => {
    setSelected(null);
    setIsCreating(true);
  };

  const openEdit = (b: BlogItem) => {
    setSelected(b);
    setIsCreating(false);
  };

  const closeDrawer = () => {
    setSelected(null);
    setIsCreating(false);
  };

  // ----------------------------
  // SAVE
  // ----------------------------
  const saveBlog = async (payload: BlogDrawerResponse) => {
    try {
      if (isCreating) {
        const res = await addBlog({
          restData: payload.data,
          imageFile: payload.imageFile,
        });

        if (!res.success) throw new Error(res.message);

        setBlogs((prev) => [res.blog, ...prev]);

        toast.success("Blog created successfully");
      } else {
        if (!payload._id) {
          toast.error("No blog selected");
          return;
        }

        const res = await updateBlog({
          id: payload._id,
          restData: payload.data,
          imageFile: payload.imageFile,
          removeImage: payload.removeImage,
        });

        if (!res.success) throw new Error(res.message);

        setBlogs((prev) =>
          prev.map((b) => (b._id === payload._id ? res.blog : b)),
        );

        toast.success("Blog updated successfully");
      }

      closeDrawer();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const handleDelete = async (id: string) => {
    if (loadingId) return;

    try {
      setLoadingId(id);

      const res = await deleteBlog(id);

      if (!res.success) throw new Error(res.message);

      setBlogs((prev) => prev.filter((b) => b._id !== id));

      toast.success("Blog deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error deleting");
    } finally {
      setLoadingId(null);
    }
  };

  // truncate helper (for safety)
  const truncate = (text: string, length = 180) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Blogs
          </h2>
          <p className="text-gray-500 text-sm">Manage website blog articles</p>
        </div>

        <button
          onClick={openCreate}
          className="px-4 w-full sm:w-auto ml-auto py-2 bg-primary text-white rounded-md"
        >
          + Add Blog
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3 ">
        {blogs.length > 0 ? (
          blogs.map((b, index) => {
            const isDeleting = loadingId === b._id;

            return (
              <details
                key={b._id}
                className="group bg-white rounded-xl border-border shadow-sm hover:shadow-md transition"
              >
                {/* SUMMARY */}
                <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-2">
                    {/* INDEX */}
                    <span className="text-xs text-gray-400 w-6">
                      {index + 1}.
                    </span>

                    <h3 className="font-semibold text-sm md:text-base">
                      {b.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    {/* CHEVRON */}

                    {/* ACTION BUTTONS */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openEdit(b);
                      }}
                      className="px-3 py-1 text-xs border border-primary text-primary rounded-md hover:bg-primary hover:text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(b._id);
                      }}
                      disabled={isDeleting}
                      className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-md hover:bg-red-500 hover:text-white flex items-center justify-center min-w-[80px]"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                    <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
                  </div>
                </summary>

                {/* DETAILS */}
                <div className="px-5 pb-5 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* IMAGE */}
                    <div className="relative w-full h-[200px] md:h-[150px] rounded-lg overflow-hidden border">
                      <Image
                        src={b.coverImage?.url || "/default-cover.jpg"}
                        alt={b.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="md:col-span-2 space-y-3">
                      {/* EXCERPT */}
                      <p className="text-sm text-gray-600">{b.excerpt}</p>

                      {/* CONTENT PREVIEW */}
                      <div className="max-h-[150px] overflow-auto text-sm text-gray-500 border p-3 rounded-md bg-gray-50">
                        {truncate(b.content.replace(/<[^>]+>/g, ""))}
                      </div>

                      {/* META */}
                      {b.createdAt && (
                        <div className="text-xs text-gray-400">
                          Created: {new Date(b.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-10">No blogs found</div>
        )}
      </div>

      {/* DRAWER */}
      {(selected || isCreating) && (
        <BlogDrawer blog={selected} onClose={closeDrawer} onSave={saveBlog} />
      )}
    </>
  );
};

export default ManageBlogs;
