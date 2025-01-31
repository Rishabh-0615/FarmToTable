import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center">
              <img src="/logo.svg" alt="Farm to Table Logo" className="w-8 h-8 rounded-lg shadow-md" />
              <span className="ml-1 text-xl font-semibold text-green-200">DailyVegie</span>
            </a>
          </div>

          {/* Hamburger Menu */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navbar Links */}
          <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:space-x-6`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-6 text-white">
              <li>
                <a href="/" className="block px-3 py-2 rounded-lg hover:bg-green-500 transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="block px-3 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg hover:from-emerald-500 hover:to-teal-600 transition-all">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="block px-3 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg hover:from-emerald-500 hover:to-teal-600 transition-all">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
