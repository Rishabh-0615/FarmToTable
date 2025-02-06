import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Wallet,
  Smartphone,
  ArrowRight,
  Loader2,
  Shield,
  X,
  Info,
  Truck
} from 'lucide-react';

const PaymentStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

const DeliveryStatus = {
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/customer/order');
      setOrder(response.data.order);
      console.log(response.data.order);
      setError(null);
    } catch (err) {
      console.error('Order fetch error:', err);
      setError(err.response?.data?.error || 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const simulatePayment = async () => {
    if (!order || !paymentMethod) {
      setPaymentError('Please select a payment method');
      return;
    }

    try {
      setProcessingPayment(true);
      setPaymentError(null);
      
      await axios.patch(`/api/user/customer/payment/status/${order._id}`, {
        paymentStatus: PaymentStatus.PROCESSING,
        paymentMethod
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() < 0.9;
      
      const finalStatus = success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;
      await axios.patch(`/api/user/customer/payment/status/${order._id}`, {
        paymentStatus: finalStatus,
        paymentMethod
      });

      if (success) {
        setShowPaymentModal(false);
        await fetchOrderDetails();
      } else {
        setPaymentError('Payment was declined. Please try again or use a different payment method.');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setPaymentError(
        err.response?.data?.error || 
        'Payment processing failed. Please check your connection and try again.'
      );
    } finally {
      setProcessingPayment(false);
    }
  };

  const PaymentStatusBadge = () => {
    const statusConfig = {
      [PaymentStatus.PENDING]: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="w-4 h-4 mr-2" />
      },
      [PaymentStatus.PROCESSING]: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      },
      [PaymentStatus.COMPLETED]: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-4 h-4 mr-2" />
      },
      [PaymentStatus.FAILED]: {
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle className="w-4 h-4 mr-2" />
      }
    };

    return (
      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        statusConfig[order.paymentStatus].color
      }`}>
        {statusConfig[order.paymentStatus].icon}
        {order.paymentStatus}
      </span>
    );
  };

  const DeliveryStatusBadge = () => {
    const statusConfig = {
      [DeliveryStatus.PROCESSING]: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Package className="w-4 h-4 mr-2" />
      },
      [DeliveryStatus.SHIPPED]: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Truck className="w-4 h-4 mr-2" />
      },
      [DeliveryStatus.OUT_FOR_DELIVERY]: {
        color: 'bg-orange-100 text-orange-800',
        icon: <Truck className="w-4 h-4 mr-2 animate-bounce" />
      },
      [DeliveryStatus.DELIVERED]: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-4 h-4 mr-2" />
      },
      [DeliveryStatus.CANCELLED]: {
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle className="w-4 h-4 mr-2" />
      }
    };

    return (
      <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        statusConfig[order.deliveryStatus].color
      }`}>
        {statusConfig[order.deliveryStatus].icon}
        {order.deliveryStatus.replace('_', ' ')}
      </span>
    );
  };

  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Complete Payment</h2>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setPaymentError(null);
                setPaymentMethod(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount to Pay</span>
              <span className="text-xl font-bold">₹{order.totalPrice}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-500'
                }`}
              >
                <CreditCard className={`w-6 h-6 mb-2 mx-auto ${
                  paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-500'
                }`} />
                <div className="text-sm font-medium text-center">Card</div>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'upi' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-500'
                }`}
              >
                <Smartphone className={`w-6 h-6 mb-2 mx-auto ${
                  paymentMethod === 'upi' ? 'text-blue-500' : 'text-gray-500'
                }`} />
                <div className="text-sm font-medium text-center">UPI</div>
              </button>
            </div>
          </div>

          {paymentError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {paymentError}
            </div>
          )}

          <button
            onClick={simulatePayment}
            disabled={!paymentMethod || processingPayment}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium ${
              !paymentMethod || processingPayment
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {processingPayment ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Pay Securely
              </>
            )}
          </button>

          <div className="mt-4 text-sm text-gray-500 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            This is a simulated payment for demonstration
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-6">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p>No recent orders found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="mr-3 text-blue-500" />
            Order Details
          </h1>
          <div className="flex items-center space-x-2">
            <PaymentStatusBadge />
            <DeliveryStatusBadge />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="font-semibold flex items-center">
              <MapPin className="mr-2 text-red-500" /> 
              Delivery Location
            </h2>
            <p>{order.location.address}</p>
          </div>
          <div>
            <h2 className="font-semibold flex items-center">
              <Clock className="mr-2 text-yellow-500" /> 
              Order Date
            </h2>
            <p>{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold mb-4 flex items-center">
            <Wallet className="mr-2 text-blue-500" /> 
            Order Breakdown
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

        {order.paymentStatus === PaymentStatus.PENDING && (
          <div className="mt-6">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center hover:bg-blue-600"
            >
              <CreditCard className="mr-2" />
              Proceed to Payment
              <ArrowRight className="ml-2" />
            </button>
          </div>
        )}

        <PaymentModal />
      </div>
    </div>
  );
};

export default OrderDetails;