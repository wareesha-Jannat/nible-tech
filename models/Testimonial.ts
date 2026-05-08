import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, trim: true, default: "" },
    message: { type: String, required: true },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  { timestamps: true },
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
