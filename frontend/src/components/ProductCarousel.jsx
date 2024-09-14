import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import '../assets/styles/ProductCarousel.css';

const getRandomProducts = (products, count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const randomProducts = products ? getRandomProducts(products, 5) : [];

  return isLoading ? null : error ? (
    <div className="bg-red-100 text-red-700 p-4 rounded">
      {error?.data?.message || error.error}
    </div>
  ) : (
    <div className="relative w-full  overflow-hidden">
      {/* Carousel wrapper */}
      <div className="flex w-full h-96 overflow-x-scroll snap-x snap-mandatory">
        {randomProducts.length > 0 && randomProducts.map((product) => (
          <div
            key={product._id}
            className="min-w-full flex-shrink-0 snap-center relative"
          >
            <Link to={`/product/${product._id}`}>
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
              {/* Caption */}
              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4">
                <h2 className="text-white text-xl font-semibold">
                  {product.name} (₹{product.price})
                </h2>
                <p className="text-white">{product.description}</p>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  See More
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Optional Dots or Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {randomProducts.map((_, index) => (
          <button
            key={index}
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500"
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
