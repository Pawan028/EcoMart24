// ProductSkeleton - Loading skeleton for product cards
export const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

// CardSkeleton - Generic card loading skeleton
export const CardSkeleton = ({ height = 'h-48' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 animate-pulse ${height}`}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

// ListSkeleton - Loading skeleton for list items
export const ListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// TableSkeleton - Loading skeleton for tables
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              {[...Array(columns)].map((_, index) => (
                <th key={index} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-200">
                {[...Array(columns)].map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ImageSkeleton - Loading skeleton for images
export const ImageSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 animate-pulse ${className}`}>
      <div className="w-full h-full flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

// TextSkeleton - Loading skeleton for text
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
};
