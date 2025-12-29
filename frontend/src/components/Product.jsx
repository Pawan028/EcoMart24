import { Link } from 'react-router-dom';
import Rating from './Rating';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Product = ({ product }) => {
  return (
    <div className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100'>
      {/* Discount Badge */}
      <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        20% OFF
      </div>

      {/* Wishlist Icon */}
      <button className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
        <FaHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <div className="relative h-64 bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500' 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      {/* Product Details */}
      <div className='p-5 space-y-3'>
        <Link to={`/product/${product._id}`}>
          <h5 className='text-lg font-bold text-gray-800 hover:text-green-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]'>
            {product.name}
          </h5>
        </Link>

        {/* Rating */}
        <div className='flex items-center justify-between'>
          <Rating value={product.rating} text={`${product.numReviews}`} />
        </div>

        {/* Price & Cart */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
          <div>
            <div className="flex items-baseline gap-2">
              <span className='text-2xl font-bold text-green-600'>
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{(product.price * 1.2).toFixed(2)}
              </span>
            </div>
          </div>
          
          <Link 
            to={`/product/${product._id}`}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
          >
            <FaShoppingCart className="text-sm" />
          </Link>
        </div>

        {/* Stock Status */}
        <div className="pt-2">
          {product.countInStock > 0 ? (
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
