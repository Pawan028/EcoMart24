import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const LocationModal = ({ isOpen, onClose }) => {
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleCheck = async () => {
        if (!pincode || pincode.length !== 6) {
            toast.error('Please enter a valid 6-digit pincode');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const { data } = await axios.post('/api/locations/check', { pincode });

            if (data.serviceable) {
                setResult(data);
                // Save to localStorage
                const locationData = {
                    pincode: data.pincode,
                    city: data.city,
                    state: data.state,
                    deliveryTime: data.deliveryTime
                };
                localStorage.setItem('location', JSON.stringify(locationData));

                // Dispatch custom event for same-tab real-time updates
                window.dispatchEvent(new CustomEvent('locationUpdated', { detail: locationData }));

                toast.success(`Great! We deliver to ${data.city}`);

                // Close modal after success
                setTimeout(() => {
                    onClose(locationData);
                }, 1500);
            } else {
                setResult({ serviceable: false });
                toast.error(data.message || 'Sorry, we do not deliver to this area yet');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error checking pincode');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCheck();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl max-w-md w-full p-6 relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => onClose(null)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>

                    {/* Icon & Title */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                            <FaMapMarkerAlt className="text-3xl text-primary-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Location</h3>
                        <p className="text-gray-600">Enter your pincode to check if we deliver to your area</p>
                    </div>

                    {/* Pincode Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pincode
                        </label>
                        <input
                            type="text"
                            value={pincode}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                if (value.length <= 6) setPincode(value);
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter 6-digit pincode"
                            maxLength={6}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-lg text-center font-semibold tracking-wider"
                        />
                    </div>

                    {/* Result Display */}
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-6 p-4 rounded-lg ${result.serviceable
                                ? 'bg-green-50 border-2 border-green-200'
                                : 'bg-red-50 border-2 border-red-200'
                                }`}
                        >
                            {result.serviceable ? (
                                <div className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-green-900 mb-1">Delivery Available!</h4>
                                        <p className="text-sm text-green-800">
                                            {result.city}, {result.state}
                                        </p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Estimated delivery: <strong>{result.deliveryTime}</strong>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-red-800 font-semibold">Not Serviceable</p>
                                    <p className="text-sm text-red-700 mt-1">We're expanding soon!</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Check Button */}
                    <button
                        onClick={handleCheck}
                        disabled={loading || pincode.length !== 6}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${loading || pincode.length !== 6
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        {loading ? 'Checking...' : 'Check Serviceability'}
                    </button>

                    {/* Sample Pincodes */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500 mb-2">Try sample pincodes:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {['400001', '110001', '560001'].map((sample) => (
                                <button
                                    key={sample}
                                    onClick={() => setPincode(sample)}
                                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                                >
                                    {sample}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LocationModal;
