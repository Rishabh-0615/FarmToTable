import TryCatch from "../utils/TryCatch.js";
import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";
import { calculateDistance } from "../utils/distance.js";
import { Order } from "../models/orderModel.js";
import axios from "axios";

const STATIC_HUB_LOCATION = { lat: 18.7128, lon: 73.0060 };
const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;

/**
 * Add or remove items from the cart
 */
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

/**
 * Retrieve the cart
 */
export const getCart = TryCatch(async (req, res) => {
  let cart = await Cart.findOne({ consumer: req.user._id }).populate("items.productId");
  if (!cart) {
    // Return an empty cart structure
    cart = { items: [] };
  }

  res.status(200).json(cart);
});


/**
 * Geocode address to get latitude and longitude
 */
const geocodeAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address,
        key: GEOCODING_API_KEY,
      },
    }
  );

  if (response.data.status === "OK" && response.data.results.length > 0) {
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lon: location.lng };
  } else {
    throw new Error("Failed to geocode the provided address");
  }
};

/**
 * Place an order
 */
export const placeOrder = TryCatch(async (req, res) => {
  const { consumerLocation, consumerAddress } = req.body;

  let finalLocation = consumerLocation;

  // If address is provided but location is not, geocode the address
  if (!finalLocation && consumerAddress) {
    try {
      finalLocation = await geocodeAddress(consumerAddress);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (!finalLocation || !finalLocation.lat || !finalLocation.lon) {
    return res.status(400).json({
      error: "Please provide either a valid location or address",
    });
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

  // Calculate delivery fee based on the location
  const distance = calculateDistance(
    STATIC_HUB_LOCATION.lat,
    STATIC_HUB_LOCATION.lon,
    finalLocation.lat,
    finalLocation.lon
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
    consumerLocation: finalLocation,
  });

  await order.save();

  // Clear the cart after placing the order
  await Cart.deleteOne({ consumer: req.user._id });

  res.status(200).json({ message: "Order placed successfully", order });
});

/**
 * Retrieve all orders for the logged-in user
 */
export const getOrders = TryCatch(async (req, res) => {
  const orders = await Order.find({ consumer: req.user._id }).populate("products.productId");

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json(orders);
});


export const geocode = async (req, res) => {
  try {
    const { address } = req.body;

    // Validate input
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Log request body for debugging
    console.log('Received address:', address);

    // Call Google Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: encodeURIComponent(address),
          key: process.env.GEOCODING_API_KEY, // Use environment variable
        },
      }
    );

    // Check Google API response status
    if (response.data.status === 'OK') {
      return res.json(response.data);
    } else {
      console.error('Google API error:', response.data);
      return res.status(400).json({ error: response.data.error_message || 'Failed to geocode address' });
    }
  } catch (error) {
    // Log error and respond with 500
    console.error('Geocode error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    // Validate latitude and longitude
    if (typeof lat !== 'number' || typeof lon !== 'number' || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    // Log incoming request for debugging
    console.log('Received coordinates:', { lat, lon });

    // Call Google Reverse Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lon}`,
          key: process.env.GEOCODING_API_KEY, // Use environment variable
        },
      }
    );

    // Handle API response
    if (response.data.status === 'OK') {
      console.log(response.data.results[0].formatted_address);
      return res.json(response.data.results[0].formatted_address);
    } else {
      console.error('Google API error:', response.data);
      return res.status(400).json({ error: response.data.error_message || 'No results found' });
    }
  } catch (error) {
    // Log error and respond with 500
    console.error('Reverse Geocode error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const optimizeRoute = async (req, res) => {
  try {
    const { origin, destinations } = req.body;

    // Validate request body
    if (
      !origin ||
      !Array.isArray(destinations) ||
      destinations.length === 0 ||
      typeof origin.lat !== 'number' ||
      typeof origin.lon !== 'number'
    ) {
      return res.status(400).json({ error: 'Invalid origin or destinations' });
    }

    destinations.forEach((dest) => {
      if (typeof dest.lat !== 'number' || typeof dest.lon !== 'number') {
        throw new Error('Invalid destination coordinates');
      }
    });

    // Build waypoints
    const waypoints = destinations
      .slice(0, -1) // Exclude the last destination as it's the final stop
      .map((dest) => `${dest.lat},${dest.lon}`)
      .join('|');

    // Make API request
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin: `${origin.lat},${origin.lon}`,
          destination: `${destinations[destinations.length - 1].lat},${destinations[destinations.length - 1].lon}`,
          waypoints: `optimize:true|${waypoints}`,
          key: process.env.GEOCODING_API_KEY, // Use environment variable for API key
        },
      }
    );

    // Handle API response
    if (response.data.status === 'OK') {
      res.json(response.data);
    } else {
      console.error('Google API error:', response.data);
      res.status(400).json({
        error: response.data.error_message || 'Failed to optimize routes',
      });
    }
  } catch (error) {
    // Log and handle server error
    console.error('Optimize Route error:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};