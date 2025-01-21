import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { Loading } from "./components/Loading";
import Verify from "./pages/Verify";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Newpage from "./pages/Newpage";
import FarmerHome from "./pages/FarmerHome";

const App = () => {
  const {user,loading,isAuth} =UserData();
  return (
    <>
     {
      loading?<Loading/>:<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={isAuth ?<Home/> :<Login />} />
        <Route path="/register" element={isAuth ?<Home/>:<Register/>} />
        <Route path="/newpage" element={<Newpage/>} />
        <Route path="/verify/:token" element={isAuth?<Home/>:<Verify/>}   />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/reset-password/:token" element={<Reset/>} />
        <Route path="/farmer" element={ <FarmerHome/>}/>
      </Routes>
    </BrowserRouter>
     }
    </>
  )
}

export default App
