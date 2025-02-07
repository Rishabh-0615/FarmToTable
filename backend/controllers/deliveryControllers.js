import { User } from "../models/userModel.js";
import { OrderDetails } from "../models/orderDetailsModel.js";
import { DeliveryAssignment } from "../models/deliveryModel.js";




export const deliveryController = {
  // Get all delivery boys
  getAllDeliveryBoys: async (req, res) => {
    try {
      const deliveryBoys = await User.find({ 
        role: 'delivery boy'
      }).select('-password');
      res.json(deliveryBoys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get available delivery boys
  getAvailableDeliveryBoys: async (req, res) => {
    try {
      const activeDeliveries = await DeliveryAssignment.find({
        status: { $in: ['ASSIGNED', 'PICKED_UP'] }
      }).distinct('deliveryBoyId');

      const availableDeliveryBoys = await User.find({
        role: 'delivery boy',
        _id: { $nin: activeDeliveries }
      }).select('-password');

      res.json(availableDeliveryBoys);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get pending deliveries
  getPendingDeliveries: async (req, res) => {
    try {
      const pendingOrders = await OrderDetails.find({
        deliveryStatus: { $in: ['PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY'] }
      }).populate('userId', 'name mobile');

      res.json(pendingOrders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Assign delivery to delivery boy
  assignDelivery: async (req, res) => {
    try {
      const { orderId } = req.body;
        const deliveryBoyId=req.user._id;
      // Check if order exists and is pending
      const order = await OrderDetails.findById(orderId);
      if (!order || order.deliveryStatus === 'DELIVERED') {
        return res.status(400).json({ message: "Invalid order or already delivered" });
      }

      // Check if delivery boy exists
      const deliveryBoy = await User.findOne({
        _id: deliveryBoyId,
        role: 'delivery boy'
      });
      if (!deliveryBoy) {
        return res.status(400).json({ message: "Invalid delivery boy" });
      }

      // Create delivery assignment
      const assignment = new DeliveryAssignment({
        deliveryBoyId,
        orderId
      });
      await assignment.save();

      // Update order status
      order.deliveryStatus = 'OUT_FOR_DELIVERY';
      await order.save();

      res.json({ message: "Delivery assigned successfully", assignment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update delivery status
  updateDeliveryStatus: async (req, res) => {
    try {
      const { assignmentId, status, coordinates } = req.body;

      const assignment = await DeliveryAssignment.findById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ message: "Delivery assignment not found" });
      }

      assignment.status = status;
      if (coordinates) {
        assignment.currentLocation = {
          coordinates,
          lastUpdated: new Date()
        };
      }

      if (status === 'DELIVERED') {
        assignment.completedAt = new Date();
        // Update order status
        await OrderDetails.findByIdAndUpdate(assignment.orderId, {
          deliveryStatus: 'DELIVERED'
        });
      }

      await assignment.save();
      res.json({ message: "Delivery status updated", assignment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get delivery boy's assignments
  getDeliveryBoyAssignments: async (req, res) => {
    try {
      const { deliveryBoyId } = req.params;
      const assignments = await DeliveryAssignment.find({ deliveryBoyId })
        .populate('orderId')
        .sort('-assignedAt');
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};



