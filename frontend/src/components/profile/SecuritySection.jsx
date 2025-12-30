import React, { useState } from 'react';
import { FaLock, FaKey, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../../slices/usersApiSlice';
import { motion } from 'framer-motion';

const SecuritySection = () => {
    const [updateProfile, { isLoading }] = useProfileMutation();

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Check password strength for new password
        if (name === 'newPassword') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let feedback = 'Weak';

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) feedback = 'Weak';
        else if (score === 3) feedback = 'Fair';
        else if (score === 4) feedback = 'Good';
        else feedback = 'Strong';

        setPasswordStrength({ score, feedback });
    };

    const getStrengthColor = () => {
        if (passwordStrength.score <= 2) return 'bg-red-500';
        if (passwordStrength.score === 3) return 'bg-yellow-500';
        if (passwordStrength.score === 4) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match!');
            return;
        }

        if (formData.newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long!');
            return;
        }

        try {
            await updateProfile({
                password: formData.newPassword,
                currentPassword: formData.currentPassword,
            }).unwrap();

            toast.success('Password updated successfully!');

            // Reset form
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setPasswordStrength({ score: 0, feedback: '' });
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update password');
        }
    };

    const passwordRequirements = [
        { check: formData.newPassword.length >= 8, label: 'At least 8 characters' },
        { check: /[A-Z]/.test(formData.newPassword), label: 'One uppercase letter' },
        { check: /[a-z]/.test(formData.newPassword), label: 'One lowercase letter' },
        { check: /\d/.test(formData.newPassword), label: 'One number' },
        {
            check: /[^a-zA-Z0-9]/.test(formData.newPassword),
            label: 'One special character',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Security Settings
                </h2>
                <p className="text-gray-600 text-sm">Manage your password and security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Change Password Form */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FaKey className="text-green-600" />
                        Change Password
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Current Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Current Password *
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                New Password *
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold text-gray-600">
                                            Password Strength
                                        </span>
                                        <span
                                            className={`text-xs font-semibold ${passwordStrength.score <= 2
                                                    ? 'text-red-600'
                                                    : passwordStrength.score === 3
                                                        ? 'text-yellow-600'
                                                        : passwordStrength.score === 4
                                                            ? 'text-blue-600'
                                                            : 'text-green-600'
                                                }`}
                                        >
                                            {passwordStrength.feedback}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm New Password *
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                />
                            </div>
                            {formData.confirmPassword && (
                                <div className="mt-2 flex items-center gap-2 text-sm">
                                    {formData.newPassword === formData.confirmPassword ? (
                                        <>
                                            <FaCheckCircle className="text-green-500" />
                                            <span className="text-green-600">Passwords match</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaTimes className="text-red-500" />
                                            <span className="text-red-600">Passwords don't match</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>

                {/* Password Requirements & Tips */}
                <div className="space-y-6">
                    {/* Requirements Checklist */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">
                            Password Requirements
                        </h4>
                        <div className="space-y-2">
                            {passwordRequirements.map((req, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {req.check ? (
                                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                    ) : (
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                                    )}
                                    <span
                                        className={`text-sm ${req.check ? 'text-green-600 font-semibold' : 'text-gray-600'
                                            }`}
                                    >
                                        {req.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Tips */}
                    <div className="bg-blue-50 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3">Security Tips</h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Use a unique password you don't use elsewhere</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Avoid common words or personal information</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Change your password regularly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-0.5">•</span>
                                <span>Never share your password with anyone</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SecuritySection;
