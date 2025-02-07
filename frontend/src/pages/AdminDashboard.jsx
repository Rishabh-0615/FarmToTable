import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        console.log("Fetching farmers...");
        const res = await axios.get("/api/admin/verify-farmer", { withCredentials: true });

        // If the response is successful, set the farmers' data
        setFarmers(res.data.farmers);

      } catch (err) {
        // Handle errors based on the status
        if (err.response) {
          if (err.response.status === 401) {
            toast.error("Unauthorized access");
            navigate("/admin-login"); // Redirect to login if unauthorized
          } else if (err.response.status === 403) {
            toast.error("Access denied. Redirecting...");
            navigate("/admin-login"); // Redirect to login if access is denied
          } else {
            setError("Failed to load farmers.");
          }
        } else {
          setError("Failed to connect to server.");
        }
        console.error("Error fetching farmers:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFarmers();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.get("/api/admin/logout", { withCredentials: true });
      toast.success("Logged out successfully.");
      navigate("/admin-login"); // Redirect to login on logout
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out.");
    }
  };

  const verifyFarmer = async (farmerId) => {
    try {
      await axios.put(`/api/admin/verify-farmer/${farmerId}`, {}, { withCredentials: true });
      setFarmers(farmers.filter((farmer) => farmer._id !== farmerId));
      toast.success("Farmer approved successfully.");
    } catch (err) {
      console.error("Error verifying farmer:", err);
      toast.error("Failed to verify farmer.");
    }
  };

  if (loading) return <h1 className="text-center text-lg font-bold">Loading...</h1>;
  if (error) return <h1 className="text-center text-lg font-bold text-red-500">{error}</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 relative">
      {/* Logout Button at Top Right */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard - Verify Farmers</h1>

      {farmers.length === 0 ? (
        <p className="text-center text-gray-600">No farmers waiting for approval.</p>
      ) : (
        <ul className="space-y-4">
          {farmers.map((farmer) => (
            <li key={farmer._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="font-medium">{farmer.name} - {farmer.email}</span>
              <button
                onClick={() => verifyFarmer(farmer._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
