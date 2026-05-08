import React from "react";
import Image from "next/image";
import { BlogItem } from "@/lib/types";

const BlogPage = ({ blog }: { blog: BlogItem }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      {/* HERO IMAGE */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
        <Image
          src={blog.coverImage?.url || "/default-cover.jpg"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* TITLE */}
      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-primary-dark leading-tight">
        {blog.title}
      </h1>

      {/* DATE */}
      {blog.createdAt && (
        <p className="mt-2 text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      )}

      {/* EXCERPT */}
      <p className="mt-6 text-lg text-gray-600 leading-relaxed border-l-4 border-primary pl-4">
        {blog.excerpt}
      </p>

      {/* CONTENT */}
      <div
        className="mt-10 prose prose-lg max-w-none text-muted leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogPage;
