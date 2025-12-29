import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaCheckCircle } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems = [] } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-300 group mb-4"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <FaShoppingBag className="text-green-600" />
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="text-lg text-gray-500">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
            )}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                <FaShoppingBag className="text-6xl text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/" 
              className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <Link to={`/product/${item._id}`} className="flex-shrink-0">
                        <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden group">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item._id}`}
                          className="block mb-2"
                        >
                          <h3 className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                          {item.countInStock > 0 && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                              <FaCheckCircle className="text-xs" />
                              In Stock
                            </span>
                          )}
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-gray-700">Qty:</label>
                            <select
                              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300 font-semibold"
                              value={item.qty}
                              onChange={(e) =>
                                addToCartHandler(item, Number(e.target.value))
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
                            onClick={() => removeFromCartHandler(item._id)}
                            title="Remove from cart"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Item Total (Desktop) */}
                      <div className="hidden sm:flex flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 mb-1">Item Total</p>
                          <p className="text-2xl font-bold text-gray-900">₹{(item.qty * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Item Total (Mobile) */}
                    <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">Item Total:</span>
                        <span className="text-xl font-bold text-gray-900">₹{(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold text-green-600">₹{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    cartItems.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center mb-3">We accept</p>
                  <div className="flex justify-center gap-3 flex-wrap">
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold text-gray-700">UPI</div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold text-gray-700">Card</div>
                    <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold text-gray-700">Wallet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;
