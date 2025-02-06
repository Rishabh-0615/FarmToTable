import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discountOffer: {
      type: Boolean,
      default: false,
    },
    minQuantityForDiscount: {
      type: Number,
      min: 1,
      required: function() {
        return this.discountOffer === true;
      }
    },
    discountPercentage: {
      type: Number,
      min: 1,
      max: 100,
      required: function() {
        return this.discountOffer === true;
      }
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      id: String,
      url: String,
    },
    notes: {
      type: String,
      default: '',
    },
    life:{
      type:String,
      default:'',
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);