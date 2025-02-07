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
      <nav className="absolute top-0 left-0 w-full z-20 bg-gradient-to-r from-green-500 to-green-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-3xl font-extrabold text-white tracking-wide flex items-center">
                  DailyVegies
                </span>
              </a>
            </div>

            {/* Hamburger Menu */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>

            {/* Navbar Links */}
            <div className={`${isOpen ? 'block absolute top-16 right-0 w-[60%] bg-green-600 p-5 rounded-md shadow-lg' : 'hidden'} lg:flex lg:items-center lg:space-x-8`}>
              <ul className="flex flex-col lg:flex-row lg:space-x-6 text-white text-lg font-medium">
                <li>
                  <a href="/register" className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/login" className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="/admin-login" className="block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-green-700">
                    Admin
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
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Your Guide to Modern Agriculture</h1>
          <p className="mt-4 text-lg text-gray-700">
            Explore the future of agriculture with us. Discover cutting-edge insights, practical tips, and the latest trends in modern farming.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300">
              Getting Started
            </button>
            <button className="border-2 border-gray-900 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-md">
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
        <div key={index} className={`absolute w-full h-full transition-opacity duration-1000 ${slideIndex === index + 1 ? 'opacity-100' : 'opacity-0'}`}>
          <img src={img} className="w-full h-full object-cover rounded-lg shadow-2xl" alt={`Slide ${index + 1}`} />
        </div>
      ))}

      <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 text-white rounded-full cursor-pointer hover:bg-opacity-70 transition-all" onClick={() => setSlideIndex(slideIndex === 1 ? images.length : slideIndex - 1)}>
        &#10094;
      </button>
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 text-white rounded-full cursor-pointer hover:bg-opacity-70 transition-all" onClick={() => setSlideIndex(slideIndex === images.length ? 1 : slideIndex + 1)}>
        &#10095;
      </button>

      <div className="text-center mt-2">
        {images.map((_, index) => (
          <span key={index} className={`dot inline-block h-3 w-3 rounded-full mx-1 cursor-pointer transition-all ${slideIndex === index + 1 ? 'bg-gray-700' : 'bg-gray-400 hover:bg-gray-600'}`} onClick={() => setSlideIndex(index + 1)}></span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
