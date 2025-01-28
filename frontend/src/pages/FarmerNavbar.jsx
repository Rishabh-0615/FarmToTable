import React from "react";
import myimg from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast,{Toaster} from "react-hot-toast";
import axios from "axios";
const FarmerNavbar = () => {

  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message); 
      setIsAuth(false); 
      setUser([]);
      navigate("/"); 
       
    } catch (error) {
      //
      const errorMessage = error.response ? error.response.data.message : error.message;
      toast.error(errorMessage); 
    }
  
  };
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <a href="/farmer" style={styles.brand}>
          <img src={myimg} alt="Farm to Table Logo" style={styles.logo} />
          <span style={styles.title}>Farm to Table</span>
        </a>
        <ul style={styles.navList}>
          
          <li style={styles.navItem}>
            <a href="/mylistings" style={styles.navLink}>My Listings</a>
          </li>
          <li style={styles.navItem}>
            <a href="/addproduct" style={styles.navLink}>Add Product</a>
          </li>
          <button
              onClick={logoutHandler}
              className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded"
            >
              Logout
            </button>
          
          
        </ul>
        
        
      </div>
    </nav>
  );
};

// Inline styles
const styles = {
  nav: {
    backgroundColor: "#DFF6DD", // light green
    color: "#2C5F2D", // dark green
    padding: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  title: {
    marginLeft: "0.5rem",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: "1rem",
  },
  navItem: {
    listStyle: "none",
  },
  navLink: {
    textDecoration: "none",
    color: "#2C5F2D",
    transition: "color 0.3s ease",
    fontSize: "1rem",
  },
  navLinkHover: {
    color: "#6B4226", // earth brown
  },
};

export default FarmerNavbar;
