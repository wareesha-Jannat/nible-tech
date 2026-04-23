import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  label: { type: String, unique: true, required: true },
  value: { type: Number, required: true },
  suffix: String,
});

export const Stat = mongoose.models.Stat || mongoose.model("Stat", statSchema);
