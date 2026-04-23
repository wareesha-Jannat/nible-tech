import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    featured: { type: Boolean, default: false },
    priority: { type: Number, default: 999  },
  },
  { timestamps: true },
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
