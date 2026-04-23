import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },

    features: [{ type: String }],

    technologies: [{ type: String }],
    priority: { type: Number , default: 999 },
  },
  { timestamps: true },
);

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
