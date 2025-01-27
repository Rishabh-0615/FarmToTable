import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    callback(); // If the API is already loaded, directly call the callback
  } else {
    // Check if script is already appended to the document head
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBp2vxnypb_RIEbySnqcRaGZUMthm5n490&libraries=places&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    script.onerror = () => toast.error("Failed to load Google Maps API.");
    document.head.appendChild(script);
  }
};

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consumerAddress, setConsumerAddress] = useState("");
  const [consumerLocation, setConsumerLocation] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);  // To check if Google Maps API is loaded
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    loadGoogleMapsScript(initializeAutocomplete);
  }, []);

  const initializeAutocomplete = () => {
    if (!window.google) {
      toast.error("Google Maps API is not loaded yet.");
      return;
    }

    setGoogleMapLoaded(true);  // Indicate Google Maps has loaded successfully

    const input = document.getElementById("autocomplete-address");
    if (!input) {
      toast.error("Address input field not found.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ["address"],
      componentRestrictions: { country: "IN" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setConsumerAddress(place.formatted_address);
        setConsumerLocation({
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
        });
        toast.success("Address selected successfully!");
      } else {
        toast.error("Please select a valid address from the suggestions.");
      }
    });
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/customer/getcart");
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load cart. Please try again.");
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

  const handleGetLocationDirectly = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingAddress(true); // Set loading state while fetching location

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setConsumerLocation({ lat: latitude, lon: longitude });
        setConsumerAddress("");
        toast.success("Location fetched successfully.");
        setIsLoadingAddress(false);
      },
      () => {
        toast.error("Unable to fetch location. Please allow location access.");
        setIsLoadingAddress(false);
      }
    );
  };

  const handlePlaceOrder = async () => {
    if (!consumerLocation && !consumerAddress) {
      toast.error("Please provide your address or use one of the location buttons.");
      return;
    }

    try {
      const response = await axios.post("/api/user/customer/order", {
        consumerLocation,
        consumerAddress,
      });
      setOrderMessage(response.data.message);
      setCart(null);
      toast.success("Order placed successfully!");
      navigate("/past-orders");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {orderMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          {orderMessage}
        </div>
      )}
      {cart?.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h2 className="text-lg">{item.productId.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.productId.price * item.quantity}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => removeCartItem(item.productId._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart?.items.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Enter Your Address or Use Location</h2>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <input
                id="autocomplete-address"
                placeholder="Enter your address"
                className="flex-grow px-3 py-2 border rounded-md"
                onChange={(e) => setConsumerAddress(e.target.value)}
              />
              <button
                onClick={initializeAutocomplete}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                disabled={googleMapLoaded === false}  // Disable button until API is loaded
              >
                Use Address
              </button>
            </div>
            <button
              onClick={handleGetLocationDirectly}
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
              disabled={isLoadingAddress}
            >
              {isLoadingAddress ? "Fetching Location..." : "Get Location Directly"}
            </button>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
