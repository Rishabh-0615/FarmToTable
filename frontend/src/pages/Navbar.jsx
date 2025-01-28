import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import myimg from "../assets/new21.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-[120vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${myimg})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src="/logo.svg" alt="Farm to Table Logo" className="w-10 h-10" />
                <span className="ml-2 text-white text-xl font-semibold">Farm to Table</span>
              </a>
            </div>

            {/* Hamburger Menu */}
            <div className="flex items-center">
              <div className="block lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white focus:outline-none"
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              {/* Navbar Links */}
              <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:space-x-6`}>
                <ul className="flex flex-col lg:flex-row lg:space-x-4 text-white">
                  <li>
                    <a
                      href="/"
                      className="block px-3 py-2 hover:text-yellow-400 relative group"
                    >
                      Home
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/login"
                      className="block px-3 py-2 hover:text-yellow-400 relative group"
                    >
                      Login
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/register"
                      className="block px-3 py-2 hover:text-yellow-400 relative group"
                    >
                      Register
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
