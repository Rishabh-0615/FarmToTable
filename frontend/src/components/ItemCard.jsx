import React, { useState } from "react";

const ItemCard = ({ product, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    handleEdit(product._id, editedProduct);
    setIsEditing(false); // Close the edit mode
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img
        src={product.image.url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-green-700">
              {product.name}
            </h3>
            <p className="text-gray-700 mt-2">Price: ${product.price}</p>
            <p className="text-gray-700 mt-1">Quantity: {product.quantity}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2 hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
