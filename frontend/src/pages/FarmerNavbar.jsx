import React, { useState } from "react";
import myimg from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { Menu, X } from "lucide-react";

const FarmerNavbar = () => {
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
    <>
      {/* Navbar Section */}
        <nav className="bg-green-800 text-white w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto  ">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Name Section */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img src={myimg} alt="Farm To Table" className="w-10 h-10" />
                <span className="ml-2 text-xl font-semibold">Farm To Table</span>
              </a>
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center">
              <div className="block lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white focus:outline-none"
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              <div className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:space-x-6`}>
                <ul className="flex flex-col lg:flex-row lg:space-x-4">
                  <li>
                    <a href="/farmer" className="block px-3 py-2 hover:text-green-400 relative group">
                      Home
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/mylistings" className="block px-3 py-2 hover:text-green-400 relative group">
                      My Listings
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/addproduct" className="block px-3 py-2 hover:text-green-400 relative group">
                      Add Product
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all"></span>
                    </a>
                  </li>
                  <li>
                    <button onClick={logoutHandler} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default FarmerNavbar;
