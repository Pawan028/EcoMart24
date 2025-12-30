import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddressModal = ({ isOpen, onClose, onSave, addressToEdit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        pincode: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        landmark: '',
        addressType: 'Home',
        isDefault: false,
    });

    const [checkingPincode, setCheckingPincode] = useState(false);

    useEffect(() => {
        if (addressToEdit) {
            setFormData(addressToEdit);
        } else {
            resetForm();
        }
    }, [addressToEdit, isOpen]);

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            pincode: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            landmark: '',
            addressType: 'Home',
            isDefault: false,
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePincodeCheck = async () => {
        if (formData.pincode.length !== 6) {
            toast.error('Please enter a valid 6-digit pincode');
            return;
        }

        setCheckingPincode(true);
        try {
            const { data } = await axios.post('/api/locations/check', {
                pincode: formData.pincode,
            });

            if (data.serviceable) {
                setFormData({
                    ...formData,
                    city: data.city,
                    state: data.state,
                });
                toast.success(`Pincode verified: ${data.city}, ${data.state}`);
            } else {
                toast.error('Sorry, we do not deliver to this area yet');
            }
        } catch (error) {
            toast.error('Error checking pincode');
        } finally {
            setCheckingPincode(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <FaMapMarkerAlt className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {addressToEdit ? 'Edit Address' : 'Add New Address'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaTimes className="text-xl text-gray-500" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>
                        </div>

                        {/* Pincode with Check Button */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Pincode *
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 6) {
                                            setFormData({ ...formData, pincode: value });
                                        }
                                    }}
                                    required
                                    maxLength={6}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={handlePincodeCheck}
                                    disabled={checkingPincode || formData.pincode.length !== 6}
                                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                >
                                    {checkingPincode ? 'Checking...' : 'Check'}
                                </button>
                            </div>
                        </div>

                        {/* Address Line 1 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Address Line 1 *
                            </label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleChange}
                                required
                                placeholder="House No., Building Name"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            />
                        </div>

                        {/* Address Line 2 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleChange}
                                placeholder="Road Name, Area, Colony"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* City */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50"
                                    readOnly
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-gray-50"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Landmark */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                placeholder="Nearby landmark (optional)"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                            />
                        </div>

                        {/* Address Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Address Type
                            </label>
                            <div className="flex gap-3">
                                {['Home', 'Office', 'Other'].map((type) => (
                                    <label
                                        key={type}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${formData.addressType === type
                                                ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                                                : 'border-gray-300 hover:border-green-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="addressType"
                                            value={type}
                                            checked={formData.addressType === type}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Set as Default */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={(e) =>
                                    setFormData({ ...formData, isDefault: e.target.checked })
                                }
                                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                            />
                            <span className="text-gray-700 font-medium">
                                Set as default address
                            </span>
                        </label>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                            >
                                {addressToEdit ? 'Update Address' : 'Save Address'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddressModal;
