import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShieldAlt, FaTruck, FaLeaf, FaClock } from 'react-icons/fa';

/**
 * Modern Hero Section for Home Page
 * Contemporary split design with animations
 */
const HeroSection = () => {
    const features = [
        { icon: FaTruck, text: 'Free Delivery on ₹500+' },
        { icon: FaClock, text: '30-Min Delivery' },
        { icon: FaLeaf, text: '100% Organic' },
        { icon: FaShieldAlt, text: 'Quality Guaranteed' },
    ];

    return (
        <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl -ml-40 -mb-40" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6"
                        >
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-gray-700">Fresh Arrivals Daily</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Fresh Groceries
                            <br />
                            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                Delivered Fast
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Get farm-fresh organic groceries delivered to your doorstep in 30 minutes. Quality guaranteed!
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                        >
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                <span>Shop Now</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-primary-200"
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0"
                        >
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                        <Icon className="text-primary-500 text-lg flex-shrink-0" />
                                        <span className="font-medium">{feature.text}</span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Image/Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        {/* Placeholder for hero image or animation */}
                        <div className="relative">
                            {/* Background Circle */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full blur-3xl opacity-20 animate-pulse" />

                            {/* Main Content */}
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                                <div className="grid grid-cols-2 gap-4">
                                    {['🍎', '🥕', '🥛', '🍞', '🍇', '🥑', '🍅', '🥦'].map((emoji, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{
                                                delay: 0.8 + index * 0.1,
                                                type: 'spring',
                                                stiffness: 200,
                                            }}
                                            className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-6xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                                        >
                                            {emoji}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
