import React from 'react';
import farmer from "../assets/indianFarmer.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-green-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Supporting Local Farmers
            </h1>
            <p className="text-xl md:text-2xl">
              Empowering farmers with sustainable practices and fair trade opportunities
            </p>
            <div className="space-x-4 pt-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Join Us
              </button>
              <button className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] md:h-[600px]">
            <img
              src={farmer}
              alt="Smiling farmer in traditional attire"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;