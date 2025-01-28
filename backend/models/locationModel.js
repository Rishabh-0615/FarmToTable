import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Location = mongoose.model("Location", locationSchema);
