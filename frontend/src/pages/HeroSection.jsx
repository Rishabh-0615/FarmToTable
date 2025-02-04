import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Farm-themed content and background images
  const items = [
    { 
      id: 1, 
      title: "From Farm to Your Table",
      description: "Fresh produce directly from local farmers, ensuring quality and supporting our farming community",
      imgSrc: "/api/placeholder/400/400", // Replace with image of fresh produce
      bgImage: "url('/api/placeholder/1920/1080')", // Replace with image of beautiful farmland with sunrise
      overlayColor: "from-green-900/70 via-green-800/60 to-green-900/70"
    },
    { 
      id: 2, 
      title: "Support Local Farmers",
      description: "Connect directly with farmers and get the freshest seasonal produce at fair prices",
      imgSrc: "/api/placeholder/400/400", // Replace with image of farmers working
      bgImage: "url('/api/placeholder/1920/1080')", // Replace with image of farmers in field
      overlayColor: "from-green-900/70 via-green-800/60 to-green-900/70"
    },
    { 
      id: 3, 
      title: "100% Organic & Fresh",
      description: "Sustainably grown vegetables and fruits, harvested at peak freshness",
      imgSrc: "/api/placeholder/400/400", // Replace with image of organic produce
      bgImage: "url('/api/placeholder/1920/1080')", // Replace with image of organic farm
      overlayColor: "from-green-900/70 via-green-800/60 to-green-900/70"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const navigate = (direction) => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % items.length;
      }
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images with Overlay */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage: item.bgImage,
            }}
          />
          {/* Natural Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b ${item.overlayColor}`} />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4">
        <div className="h-full flex items-center justify-center">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? "opacity-100 translate-x-0" 
                  : index < currentIndex 
                    ? "opacity-0 -translate-x-full" 
                    : "opacity-0 translate-x-full"
              }`}
            >
              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                  {item.description}
                </p>
                <a href="Consumer" className="inline-block"></a>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                  Shop Fresh Produce
                
                </button>
              </div>
              
              {/* Feature Image */}
              <div className="w-full md:w-1/2">
                <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6">
          <button
            onClick={() => navigate('prev')}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? "bg-green-400 w-8" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => navigate('next')}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;