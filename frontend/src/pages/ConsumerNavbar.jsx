import React from "react";
import { ShoppingCart, User } from "lucide-react";

export default function ConsumerNavbar() {
  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold flex items-center">
          <img src="/logo.svg" alt="Farm-to-Table Logo" className="w-10 h-10 mr-2" />
          Farm-to-Table
        </a>
        <nav>
          <ul className="flex space-x-6">
            {["Home", "Cart", "Past Orders", "About Us", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href={item === "Home" ? "/consumer" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-green-200 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
