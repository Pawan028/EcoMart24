import React from 'react';
import { useGetDealProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import { ProductSkeleton } from '../components/SkeletonLoaders';
import Message from '../components/Message';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaFire } from 'react-icons/fa';
import Meta from '../components/Meta';

const DealsScreen = () => {
    const { data, isLoading, error } = useGetDealProductsQuery();

    return (
        <>
            <Meta title="Today's Deals - EcoMart" />
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
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <FaFire className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Today's Deals</h1>
                            <p className="text-gray-600">Limited time offers on fresh products</p>
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
                        <FaFire className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Deals Available</h3>
                        <p className="text-gray-500 mb-6">Check back soon for amazing offers!</p>
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
                            Showing <strong>{data.products.length}</strong> deal{data.products.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
                            {data.products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </>
    );
};

export default DealsScreen;
