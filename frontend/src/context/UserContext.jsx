import axios from "axios";
import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";
import toast  from 'react-hot-toast';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    
  
    // Function to handle user login
    async function loginUser(email, password,role, navigate) {
      setBtnLoading(true);
      try {
        const Role=role;
        const { data } = await axios.post("/api/user/login", { email, password,role });
        toast.success(data.message);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        if(Role==="farmer"){
          navigate("/farmer");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setBtnLoading(false);
      }
    } 

    async function registerUser(name, email, mobile, password, role ,navigate) {
      setBtnLoading(true);
      try {
        const {data} = await axios.post("/api/user/register", {name, email, mobile, password, role });
        toast.success(data.message);
        const token=data.token;
      setBtnLoading(false);
      navigate("/verify/"+token);
      
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
    }

    async function verifyUser(otp,token,navigate) {
      setBtnLoading(true);
      try {
        const {data} = await axios.post("/api/user/verifyOtp/"+token, {otp,token});
        toast.success(data.message);
        setUser(data.user);
        setIsAuth(true);
        setBtnLoading(false);
        navigate("/");
      
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
    }

    async function forgotUser(email,navigate) {
      setBtnLoading(true);
      try {
        const {data} = await axios.post("/api/user/forget", {email});
        toast.success(data.message);
        setBtnLoading(false);
        const token =data.token;
        navigate("/reset-password/"+token);
      
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
    }

    async function resetUser(token,otp,password,navigate) {
      setBtnLoading(true);
      try {
        const {data} = await axios.post("/api/user/reset-password/"+token, {otp,password});
        toast.success(data.message);
        setBtnLoading(false);
        navigate("/login");
      
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
    }
  
  
    const [loading, setLoading] = useState(true)
  async function fetchUser() {
    try {
      const {data} = await axios.get("/api/user/me");
    setUser(data);
    setIsAuth(true);
    setLoading(false);
      
    } catch (error) {
      console.log(error)  ;
      setLoading(false);
      
    }
    
  }

  useEffect(()=>{
    fetchUser();
  },[]);
    // Return the context provider with value
    return (
      <UserContext.Provider
        value={{
          loginUser,
          btnLoading,
          isAuth,
          user,
          loading,
          setIsAuth,
          setUser,
          registerUser,
          verifyUser,
          forgotUser,
          resetUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  // Custom hook to access the context
  export const UserData = () => useContext(UserContext);