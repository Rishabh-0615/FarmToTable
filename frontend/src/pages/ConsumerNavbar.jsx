import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { ShoppingCart, LogOut, Home } from "lucide-react";

const ConsumerNavbar = () => {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      setIsAuth(false);
      setUser([]);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <nav className="bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Name Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <img
                src="/api/placeholder/40/40"
                alt="Farm To Table"
                className="w-10 h-10 rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-200"
              />
              <span className="ml-2 text-xl font-bold text-[#faeedc] group-hover:text-white transition-all duration-200 transform group-hover:translate-x-1">
                Farm-to-Table
              </span>
            </a>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[#faeedc] hover:text-white focus:outline-none transition-all duration-200 transform hover:scale-110"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Menu Items */}
            <div
              className={`${
                isOpen
                  ? "block absolute top-16 right-0 w-48 bg-gradient-to-r from-[#1dcc75] to-[#19b25e] shadow-xl rounded-bl-lg"
                  : "hidden"
              } lg:relative lg:flex lg:items-center lg:space-x-6 lg:bg-transparent lg:w-auto`}
            >
              <ul className="flex flex-col lg:flex-row lg:space-x-4 p-2 lg:p-0">
                <li>
                  <a
                    href="/consumer"
                    className="block px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 h-10"
                  >
                    
                    <Home className="mr-0 h-7 w-7" />


                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    className="block px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 flex items-center"
                  >
                    <ShoppingCart className="mr-0 h-7 w-7" />
                    
                  </a>
                </li>
                <li>
                  <a
                    href="/past-orders"
                    className="block px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:bg-white/10"
                  >
                    Past Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/about-us"
                    className="block px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:bg-white/10"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="block px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg hover:bg-white/10"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="w-full lg:w-auto px-4 py-2 bg-[#1bc06d] hover:bg-[#159a58] text-[#faeedc] rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:text-white transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-white/20 flex items-center"
                  >
                    <LogOut className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>

              {/* Menu Items */}
              <div
                className={`${
                  isOpen ? "block absolute top-16 right-0 w-48 bg-green-800 shadow-xl rounded-bl-lg" : "hidden"
                } lg:relative lg:flex lg:items-center lg:space-x-6 lg:bg-transparent lg:w-auto`}
              >
                <ul className="flex flex-col lg:flex-row lg:space-x-4 p-2 lg:p-0">
                  <li>
                    <a
                      href="/consumer"
                      className="block px-4 py-2 text-green-100 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 lg:hover:bg-transparent lg:hover:text-green-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cart"
                      className="block px-4 py-2 text-green-100 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 lg:hover:bg-transparent lg:hover:text-green-300"
                    >
                      Cart
                    </a>
                  </li>
                  
                  
                  <li>
                    <a
                      href="/order"
                      className="block px-4 py-2 text-green-100 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 lg:hover:bg-transparent lg:hover:text-green-300"
                    >
                      Order
                    </a>
                  </li>
                  <li>
                    <a
                      href="/past-orders"
                      className="block px-4 py-2 text-green-100 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200 lg:hover:bg-transparent lg:hover:text-green-300"
                    >
                      Past Orders
                    </a>
                  </li>
                 
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="w-full lg:w-auto px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ConsumerNavbar;
