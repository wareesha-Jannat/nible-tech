import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = models.Blog || model("Blog", BlogSchema);
