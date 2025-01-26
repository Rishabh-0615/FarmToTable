import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCardConsumer from "../components/ItemCardConsumer";

const Consumer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/farmer/all");
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ItemCardConsumer key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Consumer;
