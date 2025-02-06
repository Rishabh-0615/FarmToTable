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
import ConsumerNavbar from "./pages/ConsumerNavbar"; // Import ConsumerNavbar
import Consumer from "./pages/Consumer";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import RoutePage from "./components/RoutePage";
import RouteMap from "./components/RouteMap";
import AddToCart from "./components/AddToCart";
import Empty from "./pages/Empty";
import Account from "./pages/Account";
import Model from './pages/Model'
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./pages/AdminDashboard";
import UserOrdersPage from "./components/RouteMap";
import OrderList from "./components/RouteMap";

const App = () => {
  const { user, loading, isAuth,fetchUser } = UserData();

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
  const showFarmerNavbar = isAuth && user.role === "farmer";
  const showConsumerNavbar = isAuth && user.role === "customer";
  

  return (
    <>
      {/* Conditionally render navbar */}
      {showFarmerNavbar ? (
        <FarmerNavbar />
      ) : showConsumerNavbar ? (
        <ConsumerNavbar />
      ) : (
        <Empty />
      )}

      <Routes>
      <Route
          path="/"
          element={
            isAuth ? (
              user.role === "farmer" ? (
                <Navigate to="/farmer" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Home />
            )
          }
        />
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
        <Route
          path="/consumer"
          element={
            isAuth && user.role === "customer" ? (
              <Consumer />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuth ? (
              user.role === "farmer" ? (
                <Navigate to="/farmer" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Register />
            )
          }
        />
        
        <Route path="/verify/:token" element={<Verify />} />
        <Route
          path="/forgot"
          element={
            isAuth ? (
              user.role === "farmer" ? (
                <Navigate to="/farmer" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Forgot />
            )
          }
        />
        <Route path="/reset-password/:token" element={<Reset />} />
        
        <Route path="/mylistings" element={isAuth && user.role==="farmer"? <MyListings user={user} />:<Home/>} />
        <Route path="/addproduct" element={isAuth && user.role==="farmer"? <AddProduct />:<Home/>} />
        <Route path="/cart" element={isAuth && user.role==="customer"? <CartPage/>:<Home/>}/>
        <Route path="/past-orders" element={isAuth && user.role==="customer"? <OrderPage/>:<Home/>}/>
        <Route path="/order" element={<OrderDetails/>}/>
        <Route path="/routemap" element={<OrderList/>}/>
        <Route path="/model" element={<Model/>}/>
        <Route path="/verify-farmer" element={<AdminDashboard />} />
      </Routes>
      
    </>
  );
};

export default App;
