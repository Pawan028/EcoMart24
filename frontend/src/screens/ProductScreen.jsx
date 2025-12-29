import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { FaArrowLeft, FaShoppingCart, FaCheck, FaTimes, FaStar } from 'react-icons/fa';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        </div>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          
          {/* Back Button */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <Link 
              to='/' 
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-300 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Shopping
            </Link>
          </div>

          {/* Product Details Section */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Product Image */}
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{(product.price * 1.2).toFixed(2)}</span>
                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">20% OFF</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Availability & Cart */}
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-700 font-semibold">Availability:</span>
                    <span className={`flex items-center gap-2 font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.countInStock > 0 ? (
                        <>
                          <FaCheck className="text-sm" />
                          In Stock ({product.countInStock} available)
                        </>
                      ) : (
                        <>
                          <FaTimes className="text-sm" />
                          Out of Stock
                        </>
                      )}
                    </span>
                  </div>

                  {product.countInStock > 0 && (
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <span className="text-gray-700 font-semibold">Quantity:</span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                      product.countInStock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                    }`}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    <FaShoppingCart />
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                Customer Reviews
              </h2>

              {product.reviews.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                  <p className="text-blue-800 font-medium">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {product.reviews.map((review) => (
                    <div key={review._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                          <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <Rating value={review.rating} />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Review */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
                {loadingProductReview && <Loader />}
                {userInfo ? (
                  <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                      <select
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-300"
                      >
                        <option value=''>Select Rating...</option>
                        <option value='1'>⭐ 1 - Poor</option>
                        <option value='2'>⭐⭐ 2 - Fair</option>
                        <option value='3'>⭐⭐⭐ 3 - Good</option>
                        <option value='4'>⭐⭐⭐⭐ 4 - Very Good</option>
                        <option value='5'>⭐⭐⭐⭐⭐ 5 - Excellent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Comment</label>
                      <textarea
                        rows='5'
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Share your thoughts about this product..."
                      ></textarea>
                    </div>
                    <button
                      disabled={loadingProductReview}
                      type='submit'
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="bg-white rounded-xl p-6 text-center">
                    <p className="text-gray-700 text-lg">
                      Please <Link to='/login' className='text-green-600 font-semibold hover:text-green-700 transition-colors duration-300'>sign in</Link> to write a review
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
