import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import { ProductSkeleton } from '../components/SkeletonLoaders';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';
import { FaLeaf, FaAppleAlt, FaBreadSlice, FaCarrot, FaCheese, FaFish, FaCoffee, FaTimes } from 'react-icons/fa';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [highRatedProducts, setHighRatedProducts] = useState([]);
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

      const sortedProducts = [...data.products].sort((a, b) => b.rating - a.rating);
      setHighRatedProducts(sortedProducts.slice(0, 8));
    }
  }, [data]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      navigate(`/?category=${category}`);
    } else {
      navigate('/');
    }
    // Refetch will happen automatically due to query params change
  };

  useEffect(() => {
    if (keyword) {
      setSelectedCategory('');
    }
  }, [keyword]);

  const getCategoryIcon = (category) => {
    const IconComponent = categoryIcons[category] || FaLeaf;
    return <IconComponent className="text-4xl mb-3 text-green-600 group-hover:text-white transition-colors duration-300" />;
  };

  return (
    <>
      <Meta title="Welcome to EcoMart | Home" />

      <div className="relative w-full min-h-screen">
        {/* Hero Section */}
        <div className="mb-8">
          {!keyword ? (
            <div className="relative overflow-hidden rounded-2xl mx-4 md:mx-6 mt-4 shadow-2xl">
              <ProductCarousel products={highRatedProducts} />
            </div>
          ) : (
            <div className="px-4 py-4">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-white text-green-600 py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-green-50 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          )}
        </div>

        {/* Category Section */}
        <div className="mb-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Shop by Category</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-green-500 to-transparent ml-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div
                className={`group relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                  selectedCategory === '' ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-green-500'
                }`}
                onClick={() => handleCategorySelect('')}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl transition-opacity duration-300 ${
                  selectedCategory === '' ? 'opacity-10' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
                <div className="relative z-10 flex flex-col items-center">
                  {getCategoryIcon('All')}
                  <span className={`text-sm md:text-base font-semibold transition-colors duration-300 text-center ${
                    selectedCategory === '' ? 'text-green-600' : 'text-gray-800 group-hover:text-white'
                  }`}>All Products</span>
                </div>
              </div>
              
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                    selectedCategory === category ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-green-500'
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl transition-opacity duration-300 ${
                    selectedCategory === category ? 'opacity-10' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    {getCategoryIcon(category)}
                    <span className={`text-sm md:text-base font-semibold transition-colors duration-300 text-center ${
                      selectedCategory === category ? 'text-green-600' : 'text-gray-800 group-hover:text-white'
                    }`}>{category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Rated Products Section */}
        <div className="mb-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Top Rated Products</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-amber-500 to-transparent ml-6 rounded-full"></div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <div className="overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex gap-6 min-w-min">
                  {highRatedProducts.length ? (
                    highRatedProducts.map((product) => (
                      <div key={product._id} className="flex-shrink-0 w-72 sm:w-80">
                        <Product product={product} />
                      </div>
                    ))
                  ) : (
                    <Message variant="info">No top-rated products found.</Message>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products by Category */}
        {!keyword && !selectedCategory && categories.map((category) => {
          const categoryProducts = data?.products.filter((product) => product.category === category) || [];
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category} className="mb-12 px-4 md:px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{category}</h3>
                  <div className="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent ml-6 rounded-full"></div>
                </div>
                
                {isLoading ? (
                  <div className="flex gap-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="min-w-[280px]">
                        <ProductSkeleton />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <Message variant="danger">
                    {error?.data?.message || error.error}
                  </Message>
                ) : (
                  <div className="overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex gap-6 min-w-min">
                      {categoryProducts.map((product) => (
                        <div key={product._id} className="flex-shrink-0 w-72 sm:w-80">
                          <Product product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Selected Category Products Grid */}
        {!keyword && selectedCategory && (
          <div className="mb-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedCategory}</h3>
                <button 
                  onClick={() => handleCategorySelect('')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <FaTimes />
                  Clear Filter
                </button>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              ) : data?.products && data.products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <FaLeaf className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found in this category</h3>
                  <p className="text-gray-500 mb-6">Try selecting a different category or browse all products</p>
                  <button
                    onClick={() => handleCategorySelect('')}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Products Grid when keyword is present */}
        {keyword && data?.products && (
          <div className="mb-12 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Search Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="px-4 md:px-6 pb-8">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default HomeScreen;
