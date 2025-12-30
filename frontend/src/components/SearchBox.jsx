import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaClock, FaFire, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBox = ({ showPopular = false, compact = false }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  // Trending/Popular searches
  const trendingSearches = [
    { term: 'Fresh Tomatoes', icon: '🍅' },
    { term: 'Organic Milk', icon: '🥛' },
    { term: 'Brown Rice', icon: '🍚' },
    { term: 'Green Apples', icon: '🍏' },
    { term: 'Whole Wheat Bread', icon: '🍞' },
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToRecent = (term) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      saveToRecent(keyword.trim());
      navigate(`/search/${keyword.trim()}`);
      setShowSuggestions(false);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  const handleSuggestionClick = (term) => {
    setKeyword(term);
    saveToRecent(term);
    navigate(`/search/${term}`);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  if (compact) {
    return (
      <form onSubmit={submitHandler} className="w-full">
        <div className={`relative flex items-center bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 ${isFocused ? 'bg-white shadow-lg ring-2 ring-white/30' : ''
          }`}>
          <div className="pl-4 pr-2">
            <FaSearch className={`text-sm transition-colors duration-200 ${isFocused ? 'text-primary-600' : 'text-white/70'}`} />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search..."
            className={`flex-1 py-2 px-2 bg-transparent focus:outline-none text-sm ${isFocused ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-white/70'
              }`}
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <FaTimes className="text-sm text-white/70" />
            </button>
          )}
        </div>
      </form>
    );
  }

  return (
    <div ref={searchRef} className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={submitHandler}>
        <motion.div
          initial={false}
          animate={{
            boxShadow: isFocused
              ? '0 20px 60px rgba(0, 0, 0, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
          className={`relative flex items-center bg-white rounded-2xl transition-all duration-300 ${isFocused ? 'ring-2 ring-primary-500/30' : ''
            }`}
        >
          {/* Search Icon */}
          <div className="pl-6 pr-3">
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                rotate: isFocused ? 15 : 0
              }}
            >
              <FaSearch className={`text-lg transition-colors duration-200 ${isFocused ? 'text-primary-600' : 'text-gray-400'
                }`} />
            </motion.div>
          </div>

          {/* Input Field */}
          <input
            type="text"
            name="q"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for fresh vegetables, fruits, groceries..."
            className="flex-1 py-4 px-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
          />

          {/* Clear Button */}
          {keyword && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => setKeyword('')}
              className="p-2 mx-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-400" />
            </motion.button>
          )}

          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="m-1.5 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <span>Search</span>
            <FaArrowRight className="text-sm" />
          </motion.button>
        </motion.div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100"
          >
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaClock className="text-gray-400" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((term, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(term)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                      >
                        <FaSearch className="text-gray-400 text-sm group-hover:text-primary-500" />
                        <span className="text-sm text-gray-700 group-hover:text-primary-600">{term}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700">
                  <FaFire className="text-orange-500" />
                  <span>Trending Now</span>
                </div>
                <div className="space-y-1">
                  {trendingSearches.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(item.term)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 rounded-lg transition-all text-left group"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-primary-700 font-medium">{item.term}</span>
                      <FaArrowRight className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular Searches - Only show if showPopular prop is true */}
      {showPopular && !showSuggestions && (
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-sm text-gray-500">Popular:</span>
          {trendingSearches.slice(0, 5).map((item) => (
            <button
              key={item.term}
              type="button"
              onClick={() => handleSuggestionClick(item.term)}
              className="px-4 py-2 text-sm bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-full transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary-300 flex items-center gap-2"
            >
              <span>{item.icon}</span>
              <span>{item.term}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
