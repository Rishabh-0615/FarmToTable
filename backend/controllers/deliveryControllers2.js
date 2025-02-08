import { DeliveryAssignment } from '../models/deliveryModel.js';
import { OrderDetails } from '../models/orderDetailsModel.js';
import mongoose from 'mongoose';
export const deliveryBoyController2 = {
  // Get assigned orders for specific delivery boy
  async getAssignedOrders(req, res) {
    try {
      const { _id: deliveryBoyId } = req.user;
      const assignedOrders = await DeliveryAssignment.find({ 
        deliveryBoyId,
        status: { $in: ['ASSIGNED', 'IN_PROGRESS'] }
      }).populate('orderId');
      
      res.json(assignedOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching assigned orders' });
    }
  },

  // Update order delivery status
  async updateOrderStatus(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { orderId, status } = req.body;
      const { _id: deliveryBoyId } = req.user;

      // Verify order is assigned to this delivery boy
      const assignment = await DeliveryAssignment.findOne({ 
        orderId, 
        deliveryBoyId 
      });

      if (!assignment) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Update order status
      await OrderDetails.findByIdAndUpdate(orderId, { 
        deliveryStatus: status 
      }, { session });

      // Update delivery assignment status
      await DeliveryAssignment.findByIdAndUpdate(assignment._id, {
        status: status === 'DELIVERED' ? 'COMPLETED' : 'IN_PROGRESS'
      }, { session });

      await session.commitTransaction();
      res.json({ message: 'Order status updated successfully' });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: 'Error updating order status' });
    } finally {
      session.endSession();
    }
  }
};