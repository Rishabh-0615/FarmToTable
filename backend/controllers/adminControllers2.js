import { User } from "../models/userModel.js";
import { OrderDetails } from "../models/orderDetailsModel.js";
import { Product } from "../models/productModel.js";
import { DeliveryAssignment } from "../models/deliveryModel.js";

export const adminController = {
  // Get all cities from products
  getAllCities: async (req, res) => {
    try {
      const cities = await Product.distinct("city");
      res.status(200).json({ cities });
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  },

  // Get orders by city
  getOrdersByCity: async (req, res) => {
    try {
      const { city } = req.query;

      if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
      }

      const orders = await OrderDetails.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "cartItems.productId",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        {
          $match: {
            "productDetails.city": city
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $unwind: "$userDetails"
        },
        {
          $sort: { createdAt: -1 }
        }
      ]);

      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  // Assign delivery to delivery boy
  assignDelivery: async (req, res) => {
    try {
      const { orderId, deliveryBoyId } = req.body;

      if (!orderId || !deliveryBoyId) {
        return res.status(400).json({ error: "Order ID and Delivery Boy ID are required" });
      }

      const order = await OrderDetails.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const deliveryBoy = await User.findOne({
        _id: deliveryBoyId,
        role: "delivery boy"
      });
      if (!deliveryBoy) {
        return res.status(404).json({ error: "Delivery boy not found" });
      }

      const existingAssignment = await DeliveryAssignment.findOne({ orderId });
      if (existingAssignment) {
        return res.status(400).json({ error: "Order already assigned to a delivery boy" });
      }

      const assignment = new DeliveryAssignment({
        deliveryBoyId,
        orderId: order._id
      });
      await assignment.save();

      order.deliveryStatus = "OUT_FOR_DELIVERY";
      await order.save();

      res.status(200).json({
        message: "Delivery assigned successfully",
        assignment
      });
    } catch (error) {
      console.error("Error assigning delivery:", error);
      res.status(500).json({ error: "Failed to assign delivery" });
    }
  },

  // Get all delivery boys
  getAllDeliveryBoys: async (req, res) => {
    try {
      const deliveryBoys = await User.find({
        role: "delivery boy",
        
      }).select("name email mobile");

      res.status(200).json({ deliveryBoys });
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
      res.status(500).json({ error: "Failed to fetch delivery boys" });
    }
  }
};
