import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    projectType: { type: String, required: true },
    budget: String,
    timeline: String,
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Query =
  mongoose.models.Query || mongoose.model("Query", querySchema);
