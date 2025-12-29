import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaStar } from 'react-icons/fa';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from './Loader';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || !products || products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products]);

  const nextSlide = () => {
    if (products) {
      setCurrentSlide((prev) => (prev + 1) % products.length);
      setIsAutoPlaying(false);
    }
  };

  const prevSlide = () => {
    if (products) {
      setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
      setIsAutoPlaying(false);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[500px] bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-600 font-semibold mb-2">Unable to load featured products</p>
          <p className="text-gray-600 text-sm">{error?.data?.message || error.error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl space-y-6 animate-fadeIn">
                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    <FaStar className="text-yellow-300" />
                    <span>Featured Product</span>
                  </div>

                  {/* Product Name */}
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {product.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-200 text-lg md:text-xl line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating and Price */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-400'
                            } text-sm`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-semibold">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-green-400">
                        ₹{product.price}
                      </span>
                      <span className="text-gray-300 text-lg">/ unit</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    <FaShoppingBag />
                    <span>Shop Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
        {currentSlide + 1} / {products.length}
      </div>
    </div>
  );
};

export default ProductCarousel;
