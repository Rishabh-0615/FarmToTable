import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCardConsumer from "../components/ItemCardConsumer";

let debounceTimeout;

const Consumer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch all products from the backend
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

  // Fetch search results from the backend
  const searchProducts = async (queryText) => {
    if (!queryText) {
      fetchProducts(); // Reload all products if search query is empty
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/customer/search?query=${queryText}`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch search results.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchProducts(e.target.value);
    }, 300); // Delay search to reduce requests
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Search Input */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md border border-gray-300 w-full max-w-md"
        />
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ItemCardConsumer key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Consumer;
