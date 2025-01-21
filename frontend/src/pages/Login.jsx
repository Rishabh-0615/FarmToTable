import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FarmLoadingAnimation } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, role, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gray-100">
      {/* Animated Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-green-800 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Login Form */}
      <motion.div
        className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-xl shadow-2xl z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
              required
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            
          <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option  value="" disabled selected>Role</option>
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
              <option value="delivery boy">Delivery Boy</option>
            </select>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={btnLoading}
          >
            {btnLoading ? <FarmLoadingAnimation /> : "Login"}
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <a href="/forgot" className="text-green-600 hover:underline">
            Forgot Password?
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
