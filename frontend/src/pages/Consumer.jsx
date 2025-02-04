import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, SlidersHorizontal, Leaf, MapPin, Star } from "lucide-react";
import ItemCardConsumer from "../components/ItemCardConsumer";
import myimg from "../assets/farm2.jpg";

const HeroSection = () => (
  <div className="relative overflow-hidden mb-8 bg-gradient-to-b from-amber-50 to-amber-100">
    <div className="absolute inset-0">
      <img src={myimg} alt="Fresh produce background" className="w-full h-full object-cover opacity-60" />
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
      </div>
    </div>
  </div>
);

const Consumer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDiscountOnly, setShowDiscountOnly] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/farmer/all");
      setProducts(response.data);

      // Extract categories dynamically
      const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);

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

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    // Apply discount filter
    if (showDiscountOnly) {
      filteredProducts = filteredProducts.filter((product) => product.discountOffer);
    }

    return filteredProducts;
  };

  const getSortedProducts = () => {
    let filteredProducts = getFilteredProducts();

    if (sortBy === "latest") {
      return filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortBy === "priceLowToHigh") {
      return filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceHighToLow") {
      return filteredProducts.sort((a, b) => b.price - a.price);
    }
    return filteredProducts;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl font-bold text-stone-900">Fresh Products</h1>
          <p className="text-stone-600">Discover fresh, locally sourced products from farmers near you</p>
        </div>

        {/* Filter & Search Section */}
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

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/90 md:w-48 w-full"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Discount Filter */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showDiscountOnly}
                onChange={() => setShowDiscountOnly(!showDiscountOnly)}
                className="w-5 h-5 text-amber-600 border-amber-300 focus:ring-amber-500"
              />
              <span className="text-stone-700">Discount Only</span>
            </label>

            {/* Sort Options */}
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

        {/* Products Grid */}
        {loading && <p className="text-amber-700">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => <ItemCardConsumer key={product._id} product={product} />)
            ) : (
              <p className="text-stone-600 text-lg text-center col-span-full">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Consumer;
