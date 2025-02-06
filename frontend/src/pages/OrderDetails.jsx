import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/customer/order');
      setOrder(response.data.order);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch order details');
      toast.error('Unable to retrieve order information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Package className="animate-pulse text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-6">
        <p>No recent orders found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="mr-3 text-blue-500" />
            Order Details
          </h1>
          <span className="text-green-600 font-semibold flex items-center">
            <CheckCircle className="mr-2" /> Confirmed
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="font-semibold flex items-center">
              <MapPin className="mr-2 text-red-500" /> Delivery Location
            </h2>
            <p>{order.location.address}</p>
          </div>
          <div>
            <h2 className="font-semibold flex items-center">
              <Clock className="mr-2 text-yellow-500" /> Order Date
            </h2>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2 text-blue-500" /> Order Breakdown
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Fee</span>
              <span>₹{order.subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Order Items</h2>
          {order.cartItems.map((item) => (
            <div 
              key={item.productId._id} 
              className="flex items-center border-b py-3 last:border-b-0"
            >
              {item.productId.image?.url && (
                <img 
                  src={item.productId.image.url} 
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
              )}
              <div className="flex-grow">
                <h3 className="font-medium">{item.productId.name}</h3>
                <p className="text-gray-600">
                  ₹{item.productId.price} × {item.quantity}
                </p>
              </div>
              <div className="font-semibold">
                ₹{item.productId.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;