import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBox = ({ showPopular = false }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [isFocused, setIsFocused] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setKeyword('');
    navigate('/');
  };

  return (
    <form onSubmit={submitHandler} className="w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center bg-white rounded-full shadow-md transition-all duration-300 ${
          isFocused ? 'shadow-lg ring-2 ring-green-500/50' : 'shadow-md'
        }`}
      >
        {/* Search Icon */}
        <div className="pl-6 pr-3">
          <FaSearch className={`text-lg transition-colors duration-200 ${isFocused ? 'text-green-600' : 'text-gray-400'}`} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for fresh vegetables, fruits, groceries..."
          className="flex-1 py-4 px-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-base"
        />

        {/* Clear Button */}
        {keyword && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-2 mr-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="m-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </div>

      {/* Popular Searches - Only show if showPopular prop is true */}
      {showPopular && (
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-sm text-gray-500">Popular:</span>
          {['Tomato', 'Onion', 'Milk', 'Rice', 'Fruits'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setKeyword(term);
                navigate(`/search/${term}`);
              }}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-full transition-colors duration-200"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBox;
