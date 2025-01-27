import React, { useState } from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast"

const ItemCardConsumer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("/api/user/customer/add", {
        productId: product._id,
        quantity,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Add to Cart Error:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Failed to add product to cart.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={product.image?.url || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">Price: ₹{product.price}</p>
      <p className="text-gray-600">Available: {product.quantity}</p>
      <div className="flex items-center mt-4 space-x-3">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCardConsumer;
