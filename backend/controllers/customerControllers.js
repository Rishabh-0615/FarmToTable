import TryCatch from "../utils/TryCatch.js";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";
import { calculateDistance } from "../utils/distance.js";
import { Order } from "../models/orderModel.js";

const STATIC_HUB_LOCATION = { lat: 18.7128, lon: 73.0060 };

export const addCart = TryCatch(async (req, res) => {
  const { productId, quantity, remove } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  let cart = await Cart.findOne({ consumer: req.user._id });

  if (!cart) {
    cart = new Cart({ consumer: req.user._id, items: [] });
  }

  // Handle remove functionality
  if (remove) {
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex >= 0) {
      cart.items.splice(productIndex, 1);
      await cart.save();

      return res.status(200).json({
        message: "Product removed from cart",
        cart,
      });
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }
  }

  // Handle add functionality
  if (product.quantity < quantity) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  const existingProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

  if (existingProductIndex >= 0) {
    cart.items[existingProductIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();

  res.status(200).json({
    message: "Product added to cart",
    cart,
  });
});

export const getCart = TryCatch(async (req, res) => {
  const cart = await Cart.findOne({ consumer: req.user._id }).populate("items.productId");
  if (!cart) {
    return res.status(404).json({ message: "Cart is empty" });
  }

  res.status(200).json(cart);
});

export const placeOrder = TryCatch(async (req, res) => {
  const { consumerLocation } = req.body;

  if (!consumerLocation || !consumerLocation.lat || !consumerLocation.lon) {
    return res.status(400).json({ error: "Consumer location is required" });
  }

  const cart = await Cart.findOne({ consumer: req.user._id }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  let totalPrice = 0;

  for (const item of cart.items) {
    const product = item.productId;

    if (product.quantity < item.quantity) {
      return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
    }

    product.quantity -= item.quantity;
    await product.save();

    totalPrice += product.price * item.quantity;
  }

  // Calculate delivery fee based on consumer location
  const distance = calculateDistance(
    STATIC_HUB_LOCATION.lat,
    STATIC_HUB_LOCATION.lon,
    consumerLocation.lat,
    consumerLocation.lon
  );
  const deliveryFee = distance * 0.5;

  const finalPrice = totalPrice + deliveryFee;

  // Create the order
  const order = new Order({
    consumer: req.user._id,
    products: cart.items,
    totalPrice: totalPrice,
    deliveryFee: deliveryFee,
    finalPrice: finalPrice,
    consumerLocation,
  });

  await order.save();

  // Clear the cart after the order is placed
  await Cart.deleteOne({ consumer: req.user._id });

  res.status(200).json({ message: "Order placed successfully", order });
});
