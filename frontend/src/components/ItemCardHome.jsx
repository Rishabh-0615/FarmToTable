import React, { useState } from "react";

const ItemCardHome = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img
        src={product.image.url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
        <p className="text-gray-700 mt-2">Price: ${product.price}</p>
        <p className="text-gray-700 mt-1">Quantity: {product.quantity}</p>
      </div>
    </div>
  );
};

export default ItemCardHome;
