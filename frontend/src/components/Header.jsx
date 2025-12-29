import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaUser, FaHome, FaInfoCircle, FaAddressBook, FaBars, FaMapMarkerAlt, FaSignOutAlt, FaTachometerAlt, FaSearch, FaTimes, FaLeaf } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.ico';
import { resetCart } from '../slices/cartSlice';
import LocationCard from './LocationCard';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [showCard, setShowCard] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const menuRef = useRef(null);
  const cardRef = useRef(null);
  const userDropdownRef = useRef(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      localStorage.removeItem('location');
      navigate('/login');
      setIsMenuOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (cardRef.current && !cardRef.current.contains(event.target) && showCard) {
        setShowCard(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target) && showUserDropdown) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, showCard, showUserDropdown]);

  const cartItemsCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-green-600 to-emerald-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img src={logo} alt="EcoMart" className="h-10 w-10 rounded-full transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>EcoMart</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <FaLeaf className={`text-xs ${isScrolled ? 'text-green-600' : 'text-green-200'}`} />
                  <span className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-green-100'}`}>Fresh & Eco-friendly</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link to="/" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-green-600' 
                  : 'text-white hover:bg-white/20'
              }`}>
                <FaHome className="inline mr-2" />Home
              </Link>
              <Link to="/about" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-green-600' 
                  : 'text-white hover:bg-white/20'
              }`}>
                <FaInfoCircle className="inline mr-2" />About
              </Link>
              <Link to="/contact" className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-green-600' 
                  : 'text-white hover:bg-white/20'
              }`}>
                <FaAddressBook className="inline mr-2" />Contact
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="hidden xl:block">
                <SearchBox />
              </div>

              {/* Location */}
              <button
                onClick={() => setShowCard(!showCard)}
                data-location-trigger
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaMapMarkerAlt />
                <span className="hidden xl:inline text-sm">Location</span>
              </button>

              {/* Cart */}
              <Link to="/cart" className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}>
                <FaShoppingCart className="text-xl" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {userInfo ? (
                <div className="relative" ref={userDropdownRef}>
                  <button 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-white hover:bg-white/20'
                    }`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden xl:inline font-medium">{userInfo.name}</span>
                  </button>
                  
                  {/* Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn z-50">
                      <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <p className="font-bold">{userInfo.name}</p>
                        <p className="text-sm text-green-100">{userInfo.email}</p>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" onClick={() => setShowUserDropdown(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                          <FaUser className="text-gray-600" />
                          <span>My Profile</span>
                        </Link>
                        {userInfo.isAdmin && (
                          <Link to="/admin/dashboard" onClick={() => setShowUserDropdown(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                            <FaTachometerAlt className="text-gray-600" />
                            <span>Dashboard</span>
                          </Link>
                        )}
                        <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors">
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isScrolled 
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
                      : 'bg-white text-green-600 hover:bg-green-50'
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Search Toggle */}
              <button 
                onClick={toggleSearch}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaSearch className="text-xl" />
              </button>

              {/* Cart */}
              <Link to="/cart" className={`relative p-2 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}>
                <FaShoppingCart className="text-xl" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Menu Toggle */}
              <button 
                onClick={toggleMenu}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="lg:hidden pb-4 pt-2 animate-slideDown">
              <SearchBox />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 lg:hidden transform transition-transform duration-300 shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Menu Header */}
          <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {userInfo ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold">{userInfo.name}</p>
                  <p className="text-sm text-green-100">{userInfo.email}</p>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <FaHome className="text-green-600 text-xl" />
                <span className="font-medium">Home</span>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <FaInfoCircle className="text-green-600 text-xl" />
                <span className="font-medium">About</span>
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <FaAddressBook className="text-green-600 text-xl" />
                <span className="font-medium">Contact</span>
              </Link>
              
              <div className="my-4 border-t border-gray-200"></div>

              <button 
                onClick={() => { setShowCard(!showCard); setIsMenuOpen(false); }} 
                data-location-trigger
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaMapMarkerAlt className="text-green-600 text-xl" />
                <span className="font-medium">Set Location</span>
              </button>

              {userInfo && (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                    <FaUser className="text-green-600 text-xl" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <FaTachometerAlt className="text-green-600 text-xl" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  )}
                  <button onClick={logoutHandler} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                    <FaSignOutAlt className="text-xl" />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Location Card */}
      {showCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowCard(false)}>
          <div ref={cardRef} onClick={(e) => e.stopPropagation()}>
            <LocationCard setShowCard={setShowCard} />
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Header;
