import React from "react";

const ItemCardHome = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-sm hover:scale-105">
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
            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
            {product.discountOffer && (
              <p className="ml-2 text-sm text-green-600">
                ({product.discountPercentage}% off on {product.minQuantityForDiscount}+ items)
              </p>
            )}
          </div>
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
      </div>
    </div>
  );
};

export default ItemCardHome;