import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import Verify from "./pages/Verify";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import FarmerHome from "./pages/FarmerHome";
import MyListings from "./pages/MyListings";
import AddProduct from "./pages/AddProduct";
import Navbar from "./pages/Navbar";
import FarmerNavbar from "./pages/FarmerNavbar";

const App = () => {
  const { user, loading, isAuth } = UserData();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <AppWithLocation user={user} isAuth={isAuth} />
    </BrowserRouter>
  );
};

const AppWithLocation = ({ user, isAuth }) => {
  const location = useLocation(); // Hook is now inside BrowserRouter context

  // Determine which navbar to display
  const showFarmerNavbar =
    isAuth &&
    user.role === "farmer" 

  return (
    <>
      {/* Conditionally render navbar */}
      {showFarmerNavbar ? <FarmerNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuth ? (
              user.role === "farmer" ? (
                <Navigate to="/farmer" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/farmer"
          element={
            isAuth && user.role === "farmer" ? (
              <FarmerHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/verify/:token" element={isAuth ? <Home /> : <Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<Reset />} />
        <Route path="/mylistings" element={<MyListings user={user} />} />
        <Route path="/addproduct" element={<AddProduct />} />
      </Routes>
    </>
  );
};

export default App;
