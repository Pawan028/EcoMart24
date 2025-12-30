import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaShoppingBag, FaLock, FaCog, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileSidebar = ({ onItemClick }) => {
    const menuItems = [
        {
            title: 'Personal Information',
            icon: FaUser,
            path: '/profile',
            end: true,
        },
        {
            title: 'My Addresses',
            icon: FaMapMarkerAlt,
            path: '/profile/addresses',
        },
        {
            title: 'My Orders',
            icon: FaShoppingBag,
            path: '/profile/orders',
        },
        {
            title: 'My Wishlist',
            icon: FaHeart,
            path: '/wishlist',
        },
        {
            title: 'Security',
            icon: FaLock,
            path: '/profile/security',
        },
        {
            title: 'Preferences',
            icon: FaCog,
            path: '/profile/preferences',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600">
                <h3 className="text-white font-bold text-lg">My Account</h3>
            </div>

            <nav className="p-2">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        end={item.end}
                        onClick={onItemClick}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${isActive
                                ? 'bg-green-50 text-green-600 font-semibold shadow-sm'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    className={`text-lg ${isActive ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                />
                                <span>{item.title}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </motion.div>
    );
};

export default ProfileSidebar;
