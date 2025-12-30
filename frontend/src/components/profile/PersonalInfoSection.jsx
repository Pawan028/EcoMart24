import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaVenusMars } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { motion } from 'framer-motion';

const PersonalInfoSection = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useProfileMutation();
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                dateOfBirth: userInfo.dateOfBirth || '',
                gender: userInfo.gender || '',
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProfile(formData).unwrap();
            dispatch(setCredentials(res));
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update profile');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data
        setFormData({
            name: userInfo.name || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            dateOfBirth: userInfo.dateOfBirth || '',
            gender: userInfo.gender || '',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all ${isEditing
                                    ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                }`}
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            required
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all ${isEditing
                                    ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                }`}
                        />
                    </div>
                </div>

                {/* Phone (optional) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Enter your phone number"
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all ${isEditing
                                    ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                }`}
                        />
                    </div>
                </div>

                {/* Date of Birth (optional) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaCalendar className="text-gray-400" />
                        </div>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all ${isEditing
                                    ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                }`}
                        />
                    </div>
                </div>

                {/* Gender (optional) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaVenusMars className="text-gray-400" />
                        </div>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all ${isEditing
                                    ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                                }`}
                        >
                            <option value="">Prefer not to say</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>
        </motion.div>
    );
};

export default PersonalInfoSection;
