import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaShoppingBag,
    FaBox,
    FaTruck,
    FaCheckCircle,
    FaTimes,
    FaClock,
    FaSearch,
    FaCalendar,
    FaRupeeSign,
} from 'react-icons/fa';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../Loader';
import { motion } from 'framer-motion';

const OrdersSection = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filterOptions = [
        { value: 'all', label: 'All Orders', icon: FaShoppingBag },
        { value: 'pending', label: 'Pending', icon: FaClock },
        { value: 'delivered', label: 'Delivered', icon: FaCheckCircle },
    ];

    // Filter orders based on active filter and search term
    const filteredOrders = orders?.filter((order) => {
        // Filter by status
        if (activeFilter === 'pending' && order.isDelivered) return false;
        if (activeFilter === 'delivered' && !order.isDelivered) return false;

        // Filter by search term
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const orderId = order._id.toLowerCase();
            const hasMatchingProduct = order.orderItems?.some((item) =>
                item.name?.toLowerCase().includes(searchLower)
            );
            return orderId.includes(searchLower) || hasMatchingProduct;
        }

        return true;
    });

    const getStatusBadge = (order) => {
        if (order.isDelivered) {
            return (
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    <FaCheckCircle />
                    Delivered
                </span>
            );
        } else if (order.isPaid) {
            return (
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    <FaTruck />
                    In Transit
                </span>
            );
        } else {
            return (
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                    <FaClock />
                    Pending Payment
                </span>
            );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">My Orders</h2>
                <p className="text-gray-600 text-sm">View and track your orders</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {filterOptions.map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${activeFilter === filter.value
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Icon />
                            <span>{filter.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by order ID or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                />
            </div>

            {/* Orders List */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-600 font-semibold">
                        {error?.data?.message || error.error}
                    </p>
                </div>
            ) : !filteredOrders || filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaShoppingBag className="text-5xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        {searchTerm || activeFilter !== 'all'
                            ? 'No orders found'
                            : 'No orders yet'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || activeFilter !== 'all'
                            ? 'Try adjusting your filters or search term'
                            : 'Start shopping to see your orders here!'}
                    </p>
                    {!searchTerm && activeFilter === 'all' && (
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                        >
                            Start Shopping
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-2 border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-lg transition-all"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <FaBox className="text-green-600 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaCalendar className="text-xs" />
                                            <span>
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {getStatusBadge(order)}
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                                            <FaRupeeSign className="text-sm" />
                                            <span>{order.totalPrice}</span>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            {order.orderItems?.length} item(s)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items Preview */}
                            <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                                {order.orderItems?.slice(0, 3).map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                {order.orderItems?.length > 3 && (
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-semibold text-sm">
                                        +{order.orderItems.length - 3}
                                    </div>
                                )}
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center gap-2 mb-4 text-sm">
                                {order.isPaid ? (
                                    <>
                                        <FaCheckCircle className="text-green-500" />
                                        <span className="text-green-600 font-semibold">
                                            Paid on {new Date(order.paidAt).toLocaleDateString()}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <FaTimes className="text-red-500" />
                                        <span className="text-red-600 font-semibold">Not Paid</span>
                                    </>
                                )}
                            </div>

                            {/* Action Button */}
                            <Link
                                to={`/order/${order._id}`}
                                className="block w-full md:w-auto text-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                            >
                                View Details
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Results Count */}
            {filteredOrders && filteredOrders.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-600">
                    Showing {filteredOrders.length} of {orders?.length || 0} orders
                </div>
            )}
        </motion.div>
    );
};

export default OrdersSection;
