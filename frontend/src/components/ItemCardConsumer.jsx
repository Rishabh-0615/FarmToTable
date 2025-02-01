import React, { useState, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ItemCardConsumer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // Calculate discounted price if applicable
  const calculatePrice = useMemo(() => {
    if (product.discountOffer && quantity >= product.minQuantityForDiscount) {
      const discountAmount = (product.price * product.discountPercentage) / 100;
      return product.price - discountAmount;
    }
    return product.price;
  }, [product, quantity]);

  const handleAddToCart = async () => {
    try {
      if (quantity > product.quantity) {
        toast.error("Not enough stock available.");
        return;
      }

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
      <p className="text-gray-600">Name: {product.name}</p>
      
      {/* Price display with discount information */}
      <div className="mt-2">
        <p className="text-gray-600">
          Price: ₹{product.price}
          {product.discountOffer && (
            <span className="ml-2 text-sm text-green-600">
              ({product.discountPercentage}% off on {product.minQuantityForDiscount}+ items)
            </span>
          )}
        </p>
        
        {/* Show discounted price when applicable */}
        {product.discountOffer && quantity >= product.minQuantityForDiscount && (
          <p className="text-green-600 font-semibold">
            Discounted Price: ₹{calculatePrice}
            <span className="text-sm ml-2">
              (You save ₹{(product.price - calculatePrice).toFixed(2)})
            </span>
          </p>
        )}
      </div>

      <p className="text-gray-600">Available: {product.quantity}</p>

      {/* Discount eligibility message */}
      {product.discountOffer && quantity < product.minQuantityForDiscount && (
        <p className="text-orange-500 text-sm mt-2">
          Add {product.minQuantityForDiscount - quantity} more items to get {product.discountPercentage}% off!
        </p>
      )}

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
          onClick={() => setQuantity((prev) => Math.min(prev + 1, product.quantity))}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCardConsumer;