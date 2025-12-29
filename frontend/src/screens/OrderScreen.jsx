import { useState } from 'react'; 
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaMapMarkerAlt, 
  FaCreditCard, 
  FaShoppingBag, 
  FaTruck, 
  FaPhone, 
  FaEnvelope, 
  FaCalendar,
  FaMoneyBillWave,
  FaArrowLeft,
  FaReceipt
} from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import AdminUpdateOrderStepsScreen from './admin/UpdateOrderStepsScreen';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [loadingPayOnline, setLoadingPayOnline] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (response, razorpayOrderId) => {
    try {
      const verifyResponse = await verifyPayment({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderId: orderId,
      }).unwrap();

      if (verifyResponse.success) {
        refetch();
        toast.success('Payment successful, order is now paid.');
      } else {
        toast.error('Payment verification failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment verification failed.');
    }
    setLoadingPayOnline(false);
  };

  const handleRazorpayPayment = async () => {
    setLoadingPayOnline(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay SDK. Please try again later.');
      setLoadingPayOnline(false);
      return;
    }

    try {
      const razorpayOrder = await createRazorpayOrder({
        amount: order.totalPrice * 100,
      }).unwrap();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: 'INR',
        name: 'EcoMart',
        description: 'Pay for your order',
        order_id: razorpayOrder.id,
        handler: (response) => handlePaymentSuccess(response, razorpayOrder.id),
        prefill: {
          name: order.user.name,
          email: order.user.email,
        },
        theme: {
          color: '#10b981',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('An error occurred while processing your payment.');
      setLoadingPayOnline(false);
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
    toast.success('Order marked as delivered');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">{error?.data?.message || 'Unable to load order details'}</p>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft />
            <span>Back to My Orders</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Order Details
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <FaReceipt className="text-green-600" />
                Order ID: <span className="font-mono font-semibold">#{order._id.slice(-8)}</span>
              </p>
            </div>
            
            {/* Order Status Badge */}
            <div className="flex flex-col gap-2">
              {order.isPaid ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  <FaCheckCircle />
                  <span>Paid</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold">
                  <FaTimesCircle />
                  <span>Payment Pending</span>
                </div>
              )}
              {order.isDelivered ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  <FaTruck />
                  <span>Delivered</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                  <FaTruck />
                  <span>In Transit</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="ml-15 space-y-3">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold text-gray-900">{order.user.name}</p>
                    <a href={`mailto:${order.user.email}`} className="text-green-600 hover:text-green-700 text-sm">
                      {order.user.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-semibold text-gray-900">{order.shippingAddress.address}</p>
                    <p className="text-gray-700">
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-700">{order.shippingAddress.country}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaPhone className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-semibold text-gray-900">{order.shippingAddress.contactNumber}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  {order.isDelivered ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaCheckCircle />
                      <span className="font-semibold">
                        Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <FaTruck />
                      <span className="font-semibold">Order in transit</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
              </div>
              
              <div className="ml-15 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    {order.paymentMethod === 'Cash on Delivery' ? (
                      <><FaMoneyBillWave className="text-green-600" /> Cash on Delivery</>
                    ) : (
                      <><FaCreditCard className="text-green-600" /> Online Payment (Razorpay)</>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  {order.isPaid ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <FaCheckCircle />
                      <span className="font-semibold">
                        Paid on {new Date(order.paidAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <FaTimesCircle />
                      <span className="font-semibold">Payment pending</span>
                    </div>
                  )}
                </div>

                {/* Razorpay Details */}
                {order.razorpay && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Transaction Details</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">Payment ID: <span className="font-mono">{order.razorpay.paymentId}</span></p>
                      <p className="text-gray-600">Order ID: <span className="font-mono">{order.razorpay.orderId}</span></p>
                      <p className="text-gray-600">Status: <span className="font-semibold text-green-600">{order.razorpay.verified ? 'Verified' : 'Pending'}</span></p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaShoppingBag className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order Items ({order.orderItems.length})</h2>
              </div>
              
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.product}`} 
                          className="font-semibold text-gray-900 hover:text-green-600 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantity: {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          ₹{item.price} × {item.qty}
                        </p>
                        <p className="font-bold text-gray-900">
                          ₹{(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Timeline */}
            {order.timestamps && (
              <div className="bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCalendar className="text-green-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Timeline</h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    { key: 'confirmed', label: 'Order Confirmed', icon: '✓' },
                    { key: 'placed', label: 'Order Placed', icon: '📦' },
                    { key: 'shipped', label: 'Shipped', icon: '🚚' },
                    { key: 'outForDelivery', label: 'Out for Delivery', icon: '🛵' },
                    { key: 'delivered', label: 'Delivered', icon: '✨' }
                  ].map((step, index) => {
                    const timestamp = order.timestamps[step.key];
                    return (
                      <div key={step.key} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          timestamp ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${timestamp ? 'text-green-600' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {timestamp 
                              ? new Date(timestamp).toLocaleString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'Pending'
                            }
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({order.orderItems.length})</span>
                  <span className="font-semibold">₹{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{order.shippingPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST)</span>
                  <span className="font-semibold">₹{order.taxPrice}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* Pay Online for COD */}
                {!order.isPaid && order.paymentMethod === 'Cash on Delivery' && (
                  <button
                    onClick={handleRazorpayPayment}
                    disabled={loadingPayOnline}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingPayOnline ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <FaCreditCard />
                        Pay Online Now
                      </>
                    )}
                  </button>
                )}

                {/* Track Order */}
                {!order.isDelivered && (
                  <Link
                    to={`/order/${orderId}/track`}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaTruck />
                    Track Order
                  </Link>
                )}

                {/* Admin Actions */}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <button
                    onClick={deliverHandler}
                    disabled={loadingDeliver}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingDeliver ? (
                      <>Updating...</>
                    ) : (
                      <>
                        <FaCheckCircle />
                        Mark as Delivered
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Order Management */}
        {userInfo && userInfo.isAdmin && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin: Update Order Status</h2>
            <AdminUpdateOrderStepsScreen />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderScreen;
