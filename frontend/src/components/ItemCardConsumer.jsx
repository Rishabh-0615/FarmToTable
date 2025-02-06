import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ItemCardConsumer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

  // Calculate the current price considering discount eligibility
  const calculatePrice = useMemo(() => {
    if (product.discountOffer && quantity >= product.minQuantityForDiscount) {
      const discountAmount = (product.price * product.discountPercentage) / 100;
      return (product.price - discountAmount).toFixed(2);
    }
    return product.price.toFixed(2);
  }, [product, quantity]);

  useEffect(() => {
    setPrice(parseFloat(calculatePrice));
  }, [calculatePrice]);

  const handleAddToCart = async () => {
    if (quantity > product.quantity) {
      toast.error("Not enough stock available.");
      return;
    }

    try {
      const response = await axios.post("/api/user/customer/add", {
        productId: product._id,
        quantity,
        price,
      });

      if (response.status === 200) {
        toast.success(
          `Added ${quantity} ${product.name}(s) to cart at ₹${price} each`
        );
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error(
        error.response?.data?.error || "Failed to add product to cart."
      );
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative">
      <img
        src={product.image?.url || "https://via.placeholder.com/150"}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="p-4 relative z-10">
        <h3 className="text-sm text-gray-600 mb-1">
          Farmer: {product.owner?.name || "Unknown Farmer"}
        </h3>
        <h3 className="text-xl font-semibold text-green-800 transition-colors duration-300 hover:text-green-600">
          Category: {product.category}
        </h3>
        <p className="text-gray-700 mt-2 text-lg font-semibold">
          Name: <span className="text-green-500">{product.name}</span>
        </p>

        <div className="mt-2">
          <p className="text-gray-700 text-lg font-semibold">
            Price: ₹{product.price}
            {product.discountOffer && (
              <span className="ml-2 text-sm text-green-600">
                ({product.discountPercentage}% off on {product.minQuantityForDiscount}+ items)
              </span>
            )}
          </p>

          {product.discountOffer && quantity >= product.minQuantityForDiscount && (
            <p className="text-green-600 font-semibold">
              Discounted Price: ₹{calculatePrice}
              <span className="text-sm ml-2">
                (You save ₹{(product.price - calculatePrice).toFixed(2)})
              </span>
            </p>
          )}
        </div>

        <p className="text-gray-600 mt-1">Available: {product.quantity}</p>
        <p className="text-gray-600 mt-1">
          Shelf Life:{" "}
          <span className="text-green-500">{product.life || "Not specified"}</span>
        </p>
        <p className="text-gray-700 mt-2 text-lg font-semibold">
          Listed on: {new Date(product.createdAt).toLocaleDateString("en-GB")}
        </p>

        {product.discountOffer && quantity < product.minQuantityForDiscount && (
          <p className="text-orange-500 text-sm mt-2">
            Add {product.minQuantityForDiscount - quantity} more items to get {product.discountPercentage}% off!
          </p>
        )}

        <div className="flex items-center mt-4 space-x-3 relative z-20">
          <button
            className="px-3 py-1 bg-gray-200 rounded-md focus:outline-none active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((prev) => Math.max(prev - 1, 1));
            }}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded-md focus:outline-none active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((prev) => Math.min(prev + 1, product.quantity));
            }}
            disabled={quantity >= product.quantity}
          >
            +
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none active:scale-95"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-green-100 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    </div>
  );
};

export default ItemCardConsumer;
