import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    consumer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
