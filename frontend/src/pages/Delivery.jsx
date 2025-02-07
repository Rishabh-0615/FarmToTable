import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';

const Delivery = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('/api/user/deliveries/getPendingDeliveries');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    }
  };

  const acceptDelivery = async (orderId) => {
    try {
      const response = await axios.post('/api/user/deliveries/assign', { orderId });
      alert(response.data.message);
      fetchPendingOrders();
    } catch (error) {
      console.error('Error accepting delivery:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pending Orders</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
              <p className="text-gray-600">Customer: {order.userId?.name || 'N/A'}</p>
              <p className="text-gray-600">Contact: {order.userId?.mobile || 'N/A'}</p>
              <p className="text-gray-600">
                <MapPin size={16} className="inline mr-2" /> Location: {order.location.address}
              </p>
              <button
                onClick={() => acceptDelivery(order._id)}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No pending orders available at the moment.</p>
      )}
    </div>
  );
};

export default Delivery;
