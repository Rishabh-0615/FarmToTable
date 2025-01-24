// AddProduct.jsx
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ProductData } from "../context/FarmerContext";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const LoadingAnimation = () => (
  <div className="flex justify-center items-center">
    <div className="spinner border-t-transparent border-4 border-green-500 rounded-full w-6 h-6 animate-spin"></div>
  </div>
);

const AddProduct = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [loading, setLoading] = useState(false);
  const { addProduct } = ProductData();
  const { user } = UserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClick = () => {
    inputRef.current.click();
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("quantity", data.quantity);
    formData.append("weight", data.weight);
    formData.append("price", data.price);
    formData.append("location", data.location);
    formData.append("condition", data.condition);
    formData.append("notes", data.notes);
    formData.append("file", file);
    formData.append("userId", user.id);

    try {
      await addProduct(formData, setFilePrev, setFile, navigate);
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">Add New Product</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-green-400 rounded-lg">
            {filePrev && <img src={filePrev} alt="Preview" className="w-full h-full object-cover rounded-lg" />}
            <div
              className="flex flex-col items-center justify-center h-full cursor-pointer"
              onClick={handleClick}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={changeFileHandler}
              />
              {!filePrev && (
                <>
                  <div className="w-12 h-12 mb-4 flex items-center justify-center bg-green-100 text-green-500 rounded-full">
                    <FaPlus size={24} />
                  </div>
                  <p className="text-gray-500">Choose a file</p>
                </>
              )}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            We recommend using high-quality .jpg files but less than 10MB.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("productName", { required: "Product name is required" })}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity Available
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("quantity", { required: "Quantity is required" })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight per Piece (kg)
            </label>
            <input
              type="number"
              id="weight"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("weight", { required: "Weight is required" })}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (per unit)
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Farm Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Product Condition
            </label>
            <select
              id="condition"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("condition", { required: "Condition is required" })}
            >
              <option value="">Select condition</option>
              <option value="Ripe">Ripe</option>
              <option value="Unripe">Unripe</option>
              <option value="Other">Other</option>
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm mt-1">{errors.condition.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              {...register("notes")}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
