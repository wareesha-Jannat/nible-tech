import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models/Blog";
import { BlogItem } from "@/lib/types";
import BlogPage from "./BlogPage";

// -----------------------------
// CACHED FETCH
// -----------------------------

type Props = {
  params: Promise<{ slug: string }>;
};

const getBlog = cache(async (slug: string): Promise<BlogItem | null> => {
  await connectDB();

  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) return null;

  return JSON.parse(JSON.stringify(blog)) as BlogItem;
});

// -----------------------------
// METADATA (SEO)
// -----------------------------
export async function generateMetadata({
  params,
}: Props ): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog does not exist.",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.coverImage?.url ? [blog.coverImage.url] : [],
    },
  };
}

// -----------------------------
// PAGE
// -----------------------------
const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return notFound();

  return <BlogPage blog={blog} />;
};

export default Page;
