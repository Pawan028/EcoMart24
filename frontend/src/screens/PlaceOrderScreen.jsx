import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaEdit, FaCheckCircle } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { clearCartItems } from '../slices/cartSlice';
import { useCreateOrderMutation, useCreateRazorpayOrderMutation, useVerifyPaymentMutation } from '../slices/ordersApiSlice';
import { PAYMENT_METHOD_COD, PAYMENT_METHOD_RAZORPAY } from '../constants';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (response, razorpayOrderId, orderId) => {
    try {
      const verifyResponse = await verifyPayment({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderId: orderId,
      }).unwrap();

      if (verifyResponse.success) {
        dispatch(clearCartItems());
        navigate(`/order/${verifyResponse.order._id}`);
        toast.success('Order placed successfully!');
      } else {
        toast.error('Payment verification failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment verification failed');
      console.error('Payment verification error:', error);
    }
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay SDK. Please try again later.');
      setLoading(false);
      return;
    }

    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: PAYMENT_METHOD_RAZORPAY,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPaid: false,
      }).unwrap();

      const razorpayOrder = await createRazorpayOrder({
        amount: cart.totalPrice * 100,
      }).unwrap();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: 'INR',
        name: 'EcoMart',
        description: 'Thank you for your order!',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          await handlePaymentSuccess(response, razorpayOrder.id, order._id);
          setLoading(false);
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
        },
        theme: {
          color: '#10b981',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('An error occurred while processing your payment');
      console.error('Razorpay payment error:', error);
      setLoading(false);
    }
  };

  const handleCODPayment = async () => {
    setLoading(true);
    try {
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: PAYMENT_METHOD_COD,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPaid: false,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${order._id}`);
      toast.success('Order placed successfully!');
      setLoading(false);
    } catch (err) {
      toast.error('Error placing COD order');
      console.error('COD order error:', err);
      setLoading(false);
    }
  };

  const placeOrderHandler = async () => {
    if (paymentMethod === PAYMENT_METHOD_RAZORPAY) {
      await handleRazorpayPayment();
    } else if (paymentMethod === PAYMENT_METHOD_COD) {
      await handleCODPayment();
    } else {
      toast.error('Invalid payment method');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      {loading || isCreatingOrder ? <Loader /> : null}
      
      <div className="max-w-6xl mx-auto">
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 step3 step4 />

        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Review Your Order
          </h1>
          <p className="text-gray-600">
            Almost there! Please review your order before confirming
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                </div>
                <Link
                  to="/shipping"
                  className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-sm font-medium"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
              </div>
              <div className="ml-13 space-y-1 text-gray-700">
                <p className="font-medium">{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                <p>{shippingAddress.country}</p>
                <p className="text-sm text-gray-600 mt-2">
                  📞 {shippingAddress.contactNumber}
                </p>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCreditCard className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <Link
                  to="/payment"
                  className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-sm font-medium"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
              </div>
              <div className="ml-13">
                <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold inline-block">
                  {paymentMethod === PAYMENT_METHOD_COD ? '💵 Cash on Delivery' : '💳 Online Payment (Razorpay)'}
                </span>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Items ({cartItems.length})
                  </h2>
                </div>
                <Link
                  to="/cart"
                  className="text-green-600 hover:text-green-700 flex items-center space-x-1 text-sm font-medium"
                >
                  <FaEdit />
                  <span>Edit</span>
                </Link>
              </div>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item._id}`}
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
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 animate-fadeIn">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cartItems.length})</span>
                  <span className="font-semibold">₹{cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">₹{cart.shippingPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST)</span>
                  <span className="font-semibold">₹{cart.taxPrice}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">₹{cart.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="button"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0 || loading || isCreatingOrder}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  cartItems.length === 0 || loading || isCreatingOrder
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/50'
                }`}
              >
                {loading || isCreatingOrder ? 'Processing...' : 'Place Order'}
              </button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                <FaCheckCircle className="text-green-500" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
