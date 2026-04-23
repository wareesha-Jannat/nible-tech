import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN"],
      default: "SUPER_ADMIN",
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);