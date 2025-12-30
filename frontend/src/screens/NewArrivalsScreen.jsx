import React from 'react';
import { useGetNewArrivalsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import { ProductSkeleton } from '../components/SkeletonLoaders';
import Message from '../components/Message';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import Meta from '../components/Meta';

const NewArrivalsScreen = () => {
    const { data, isLoading, error } = useGetNewArrivalsQuery();

    return (
        <>
            <Meta title="New Arrivals - EcoMart" />
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
                            <FaStar className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">New Arrivals</h1>
                            <p className="text-gray-600">Freshly added products just for you</p>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                ) : data?.products?.length === 0 ? (
                    <div className="text-center py-12">
                        <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No New Arrivals</h3>
                        <p className="text-gray-500 mb-6">Check back soon for new products!</p>
                        <Link
                            to="/"
                            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                        >
                            Browse All Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-gray-600">
                            Showing <strong>{data.products.length}</strong> new product{data.products.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                            {data.products.map((product) => (
                                <div key={product._id} className="relative">
                                    <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        NEW
                                    </div>
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </>
    );
};

export default NewArrivalsScreen;
