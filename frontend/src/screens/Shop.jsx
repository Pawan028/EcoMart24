import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { FaLeaf, FaAppleAlt, FaBreadSlice, FaCarrot, FaCheese, FaFish, FaCoffee, FaFilter } from 'react-icons/fa';

const Shop = () => {
  const { pageNumber = 1, keyword = '' } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
    category: selectedCategory,
  });

  const categoryIcons = {
    'All': FaLeaf,
    'Fruits': FaAppleAlt,
    'Vegetables': FaCarrot,
    'Bakery': FaBreadSlice,
    'Dairy': FaCheese,
    'Seafood': FaFish,
    'Beverages': FaCoffee,
  };

  useEffect(() => {
    if (data && data.products) {
      const uniqueCategories = Array.from(
        new Set(data.products.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [data]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate(`/shop/page/${pageNumber}?category=${category}`);
    refetch();
  };

  const getCategoryIcon = (category) => {
    const IconComponent = categoryIcons[category] || FaLeaf;
    return <IconComponent className="text-2xl" />;
  };

  return (
    <>
      <Meta title="Shop | EcoMart" />

      <div className="relative w-full min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white py-16 px-4 mb-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Discover Fresh Products
            </h1>
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto">
              Browse our collection of premium quality products with unbeatable deals
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 w-full justify-center bg-white text-gray-800 py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <FaFilter className="text-green-600" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Category Filters */}
          <div className={`mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaFilter className="text-green-600" />
                Shop by Category
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <button
                  onClick={() => handleCategorySelect('')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === '' 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaLeaf className="text-3xl mb-2" />
                  <span className="text-sm font-semibold text-center">All Products</span>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getCategoryIcon(category)}
                    <span className="text-sm font-semibold text-center mt-2">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
              </h3>
              {data?.products && (
                <span className="text-gray-600 font-medium">
                  {data.products.length} {data.products.length === 1 ? 'Product' : 'Products'}
                </span>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader />
              </div>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : data?.products?.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <div key={product._id} className="transform transition-transform duration-300 hover:scale-105">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {data && data.pages > 1 && (
            <div className="pb-8">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
