import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCreditCard, FaMoneyBillWave, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import { PAYMENT_METHOD_COD, PAYMENT_METHOD_RAZORPAY } from '../constants';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // Redirect to shipping if no address is found
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  // State to store the selected payment method
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD_COD);
  const dispatch = useDispatch();

  // Handle form submission and navigate to place order page
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 step3 />

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <FaCreditCard className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Payment Method
            </h1>
            <p className="text-gray-600">
              Choose how you'd like to pay for your order
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Cash on Delivery Option */}
            <div
              onClick={() => setPaymentMethod(PAYMENT_METHOD_COD)}
              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === PAYMENT_METHOD_COD
                  ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              {/* Selected Indicator */}
              {paymentMethod === PAYMENT_METHOD_COD && (
                <div className="absolute top-4 right-4">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === PAYMENT_METHOD_COD
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  <FaMoneyBillWave className={`text-2xl ${
                    paymentMethod === PAYMENT_METHOD_COD
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value={PAYMENT_METHOD_COD}
                      checked={paymentMethod === PAYMENT_METHOD_COD}
                      onChange={() => setPaymentMethod(PAYMENT_METHOD_COD)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="cod" className="text-lg font-bold text-gray-900 cursor-pointer">
                      Cash on Delivery
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Pay with cash when your order is delivered to your doorstep
                  </p>
                  
                  {/* Features */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>No advance payment required</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>Inspect products before paying</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Payment Option */}
            <div
              onClick={() => setPaymentMethod(PAYMENT_METHOD_RAZORPAY)}
              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                paymentMethod === PAYMENT_METHOD_RAZORPAY
                  ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              {/* Selected Indicator */}
              {paymentMethod === PAYMENT_METHOD_RAZORPAY && (
                <div className="absolute top-4 right-4">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                  paymentMethod === PAYMENT_METHOD_RAZORPAY
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  <FaCreditCard className={`text-2xl ${
                    paymentMethod === PAYMENT_METHOD_RAZORPAY
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value={PAYMENT_METHOD_RAZORPAY}
                      checked={paymentMethod === PAYMENT_METHOD_RAZORPAY}
                      onChange={() => setPaymentMethod(PAYMENT_METHOD_RAZORPAY)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor="online" className="text-lg font-bold text-gray-900 cursor-pointer">
                      Online Payment
                    </label>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      SECURE
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Pay securely using Credit Card, Debit Card, UPI, or Net Banking
                  </p>

                  {/* Payment Icons */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img src="https://cdn.razorpay.com/static/assets/logo/payment.svg" alt="Payment methods" className="h-6" />
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>Instant payment confirmation</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>100% secure and encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-50 rounded-lg">
              <FaShieldAlt className="text-green-600 text-xl" />
              <span className="text-sm text-gray-700">
                Your payment information is secure and encrypted
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50"
            >
              Continue to Review Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
