import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [address, setAddress] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            const { data } = await axios.post("/api/user/customer/getlocation", { latitude, longitude });
            toast.success(data.message);
          } catch (error) {
            console.error("Error saving location", error);
          }
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleGeocode = async () => {
    try {
      const response = await axios.post("/api/user/customer/geocode", { address });
      setLocation(response.data.results[0].geometry.location);
      toast.success("Geocoding successful!");
    } catch (error) {
      toast.error("Failed to geocode address.");
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/customer/getcart");
      setCart(response.data);
    } catch (err) {
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const response = await axios.post("/api/user/customer/add", {
        productId,
        remove: true,
      });
      setCart(response.data.cart);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Failed to remove item from cart.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!location && !address) {
      toast.error("Please provide your address or use one of the location buttons.");
      return;
    }

    try {
      const response = await axios.post("/api/user/customer/order", {
        location,
        address,
      });
      setOrderMessage(response.data.message);
      setCart(null);
      toast.success("Order placed successfully!");
      navigate("/past-orders");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await axios.post("/api/user/customer/clear");
      if (response.data.message) {
        setCart(null);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to clear the cart. Please try again.");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {orderMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          {orderMessage}
        </div>
      )}
      {cart?.items?.length > 0 ? (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item?.productId?._id || Math.random()}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h2 className="text-lg">{item?.productId?.name || "Unnamed Product"}</h2>
                <p>Quantity: {item?.quantity || 1}</p>
                <p>Price: ₹{(item?.productId?.price || 0) * (item?.quantity || 1)}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => removeCartItem(item?.productId?._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {cart?.items?.length > 0 && (
        <>
          <button
            onClick={handleClearCart}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full"
          >
            Clear Cart
          </button>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">Geocode Address</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Address"
            />
            <button
              onClick={handleGeocode}
              className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Geocode
            </button>
            <button onClick={getLocation} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-5">
              Get Location
            </button>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
