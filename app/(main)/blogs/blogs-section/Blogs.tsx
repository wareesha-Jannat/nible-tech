import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "@/lib/types";

const Blogs = ({ blogsData }: { blogsData: BlogItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {blogsData.map((blog) => {
        return (
          <div
            key={blog._id}
            className="group flex flex-col rounded-xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={blog.coverImage?.url || "/default-cover.jpg"}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              {/* Title */}
              <h3 className="text-lg font-semibold text-primary-dark leading-tight line-clamp-2">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-3">
                {/* Read More */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Read More →
                </Link>

                {/* Date */}
                {blog.createdAt && (
                  <span className="text-[10px] text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
