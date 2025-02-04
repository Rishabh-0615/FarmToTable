import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, SlidersHorizontal, Leaf, MapPin, Star } from "lucide-react";
import ItemCardConsumer from "../components/ItemCardConsumer";
import myimg from "../assets/farm2.jpg";

const HeroSection = () => (
  <div className="relative overflow-hidden mb-8 bg-gradient-to-b from-amber-50 to-amber-100">
    <div className="absolute inset-0">
      <img
        src={myimg}
        alt="Fresh produce background"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-green-900/20" />
    </div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6">
          <span className="block">Fresh From The Farm</span>
          <span className="block text-amber-700">Direct To Your Table</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-stone-700 mb-8">
          Support local farmers and enjoy fresh, sustainably grown produce delivered right to your doorstep.
        </p>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-amber-100 rounded-full mb-4">
              <Leaf className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Fresh & Organic</h3>
            <p className="text-stone-600 text-sm text-center">Locally sourced fresh produce</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-amber-100 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Local Farmers</h3>
            <p className="text-stone-600 text-sm text-center">Support your community</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-3 bg-amber-100 rounded-full mb-4">
              <Star className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Quality Assured</h3>
            <p className="text-stone-600 text-sm text-center">Verified fresh products</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Consumer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/farmer/all");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const queryText = e.target.value;
    setQuery(queryText);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      searchProducts(queryText);
    }, 300);
    setDebounceTimeout(timeout);
  };

  const searchProducts = async (queryText) => {
    if (!queryText) {
      fetchProducts();
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`/api/user/customer/search?query=${queryText}`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];
    if (sortBy === "latest") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
      {/* Add Hero Section at the top */}
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Fresh Products</h1>
          <p className="text-stone-600">Discover fresh, locally sourced products from farmers near you</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white/90"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 text-stone-700 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors md:w-auto w-full justify-center"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/90 md:w-48 w-full"
            >
              <option value="latest">Latest</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Render loading, error, and product grid */}
        {loading && <p className="text-amber-700">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ItemCardConsumer key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
                <p className="text-stone-600 text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setQuery("");
                    fetchProducts();
                  }}
                  className="text-amber-700 hover:text-amber-600 font-medium"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Consumer;
