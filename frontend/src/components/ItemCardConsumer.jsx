import React, { useState, useMemo } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ItemCardConsumer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const calculatePrice = useMemo(() => {
    if (product.discountOffer && quantity >= product.minQuantityForDiscount) {
      const discountAmount = (product.price * product.discountPercentage) / 100;
      return (product.price - discountAmount).toFixed(2);
    }
    return product.price.toFixed(2);
  }, [product, quantity]);

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    try {
      if (quantity > product.quantity) {
        toast.error("Not enough stock available.");
        return;
      }

      if (!product._id) {
        toast.error("Invalid product. Please try again.");
        return;
      }

      const response = await axios.post("/api/user/customer/add", {
        productId: product._id,
        quantity,
      });

      toast.success(response.data.message || "Added to cart successfully!");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error(error.response?.data?.error || "Failed to add product to cart.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-sm">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image?.url || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.discountOffer && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <span className="text-sm text-gray-500">
              {new Date(product.createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{product.owner?.name || "Unknown Farmer"}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">{product.category}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-green-600">₹{calculatePrice}</span>
            {product.discountOffer && quantity >= product.minQuantityForDiscount && (
              <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
            )}
          </div>
          {product.discountOffer && quantity < product.minQuantityForDiscount && (
            <p className="text-sm text-orange-500">
              Add {product.minQuantityForDiscount - quantity} more for {product.discountPercentage}% off
            </p>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Available</span>
            <p className="font-medium text-gray-800">{product.quantity} units</p>
          </div>
          <div>
            <span className="text-gray-500">Shelf Life</span>
            <p className="font-medium text-gray-800">{product.life || "Not specified"}</p>
          </div>
        </div>

        {/* Quantity and Cart Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((prev) => Math.max(prev - 1, 1));
              }}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuantity((prev) => Math.min(prev + 1, product.quantity));
              }}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCardConsumer;