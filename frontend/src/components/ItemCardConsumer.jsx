import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ItemCardConsumer = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-80 hover:scale-105">
      {/* Image Section */}
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

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Header Info */}
        <div>
          <div className="flex justify-between items-start mb-2">
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

        {/* Price Info */}
        <div className="space-y-2">
        <div className="flex items-baseline gap-2">
  {product.discountOffer && quantity >= product.minQuantityForDiscount ? (
    <>
      <span className="text-2xl font-bold text-green-600">₹{calculatePrice}</span>
      <span className="text-lg text-red-500 line-through">₹{product.price}</span>
    </>
  ) : (
    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
  )}
</div>
          
          {product.discountOffer && (
            <div className="text-sm">
              {quantity >= product.minQuantityForDiscount ? (
                <p className="text-green-600">You save ₹{(product.price - parseFloat(calculatePrice)).toFixed(2)}</p>
              ) : (
                <p className="text-orange-500">
                  Add {product.minQuantityForDiscount - quantity} more for {product.discountPercentage}% off!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Available</span>
            <p className="font-medium text-gray-800">{product.quantity} {product.quantityUnit} </p>
          </div>
          <div>
            <span className="text-gray-500">Shelf Life</span>
            <p className="font-medium text-gray-800">{product.life || "Not specified"}</p>
          </div>
        </div>

        {/* Quantity and Cart Controls */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center bg-gray-100 rounded-lg px-2">
            <button
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none disabled:text-gray-400"
              onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none disabled:text-gray-400"
              onClick={() => setQuantity(prev => Math.min(prev + 1, product.quantity))}
              disabled={quantity >= product.quantity}
            >
              +
            </button>
          </div>
          <button
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCardConsumer;