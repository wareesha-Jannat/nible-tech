"use server";

import { Blog } from "@/models/Blog";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { serializeData } from "@/lib/utils";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/lib/cloudinary";

import { generateSlug } from "@/lib/utils";

import {
  blogSchema,
  BlogFormType,
} from "@/lib/validations/blog";

import { BlogItem } from "@/lib/types";

/* -----------------------------
   TYPES
------------------------------*/

type AddBlogData = {
  imageFile: File | null;
  restData: BlogFormType;
};

type AddBlogResponse =
  | {
      success: true;
      message: string;
      blog: BlogItem;
    }
  | {
      success: false;
      message: string;
    };

/* -----------------------------
   ADD BLOG
------------------------------*/

export async function addBlog({
  imageFile,
  restData,
}: AddBlogData): Promise<AddBlogResponse> {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsed = blogSchema.safeParse(restData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid blog data",
      };
    }

    await connectDB();

    const { title, excerpt, content } = parsed.data;

    const slug = generateSlug(title);

    // prevent duplicate slug
    const existing = await Blog.findOne({ slug });

    if (existing) {
      return {
        success: false,
        message: "Blog with same title already exists",
      };
    }

    // create blog first
    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
    });

    // upload cover image if exists
    if (imageFile) {
      const imageData = await uploadToCloudinary(
        imageFile,
        "blogs",
        blog._id.toString()
      );

      blog.coverImage = imageData;
      await blog.save();
    }

    await revalidatePath("/admin/content");

    return {
      success: true,
      message: "Blog created successfully",
      blog: serializeData(blog.toObject()) as BlogItem,
    };
  } catch (error) {
    console.error("addBlog error:", error);

    return {
      success: false,
      message: "Failed to create blog",
    };
  }
}

/* -----------------------------
   UPDATE BLOG
------------------------------*/

type UpdateBlogData = {
  id: string;
  imageFile: File | null;
  removeImage: boolean;
  restData: BlogFormType;
};

type UpdateBlogResponse =
  | {
      success: true;
      message: string;
      blog: BlogItem;
    }
  | {
      success: false;
      message: string;
    };

export async function updateBlog({
  id,
  imageFile,
  removeImage,
  restData,
}: UpdateBlogData): Promise<UpdateBlogResponse> {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsed = blogSchema.safeParse(restData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid blog data",
      };
    }

    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    const { title, excerpt, content } = parsed.data;

    // update slug if title changed
    blog.title = title;
    blog.slug = generateSlug(title);
    blog.excerpt = excerpt;
    blog.content = content;

    // image handling
    if (imageFile) {
      const imageData = await uploadToCloudinary(
        imageFile,
        "blogs",
        id
      );

      blog.coverImage = imageData;
    } else if (removeImage && blog.coverImage?.public_id) {
      await deleteFromCloudinary(blog.coverImage.public_id);
      blog.coverImage = null;
    }

    await blog.save();

    await revalidatePath("/admin/content");

    return {
      success: true,
      message: "Blog updated successfully",
      blog: serializeData(blog.toObject()) as BlogItem,
    };
  } catch (error) {
    console.error("updateBlog error:", error);

    return {
      success: false,
      message: "Failed to update blog",
    };
  }
}

/* -----------------------------
   DELETE BLOG
------------------------------*/

type DeleteBlogResponse =
  | {
      success: true;
      message: string;
      deletedId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function deleteBlog(
  id: string
): Promise<DeleteBlogResponse> {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    if (blog.coverImage?.public_id) {
      await deleteFromCloudinary(blog.coverImage.public_id);
    }

    await Blog.findByIdAndDelete(id);

    await revalidatePath("/admin/content");

    return {
      success: true,
      message: "Blog deleted successfully",
      deletedId: id,
    };
  } catch (error) {
    console.error("deleteBlog error:", error);

    return {
      success: false,
      message: "Failed to delete blog",
    };
  }
}