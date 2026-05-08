import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },

    description: { type: String, required: true },

    image: {
      url: { type: String },
      public_id: { type: String },
    },

    technologies: [{ type: String }],
    features : [{ type: String }],

    demoUrl: { type: String , trim: true, default: ""},

    priority: { type: Number, default: 999 },
  },
  { timestamps: true },
);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
