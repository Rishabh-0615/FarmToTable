import React from "react";

const FarmerNavbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <a href="/farmer" style={styles.brand}>
          <img src="/logo.svg" alt="Farm to Table Logo" style={styles.logo} />
          <span style={styles.title}>Farm to Table</span>
        </a>
        <ul style={styles.navList}>
          
          <li style={styles.navItem}>
            <a href="/mylistings" style={styles.navLink}>My Listings</a>
          </li>
          <li style={styles.navItem}>
            <a href="/addproduct" style={styles.navLink}>Add Product</a>
          </li>
          
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
