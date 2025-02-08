import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Package, User as UserIcon, Check, AlertCircle, X } from 'lucide-react';

const AdminDashboard = () => {
  const [unassignedOrders, setUnassignedOrders] = useState([]);
  const [availableDeliveryBoys, setAvailableDeliveryBoys] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      };

      const [ordersResponse, deliveryBoysResponse] = await Promise.all([
        fetch('/api/new/unassigned-orders', { headers }),
        fetch('/api/new/available-delivery-boys', { headers })
      ]);

      if (!ordersResponse.ok || !deliveryBoysResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [orders, deliveryBoys] = await Promise.all([
        ordersResponse.json(),
        deliveryBoysResponse.json()
      ]);

      setUnassignedOrders(Array.isArray(orders) ? orders : []);
      setAvailableDeliveryBoys(Array.isArray(deliveryBoys) ? deliveryBoys : []);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignOrder = async (orderId, deliveryBoyId) => {
    if (!orderId || !deliveryBoyId) {
      setError('Invalid order or delivery boy selection');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/new/assign-order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          deliveryBoyId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to assign order');
      }

      await fetchData();
      setSelectedOrder(null);
    } catch (err) {
      setError(err.message || 'Failed to assign order');
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveryBoys = selectedOrder
    ? availableDeliveryBoys.filter(boy => boy.location?.city?.toLowerCase() === selectedOrder.location?.city?.toLowerCase())
    : [];

  if (loading && !unassignedOrders.length) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold flex items-center">
        <Truck className="mr-2" /> Admin Dashboard
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}

      <div className="border rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Package className="mr-2" size={20} />
          <h2 className="text-xl font-semibold">
            Unassigned Orders ({unassignedOrders?.length || 0})
          </h2>
        </div>
        <div className="overflow-x-auto">
          {unassignedOrders?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Order ID</th>
                  <th className="py-2 text-left">Location</th>
                  <th className="py-2 text-left">City</th>
                  <th className="py-2 text-left">Total Price</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {unassignedOrders.map(order => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2">{order._id}</td>
                    <td className="py-2">{order.location?.address}</td>
                    <td className="py-2">{order.location?.city}</td>
                    <td className="py-2">${order.totalPrice}</td>
                    <td className="py-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        <Truck className="mr-1" size={16} /> Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No unassigned orders available
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <UserIcon className="mr-2" size={20} />
              <h2 className="text-xl font-semibold">
                Available Delivery Boys - {selectedOrder.location?.city}
              </h2>
            </div>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          {filteredDeliveryBoys.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No delivery boys available in {selectedOrder.location?.city}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Name</th>
                    <th className="py-2 text-left">City</th>
                    <th className="py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliveryBoys.map(boy => (
                    <tr key={boy._id} className="border-b">
                      <td className="py-2">{boy.name}</td>
                      <td className="py-2">{boy.location?.city}</td>
                      <td className="py-2">
                        <button 
                          onClick={() => handleAssignOrder(selectedOrder._id, boy._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          <Check className="mr-1" size={16} /> Assign Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
