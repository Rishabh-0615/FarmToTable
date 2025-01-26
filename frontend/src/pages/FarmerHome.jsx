import React, { useEffect } from 'react';
import FarmerNavbar from './FarmerNavbar';
import { HeroSection } from './HeroSection';
import { Footer } from './Footer';
import { ProductData } from '../context/FarmerContext';
import { Loading } from '../components/Loading';
import ItemCardHome from '../components/ItemCardHome';

const FarmerHome = () => {
  const { fetchProducts, products, loading } = ProductData();
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Product Display Section */}
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Grid Layout for Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products && products.length > 0 ? (
                products.map((product, i) => (
                  <div
                    key={i}
                    className="flex justify-center"
                  >
                    <ItemCardHome product={product} />
                  </div>
                ))
              ) : (
                <p className="text-center text-xl text-gray-600 col-span-full">
                  No Products Yet
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default FarmerHome;
