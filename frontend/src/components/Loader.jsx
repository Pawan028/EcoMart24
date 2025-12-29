import { FaLeaf } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Spinning Rings */}
        <div className="w-24 h-24 relative">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-spin"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-2 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-4 border-4 border-green-600 border-t-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FaLeaf className="text-green-600 text-2xl animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 text-center">
          <p className="text-green-600 font-semibold animate-pulse">Loading...</p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
