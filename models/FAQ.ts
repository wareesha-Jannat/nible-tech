import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, unique: true, required: true },
    answer: { type: String, required: true },
    featured: { type: Boolean, default: false },
    priority: { type: Number, default: 999 },
  },
  { timestamps: true },
);

export const Faq = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
