import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["seo", "web", "marketing"],
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160, // good for cards + SEO snippet
    },

    overview: {
      type: String,
      required: true,
      trim: true,
      minlength: 50,
      maxlength: 460, // 👈 controlled “page intro”
    },

    features: [
      {
        title: {
          type: String,
          required: true,
          maxlength: 80,
        },
        description: {
          type: String,
          required: true,
          maxlength: 200,
        },
      },
    ],
    technologies: {
      type: [String],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    metaTitle: {
      type: String,
      maxlength: 60,
    },

    metaDescription: {
      type: String,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
  },
);

// index for fast category filtering
serviceSchema.index({ category: 1, order: 1 });

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
