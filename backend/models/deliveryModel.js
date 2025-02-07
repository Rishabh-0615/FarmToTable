import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
  deliveryBoyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderDetails',
    required: true
  },
  status: {
    type: String,
    enum: ['ASSIGNED', 'PICKED_UP', 'DELIVERED', 'CANCELLED'],
    default: 'ASSIGNED'
  },
  currentLocation: {
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: null
    },
    lastUpdated: {
      type: Date,
      default: null
    }
  },
  deliveryNotes: String,
  assignedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

export const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);