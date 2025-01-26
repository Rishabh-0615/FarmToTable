import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post("/api/user/customer/add", { productId, remove: true });
      fetchCart(); // Refresh cart after removal
    } catch (err) {
      alert("Failed to remove item from cart.");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
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
              <button
                onClick={() => handleRemoveFromCart(item.productId._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
