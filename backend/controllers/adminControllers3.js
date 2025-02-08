import { User } from '../models/userModel.js';
import { OrderDetails } from '../models/orderDetailsModel.js';
import { DeliveryAssignment } from '../models/deliveryModel.js';
import mongoose from 'mongoose';

export const adminController3 = {
  async getUnassignedOrders(req, res) {
    try {
      const unassignedOrders = await OrderDetails.aggregate([
        {
          $lookup: {
            from: 'deliveryassignments',
            localField: '_id',
            foreignField: 'orderId',
            as: 'assignment'
          }
        },
        { 
          $match: {
            deliveryStatus: 'PROCESSING',
            assignment: { $size: 0 }
          }
        }
      ]);

      res.json(unassignedOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching unassigned orders' });
    }
  },

  async getAvailableDeliveryBoys(req, res) {
    try {
      const availableDeliveryBoys = await User.find({
        role: 'delivery boy',
        
      }).select('name location.city _id');

      res.json(availableDeliveryBoys);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching delivery boys' });
    }
  },

  async assignOrderToDeliveryBoy(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { orderId, deliveryBoyId } = req.body;

      // Verify delivery boy exists
      const deliveryBoy = await User.findOne({
        _id: deliveryBoyId,
        role: 'delivery boy'
      });

      if (!deliveryBoy) {
        throw new Error('Invalid delivery boy assignment');
      }

      const deliveryAssignment = new DeliveryAssignment({
        orderId,
        deliveryBoyId,
        status: 'ASSIGNED'
      });

      await OrderDetails.findByIdAndUpdate(orderId, {
        deliveryStatus: 'SHIPPED'
      }, { session });

      await deliveryAssignment.save({ session });

      await session.commitTransaction();
      res.json({ message: 'Order assigned successfully' });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message || 'Error assigning order' });
    } finally {
      session.endSession();
    }
  }
};
