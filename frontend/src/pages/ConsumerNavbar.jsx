import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, Home, Clock, Info, PhoneCall, LogOut } from "lucide-react";
import { UserData } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ProductSearch from "../components/ProductSearch";

const NAV_ITEMS = [
  { name: "Home", path: "/consumer", icon: Home },
  { name: "Cart", path: "/cart", icon: ShoppingCart },
  { name: "Past Orders", path: "/past-orders", icon: Clock },
  { name: "About Us", path: "/about-us", icon: Info },
  { name: "Contact Us", path: "/contact-us", icon: PhoneCall },
];

export default function ConsumerNavbar() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-green-600 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Farm-to-Table Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-white hidden sm:block">Farm-to-Table</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="flex items-center space-x-1 text-green-100 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={logoutHandler}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-green-100 hover:bg-green-500 md:hidden"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <ul className="space-y-4">
              {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="flex items-center space-x-2 text-green-100 hover:text-white transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-red-200 hover:text-red-100 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </header>
  );
}