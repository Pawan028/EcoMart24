import React, { useState, useEffect, forwardRef } from 'react';
import { useCheckLocationMutation } from '../slices/apiSlice';
import { FaMapMarkerAlt, FaCity, FaMapPin, FaTimes, FaCheckCircle, FaTimesCircle, FaTruck, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LocationCard = forwardRef(({ setShowCard }, ref) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [checkLocation, { data, error, isLoading }] = useCheckLocationMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    try {
      const result = await checkLocation(pincode).unwrap();
      localStorage.setItem('location', JSON.stringify({ city, state, pincode }));
      setHasChecked(true);
      
      if (result.available) {
        toast.success('Great! We deliver to your area');
      } else {
        toast.info('Currently not available in your area. We\'re expanding soon!');
      }
    } catch (err) {
      console.error('Failed to check location:', err);
      toast.error('Failed to check location. Please try again.');
    }
  };

  const handleClose = () => {
    if (hasChecked && data?.available) {
      toast.success('Location saved successfully!');
    }
    setShowCard(false);
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      const location = JSON.parse(savedLocation);
      setCity(location.city || '');
      setState(location.state || '');
      setPincode(location.pincode || '');
    }
  }, []);

  return (
    <div
      className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
      ref={ref}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <FaTimes />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FaMapMarkerAlt className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Delivery Location</h2>
            <p className="text-green-100 text-sm">Check if we deliver to your area</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submitHandler} className="p-6 space-y-4">
        {/* City Input */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
            City
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaCity className="text-gray-400" />
            </div>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Enter your city"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200"
            />
          </div>
        </div>

        {/* State Input */}
        <div>
          <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
            State
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Enter your state"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Pincode Input */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
            Pincode
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              id="pincode"
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPincode(value);
              }}
              required
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors duration-200"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Enter a 6-digit Indian pincode</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Checking...
            </>
          ) : (
            <>
              <FaTruck />
              Check Delivery Availability
            </>
          )}
        </button>
      </form>

      {/* Result Display */}
      {hasChecked && data && (
        <div className={`mx-6 mb-6 p-4 rounded-lg ${data.available ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
          <div className="flex items-start gap-3">
            {data.available ? (
              <FaCheckCircle className="text-green-600 text-2xl mt-1" />
            ) : (
              <FaTimesCircle className="text-orange-600 text-2xl mt-1" />
            )}
            <div className="flex-1">
              <h3 className={`font-bold mb-1 ${data.available ? 'text-green-700' : 'text-orange-700'}`}>
                {data.available ? '✨ Delivery Available!' : 'Not Available Yet'}
              </h3>
              <p className={`text-sm ${data.available ? 'text-green-600' : 'text-orange-600'}`}>
                {data.available 
                  ? 'We deliver to your area. Enjoy fast and fresh delivery!' 
                  : 'We don\'t deliver to this area yet, but we\'re expanding soon!'}
              </p>
              {data.available && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                  <FaClock />
                  <span>Expected delivery: 30-60 minutes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mx-6 mb-6 p-4 rounded-lg bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <FaTimesCircle className="text-red-600 text-xl mt-0.5" />
            <div>
              <p className="text-sm text-red-600 font-semibold">
                {error?.data?.message || 'Unable to check location. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          💚 EcoMart delivers fresh, eco-friendly groceries to your doorstep
        </p>
      </div>
    </div>
  );
});

export default LocationCard;
