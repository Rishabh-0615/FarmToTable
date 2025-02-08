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
import ConsumerNavbar from "./pages/ConsumerNavbar"; 

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

import AdminLogin from "./pages/AdminLogin";
import UserOrdersPage from "./components/RouteMap";
import OrderList from "./components/RouteMap";

import Delivery from "./pages/Delivery";
import DeliveryNavbar from "./components/Delivery-Navbar";
import FarmerOrders from "./pages/FarmerOrders";

import VerifyFarmer from "./pages/VerifyFarmer";
import VerifyDelivery from "./pages/Delivery-verify";
import AdminDashboard from "./pages/NewAdmin";
import DeliveryBoyDashboard from "./pages/newDelivery";

const App = () => {
  const { user, loading, isAuth,isAuthAdmin } = UserData();
  console.log(isAuthAdmin);
  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <AppWithLocation user={user} isAuth={isAuth} isAuthAdmin={isAuthAdmin} />
    </BrowserRouter>
  );
};

const AppWithLocation = ({ user, isAuth ,isAuthAdmin}) => {
  const location = useLocation();

  // Determine which navbar to display
  const showFarmerNavbar = isAuth && user.role === "farmer";
  const showConsumerNavbar = isAuth && user.role === "customer";
  const showDeliveryNavbar = isAuth && user.role === "delivery boy";

  return (
    <>
      {/* Conditionally render navbar */}
      {showFarmerNavbar ? (
        <FarmerNavbar />
      ) : showConsumerNavbar ? (
        <ConsumerNavbar />
      ) : showDeliveryNavbar ? (
        <DeliveryNavbar />
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
              ) : user.role === "delivery boy" ? (
                <Navigate to="/delivery" />
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
              ) : user.role === "delivery boy" ? (
                <Navigate to="/delivery" />
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
          element={isAuth && user.role === "farmer" ? <FarmerHome /> : <Navigate to="/" />}
        />
        <Route
          path="/consumer"
          element={isAuth && user.role === "customer" ? <Consumer /> : <Navigate to="/" />}
        />
        <Route
          path="/delivery"
          element={isAuth && user.role === "delivery boy" ? <Delivery /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<Reset />} />
        <Route path="/mylistings" element={isAuth && user.role === "farmer" ? <MyListings user={user} /> : <Home />} />
        <Route path="/addproduct" element={isAuth && user.role === "farmer" ? <AddProduct /> : <Home />} />
        <Route path="/cart" element={isAuth && user.role === "customer" ? <CartPage /> : <Home />} />
        <Route path="/past-orders" element={isAuth && user.role === "customer" ? <OrderPage /> : <Home />} />
        <Route path="/order" element={<OrderDetails />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/model" element={<Model />} />
        <Route path="/admin-login" element={ <AdminLogin/> } />
        
        <Route path="/farmerorder" element={<FarmerOrders />} />
        <Route path="/verify" element={<VerifyFarmer />} />
        <Route path="/verify-delivery" element={<VerifyDelivery />} />
        <Route path="/admin" element={isAuthAdmin?<AdminDashboard />:<AdminLogin/>} />
        <Route path="/newdelivery" element={<DeliveryBoyDashboard />} />
        

      </Routes>
    </>
  );
};

export default App;
