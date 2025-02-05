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
    location: { 
      type: String,
      default: "",
    },
    isVerifiedByAdmin: {
      type: Boolean,
      default: false,
      required: function() {
        return this.role === 'farmer'; //isVerifiedByAdmin only for farmer
      },
    }
  },
  {
    timestamps: true,
  }
);

schema.pre('save', function(next) {
  if (this.role !== 'farmer') {
    this.isVerifiedByAdmin = undefined; // ensure isVerifiedByAdmin is not for others
  }
  next();
});


export const User = mongoose.model("User", schema);
