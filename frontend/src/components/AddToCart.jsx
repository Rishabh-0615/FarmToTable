import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function AddToCart({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Simulate adding the item to a cart
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
        isAdded ? "bg-green-600 text-white" : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      <ShoppingCart className="w-5 h-5 mr-2" />
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
