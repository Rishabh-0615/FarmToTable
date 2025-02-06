import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        console.log("Fetching farmers...");
        const res = await axios.get("/api/admin/verify-farmer");
        setFarmers(res.data.farmers);
      } catch (err) {
        setError("Failed to load farmers.");
        console.error("Error fetching farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) return <h1 className="text-center text-lg font-bold">Loading...</h1>;
  if (error) return <h1 className="text-center text-lg font-bold text-red-500">{error}</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
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

  async function verifyFarmer(farmerId) {
    try {
      await axios.put(`/api/admin/verify-farmer/${farmerId}`);
      setFarmers(farmers.filter(farmer => farmer._id !== farmerId));
    } catch (err) {
      console.error("Error verifying farmer:", err);
      setError("Failed to verify farmer.");
    }
  }
};

export default AdminDashboard;
