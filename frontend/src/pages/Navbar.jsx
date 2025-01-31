import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Import lucide-react icons
import myimg1 from '../assets/logo100.jpeg';
import myimg2 from '../assets/about.png';
import myimg3 from '../assets/farm2.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen bg-white relative overflow-hidden no-scrollbar">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 bg-gradient-to-r from-green-400 to-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="ml-2 text-white text-xl font-semibold">DailyVegies</span>
            </a>
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden relative">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none relative z-30"
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              {isOpen ? <X size={28}  /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navbar Links */}
          <div className={`${isOpen ? 'block absolute top-16 right-0 w-[20vw] bg-green-500 p-4 shadow-lg' : 'hidden'} lg:flex lg:items-center lg:space-x-6 ml-auto relative z-20`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-4 text-white text-sm sm:text-base md:text-lg">
              <li>
                <a href="/register" className="block px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 border border-white text-xs sm:text-sm md:text-base">
                  Sign Up
                </a>
              </li>
              <li>
                <a href="/login" className="block px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 border border-white text-xs sm:text-sm md:text-base">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

      {/* Middle Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center h-full px-6 sm:px-12 pt-24 lg:pt-0">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">Your Guide to Modern Agriculture</h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-black">
            Explore the future of agriculture with us. Discover cutting-edge insights, practical tips, and the latest trends in modern farming.
          </p>
          <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
              Getting Started
            </button>
            <button className="bg-transparent text-black font-bold py-3 px-6 rounded-full border-2 border-black hover:border-green-500 transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-xl">
              Our Services
            </button>
          </div>
        </div>

        {/* Slideshow on the Right */}
        <Slideshow />
      </div>
    </div>
  );
};

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const images = [myimg1, myimg2, myimg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex % images.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full sm:w-[400px] md:w-[500px] lg:w-[750px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] mx-auto overflow-hidden rounded-lg shadow-lg mt-6 lg:mt-0">
      {images.map((img, index) => (
        <div key={index} className="absolute w-full h-full transition-opacity duration-1000" style={{ display: slideIndex === index + 1 ? 'block' : 'none' }}>
          <img src={img} className="w-full h-full object-cover rounded-lg shadow-2xl" alt={`Slide ${index + 1}`} />
        </div>
      ))}

      <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full cursor-pointer" onClick={() => setSlideIndex(slideIndex === 1 ? images.length : slideIndex - 1)}>
        &#10094;
      </button>
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white rounded-full cursor-pointer" onClick={() => setSlideIndex(slideIndex === images.length ? 1 : slideIndex + 1)}>
        &#10095;
      </button>

      <div className="text-center mt-2">
        {images.map((_, index) => (
          <span key={index} className={`dot inline-block h-3 w-3 rounded-full mx-1 cursor-pointer ${slideIndex === index + 1 ? 'bg-gray-600' : 'bg-gray-300'}`} onClick={() => setSlideIndex(index + 1)}></span>
        ))}
      </div>
    </div>
  );
};


export default Navbar;
