import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Rating from './Rating';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

const Product = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  // Check if product is in wishlist on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const inWishlist = wishlist.some(item => item._id === product._id);
    setIsWishlisted(inWishlist);
  }, [product._id]);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isWishlisted) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(true);
    }

    // Dispatch storage event for header to update count
    window.dispatchEvent(new Event('storage'));
  };

  // 3D tilt effect on mouse move
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100'
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none z-10" style={{ backgroundSize: '200% 100%' }} />

      {/* Discount Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
      >
        20% OFF
      </motion.div>

      {/* Wishlist Icon */}
      <motion.button
        onClick={handleWishlistToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute top-4 left-4 z-20 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${isWishlisted
          ? 'bg-red-500 text-white'
          : 'bg-white/90 text-gray-400 hover:bg-red-50 hover:text-red-500'
          }`}
      >
        <motion.div
          animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <FaHeart className={isWishlisted ? 'fill-current' : ''} />
        </motion.div>
      </motion.button>

      {/* Quick View Icon */}
      <Link
        to={`/product/${product._id}`}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-500 hover:text-white"
      >
        <FaEye />
      </Link>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className='w-full h-full object-cover'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Product Details */}
      <div className='p-5 space-y-3 relative z-10 bg-white'>
        <Link to={`/product/${product._id}`}>
          <motion.h5
            className='text-lg font-bold text-gray-800 hover:text-primary-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]'
            whileHover={{ x: 2 }}
          >
            {product.name}
          </motion.h5>
        </Link>

        {/* Rating */}
        <div className='flex items-center justify-between'>
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </div>

        {/* Price & Cart */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
          <div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className='text-2xl font-bold text-primary-600'
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                ₹{product.price}
              </motion.span>
              <span className="text-sm text-gray-400 line-through">
                ₹{(product.price * 1.25).toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              Save ₹{(product.price * 0.25).toFixed(2)}
            </div>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="group/btn relative"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaShoppingCart className="text-sm" />
            </motion.div>
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Add to Cart
            </span>
          </Link>
        </div>

        {/* Stock Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pt-2"
        >
          {product.countInStock > 0 ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              In Stock ({product.countInStock} left)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Out of Stock
            </span>
          )}
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }} />
    </motion.div>
  );
};

export default Product;
