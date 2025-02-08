import mongoose from 'mongoose';

// Delivery Assignment Model
export const DeliveryAssignment = mongoose.model('DeliveryAssignment', new mongoose.Schema({
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
  assignedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'ASSIGNED'
  },
  city: {
    type: String,
    
  }
}, { timestamps: true }));