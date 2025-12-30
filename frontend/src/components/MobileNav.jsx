import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaThLarge, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

/**
 * Mobile Bottom Navigation Bar
 * Fixed bottom tab bar for better mobile UX
 */
const MobileNav = () => {
    const location = useLocation();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const cartItemsCount = cartItems.reduce((a, c) => a + c.qty, 0);

    const navItems = [
        {
            path: '/',
            icon: FaHome,
            label: 'Home',
            exact: true,
        },
        {
            path: '/shop',
            icon: FaThLarge,
            label: 'Categories',
        },
        {
            path: '/cart',
            icon: FaShoppingCart,
            label: 'Cart',
            badge: cartItemsCount,
        },
        {
            path: userInfo ? '/profile' : '/login',
            icon: FaUser,
            label: userInfo ? 'Account' : 'Login',
        },
    ];

    const isActive = (path, exact) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path, item.exact);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex-1 flex flex-col items-center justify-center h-full relative group"
                        >
                            {/* Active Indicator */}
                            {active && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}

                            {/* Icon Container */}
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: active ? 1.1 : 1,
                                        y: active ? -2 : 0,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={`p-1 rounded-lg ${active ? 'text-primary-600' : 'text-gray-500'
                                        } ${!active && 'group-hover:text-primary-500'}`}
                                >
                                    <Icon className="text-2xl" />
                                </motion.div>

                                {/* Badge for Cart */}
                                {item.badge > 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                                    >
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </motion.div>
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`text-xs mt-0.5 font-medium transition-colors duration-200 ${active ? 'text-primary-600' : 'text-gray-600'
                                    } ${!active && 'group-hover:text-primary-500'}`}
                            >
                                {item.label}
                            </span>

                            {/* Ripple Effect on Tap */}
                            {active && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0.5 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 bg-primary-100 rounded-lg"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Spacer for safe area on notched devices */}
            <div className="h-safe-area-inset-bottom bg-white" />
        </nav>
    );
};

export default MobileNav;
