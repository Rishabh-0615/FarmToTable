import React from "react";

const ItemCardHome = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:cursor-pointer">
      <img
        src={product.image.url}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-green-800 transition-colors duration-300 hover:text-green-600">
          Category: {product.category}
        </h3>
        <p className="text-gray-700 mt-2 text-lg font-semibold">
          Name: <span className="text-green-500">{product.name}</span>
        </p>
        <p className="text-gray-700 mt-2 text-lg font-semibold">
          Price: <span className="text-green-500">₹{product.price}</span>
        </p>
        <p className="text-gray-700 mt-2 text-lg font-semibold">
          Listed on: {new Date(product.createdAt).toLocaleDateString("en-GB")}</p>
        <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
      </div>
      {/* Hover effect for the card */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-100 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    </div>
  );
};

export default ItemCardHome;
