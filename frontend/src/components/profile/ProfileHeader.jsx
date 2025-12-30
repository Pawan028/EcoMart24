import React from 'react';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaCalendar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileHeader = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Generate initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Format date to show member since
    const getMemberSince = () => {
        if (!userInfo?.createdAt) return 'Recently joined';
        const date = new Date(userInfo.createdAt);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                        {getInitials(userInfo?.name)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                        {userInfo?.name || 'User'}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-600 mb-3">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <FaEnvelope className="text-gray-400" />
                            <span className="text-sm">{userInfo?.email}</span>
                        </div>

                        {userInfo?.createdAt && (
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <FaCalendar className="text-gray-400" />
                                <span className="text-sm">Member since {getMemberSince()}</span>
                            </div>
                        )}
                    </div>

                    {/* Stats/Badges */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {userInfo?.isAdmin && (
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                                Admin
                            </span>
                        )}
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                            Verified Account
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
