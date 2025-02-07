import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Package,
  MapPin,
  Truck,
  Users,
  ListChecks,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  PhoneCall
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCities();
    fetchDeliveryBoys();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchOrdersByCity();
    }
  }, [selectedCity]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('/api/admin/cities');
      setCities(response.data.cities);
    } catch (err) {
      setError('Failed to fetch cities');
    }
  };

  const fetchOrdersByCity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/orders?city=${selectedCity}`);
      setOrders(response.data.orders);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryBoys = async () => {
    try {
      const response = await axios.get('/api/admin/delivery-boys');
      setDeliveryBoys(response.data.deliveryBoys);
    } catch (err) {
      setError('Failed to fetch delivery boys');
    }
  };

  const assignDelivery = async (orderId, deliveryBoyId) => {
    if (!deliveryBoyId) {
      setError('Please select a delivery boy');
      return;
    }

    // Debugging Log for Order and Delivery Boy IDs
    console.log('Assigning Delivery:', { orderId, deliveryBoyId });

    if (!/^[a-fA-F0-9]{24}$/.test(orderId) || !/^[a-fA-F0-9]{24}$/.test(deliveryBoyId)) {
      setError('Invalid ObjectId format. Ensure proper IDs are assigned.');
      return;
    }

    try {
      const response = await axios.post('/api/admin/assign-delivery', { orderId, deliveryBoyId });
      console.log('Delivery Assigned Successfully:', response.data);
      fetchOrdersByCity();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to assign delivery');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <Package className="mr-3" /> Admin Dashboard
          </h1>

          {/* City Selector */}
          <div className="mb-6 flex items-center">
            <Filter className="mr-3 text-gray-600" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Orders Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b flex items-center">
                <ListChecks className="mr-3" />
                <h2 className="text-xl font-semibold">Orders</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p>No orders found</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-bold">Order #{order._id}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              order.deliveryStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                              order.deliveryStatus === 'OUT_FOR_DELIVERY' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.deliveryStatus}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="flex items-center">
                              <Users className="mr-2 w-4 h-4" /> {order.userId?.name || 'N/A'}
                            </p>
                            <p className="flex items-center">
                              <MapPin className="mr-2 w-4 h-4" /> {order.location?.address || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="flex items-center">
                              <Calendar className="mr-2 w-4 h-4" /> {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <p className="flex items-center font-semibold">
                              <Truck className="mr-2 w-4 h-4" /> ₹{order.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <select
                            onChange={(e) => {
                              const selectedDeliveryBoyId = e.target.value;
                              if (selectedDeliveryBoyId) {
                                assignDelivery(order._id, selectedDeliveryBoyId);
                              }
                            }}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Assign Delivery Boy</option>
                            {deliveryBoys.map((boy) => (
                              <option key={boy._id} value={boy._id}>
                                {boy.name} - {boy.phone || 'N/A'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Boys Section */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b flex items-center">
                <Truck className="mr-3" />
                <h2 className="text-xl font-semibold">Delivery Boys</h2>
              </div>
              <div className="p-4">
                {deliveryBoys.map((boy) => (
                  <div key={boy._id} className="border p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{boy.name}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          boy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {boy.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="flex items-center">
                        <PhoneCall className="mr-2 w-4 h-4" /> {boy.phone || 'N/A'}
                      </p>
                      <p className="flex items-center">
                        <Clock className="mr-2 w-4 h-4" /> Orders Today: {boy.todayOrders || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Error Handling */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 flex items-center">
              <AlertCircle className="mr-3" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
