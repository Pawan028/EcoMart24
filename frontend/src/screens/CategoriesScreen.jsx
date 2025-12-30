import React from 'react';
import { useGetCategoriesQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLeaf, FaAppleAlt, FaBreadSlice, FaCarrot, FaCheese, FaFish, FaCoffee } from 'react-icons/fa';
import Meta from '../components/Meta';
import { motion } from 'framer-motion';

const CategoriesScreen = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    const categoryIcons = {
        'Fruits': FaAppleAlt,
        'Vegetables': FaCarrot,
        'Dairy': FaCheese,
        'Bakery': FaBreadSlice,
        'Beverages': FaCoffee,
        'Seafood': FaFish,
    };

    return (
        <>
            <Meta title="Browse Categories - EcoMart" />
            <Container>
                {/* Header */}
                <div className="py-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <FaLeaf className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">All Categories</h1>
                            <p className="text-gray-600">Browse products by category</p>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-2xl h-48 animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                        {categories?.map((cat, index) => {
                            const Icon = categoryIcons[cat.category] || FaLeaf;
                            return (
                                <motion.div
                                    key={cat.category}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={`/?category=${cat.category}`}
                                        className="block group"
                                    >
                                        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary-500 relative">
                                            {/* Icon Background */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />

                                            {/* Content */}
                                            <div className="p-8 relative">
                                                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="text-white text-3xl" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                                    {cat.category}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {cat.count} {cat.count === 1 ? 'product' : 'products'}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </>
    );
};

export default CategoriesScreen;
