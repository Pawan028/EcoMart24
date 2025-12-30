import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaUser, FaBars, FaMapMarkerAlt, FaSignOutAlt, FaTachometerAlt, FaSearch, FaTimes, FaLeaf, FaChevronDown, FaPhone, FaBoxOpen, FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.ico';
import { resetCart } from '../slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import LocationModal from './LocationModal';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [savedLocation, setSavedLocation] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { keyword: urlKeyword } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const cartItemsCount = cartItems.reduce((a, c) => a + c.qty, 0);

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Seafood'];

  useEffect(() => {
    const location = localStorage.getItem('location');
    if (location) {
      setSavedLocation(JSON.parse(location));
    }
  }, []);

  useEffect(() => {
    if (urlKeyword) {
      setSearchKeyword(urlKeyword);
    }
  }, [urlKeyword]);

  // Update wishlist count
  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener('storage', updateWishlistCount);
    return () => window.removeEventListener('storage', updateWishlistCount);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      localStorage.removeItem('location');
      navigate('/'); // Redirect to home page to continue browsing
      setIsMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      // If category is not "All", include it in the search
      if (selectedCategory !== 'All') {
        navigate(`/search/${searchKeyword.trim()}?category=${selectedCategory}`);
      } else {
        navigate(`/search/${searchKeyword.trim()}`);
      }
    } else {
      // Just keyword search without category
      if (selectedCategory !== 'All') {
        navigate(`/?category=${selectedCategory}`);
      } else {
        navigate('/');
      }
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) && showUserDropdown) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, showUserDropdown]);

  return (
    <>
      {/* TOP BAR - Dark */}
      <div className="bg-gray-900 text-gray-300 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Location */}
            <button
              onClick={() => setShowLocationModal(true)}
              data-location-trigger="true"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaMapMarkerAlt className="text-primary-400" />
              <div className="flex items-center gap-1">
                <span className="text-xs">Deliver to</span>
                {savedLocation ? (
                  <span className="font-semibold text-white">{savedLocation.city} {savedLocation.pincode}</span>
                ) : (
                  <span className="font-semibold text-white">Select Location</span>
                )}
              </div>
            </button>

            {/* Right Links */}
            <div className="flex items-center gap-6">
              <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                <FaPhone className="text-xs" />
                <span>Customer Service</span>
              </Link>
              <Link to="/profile" className="hover:text-white transition-colors flex items-center gap-1">
                <FaBoxOpen className="text-xs" />
                <span>Track Order</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER - White with prominent search */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="relative">
                <img src={logo} alt="EcoMart" className="h-12 w-12 rounded-full transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden lg:block">
                <span className="text-2xl font-bold text-gray-900">EcoMart</span>
                <div className="flex items-center gap-1">
                  <FaLeaf className="text-xs text-primary-600" />
                  <span className="text-xs text-gray-600">Fresh & Organic</span>
                </div>
              </div>
            </Link>

            {/* SEARCH BAR - PROMINENT CENTER */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-3xl relative">
              <div className="flex w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-primary-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 overflow-hidden">
                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    className="h-full px-4 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap transition-colors"
                  >
                    <span className="hidden xl:inline">{selectedCategory}</span>
                    <span className="xl:hidden">All</span>
                    <FaChevronDown className="text-xs" />
                  </button>

                  {/* Category Dropdown Menu */}
                  {showCategoryMenu && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[150px]">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowCategoryMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${selectedCategory === cat ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search for fresh vegetables, fruits, groceries..."
                  className="flex-1 px-4 py-3 text-base focus:outline-none"
                />

                {/* Clear Button */}
                {searchKeyword && (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword('')}
                    className="px-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}

                {/* Search Button */}
                <button
                  type="submit"
                  className="px-8 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  <FaSearch />
                  <span className="hidden xl:inline">Search</span>
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Wishlist - Desktop */}
              <Link to="/wishlist" className="hidden lg:flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors relative">
                <FaHeart className="text-xl" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-xs mt-1">Wishlist</span>
              </Link>

              {/* User Menu */}
              {userInfo ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="hidden lg:flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs mt-1">{userInfo.name.split(' ')[0]}</span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100"
                      >
                        <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                          <p className="font-bold">{userInfo.name}</p>
                          <p className="text-sm text-primary-100">{userInfo.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                          >
                            <FaUser className="text-primary-500" />
                            <span>My Profile</span>
                          </Link>
                          {userInfo.isAdmin && (
                            <Link
                              to="/admin/dashboard"
                              onClick={() => setShowUserDropdown(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                            >
                              <FaTachometerAlt className="text-primary-500" />
                              <span>Admin Dashboard</span>
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-gray-100 p-2">
                          <button
                            onClick={logoutHandler}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 font-medium"
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden lg:flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors">
                  <FaUser className="text-xl" />
                  <span className="text-xs mt-1">Sign In</span>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors">
                <div className="relative">
                  <FaShoppingCart className="text-2xl" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 hidden lg:inline">Cart</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-gray-700 hover:text-primary-600 text-2xl"
              >
                <FaBars />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* NAVIGATION BAR - Green */}
      <nav className="bg-primary-600 text-white hidden md:block shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-12 gap-6">
            <Link to="/categories" className="flex items-center gap-2 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors font-medium">
              <FaBars />
              <span>All Categories</span>
            </Link>
            <Link to="/" className="hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">Home</Link>
            <Link to="/deals" className="hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">Today's Deals</Link>
            <Link to="/new-arrivals" className="hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">New Arrivals</Link>
            <Link to="/about" className="hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">About</Link>
            <Link to="/contact" className="hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Slide from right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />

            {/* Menu */}
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                {/* User Section */}
                {userInfo ? (
                  <div className="mb-6 p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
                    <p className="font-bold">{userInfo.name}</p>
                    <p className="text-sm text-primary-100">{userInfo.email}</p>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block mb-6 p-4 bg-primary-500 text-white rounded-lg text-center font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Sign In / Register
                  </Link>
                )}

                {/* Menu Links */}
                <div className="space-y-2">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                    Home
                  </Link>
                  {userInfo && (
                    <>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                        My Profile
                      </Link>
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                        My Orders
                      </Link>
                      {userInfo.isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                          Admin Dashboard
                        </Link>
                      )}
                    </>
                  )}
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                    About
                  </Link>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700">
                    Contact
                  </Link>
                  {userInfo && (
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={(location) => {
          if (location) {
            setSavedLocation(location);
          }
          setShowLocationModal(false);
        }}
      />
    </>
  );
};

export default Header;
