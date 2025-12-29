import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaMailBulk, FaPhone, FaMapPin } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [state, setState] = useState(shippingAddress.state || '');
  const [pincode, setPincode] = useState(shippingAddress.pincode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'India');
  const [contactNumber, setContactNumber] = useState(shippingAddress.contactNumber || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateContactNumber = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const validatePincode = (pin) => {
    const regex = /^\d{6}$/;
    return regex.test(pin);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateContactNumber(contactNumber)) {
      toast.error('Please enter a valid 10-digit Indian mobile number', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    if (!validatePincode(pincode)) {
      toast.error('Please enter a valid 6-digit pincode', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    dispatch(saveShippingAddress({ address, city, state, pincode, country, contactNumber }));
    toast.success('Shipping details saved!', {
      position: 'top-center',
      autoClose: 2000,
    });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Checkout Steps */}
        <CheckoutSteps step1 step2 />

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Shipping Details
            </h1>
            <p className="text-gray-600">
              Where should we deliver your fresh groceries?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  placeholder="House No., Building Name, Street"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                />
              </div>
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaCity className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter state"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Pincode and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaMailBulk className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="pincode"
                    placeholder="6-digit pincode"
                    value={pincode}
                    required
                    maxLength="6"
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaGlobeAmericas className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="country"
                    placeholder="Country"
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="contactNumber"
                  placeholder="10-digit mobile number"
                  value={contactNumber}
                  required
                  maxLength="10"
                  onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                We'll call you if there are any delivery updates
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-green-500/50"
            >
              Continue to Payment
            </button>

            {/* Help Text */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Your information is secure and will only be used for delivery purposes
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
