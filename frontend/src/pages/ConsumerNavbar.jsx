import React, { useState } from "react";
import { Menu, X, Home, ShoppingCart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

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

  const menuItems = [
    { label: "Home", icon: <Home className="h-6 w-6" />, path: "/consumer" },
    { label: "Cart", icon: <ShoppingCart className="h-6 w-6" />, path: "/cart" },
    { label: "Order", path: "/order" },
    { label: "All Orders", path: "/orders" },
    
  ];

  return (
    <nav className="bg-green-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Name */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <img
                src="/api/placeholder/40/40"
                alt="Farm To Table"
                className="w-10 h-10 rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-200"
              />
              <span className="ml-2 text-xl font-bold text-[#faeedc] group-hover:text-white transition-all duration-200">
                Farm-to-Table
              </span>
            </a>
          </div>

          {/* Menu Button for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#faeedc] hover:text-white focus:outline-none transition-transform duration-200"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? "block" : "hidden"} bg-green-500 lg:bg-transparent w-full lg:w-auto mt-4 lg:mt-0`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6">
              {menuItems.map((item, index) => (
                <li key={index} className="my-2 lg:my-0">
                  <a
                    href={item.path}
                    className="flex items-center px-4 py-2 text-[#faeedc] hover:text-white rounded-lg transition-all duration-200 hover:bg-white/10"
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={logoutHandler}
                  className="w-full lg:w-auto px-4 py-2 bg-[#1bc06d] hover:bg-[#159a58] text-[#faeedc] rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:text-white transform hover:-translate-y-1 hover:scale-105 flex items-center"
                >
                  <LogOut className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ConsumerNavbar;
