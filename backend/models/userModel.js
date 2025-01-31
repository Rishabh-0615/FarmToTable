import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['farmer', 'customer', 'delivery boy'],
      required: true,
    },
    location: { // This will now be a string (manual address)
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
