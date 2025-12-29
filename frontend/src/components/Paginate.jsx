import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  const getPageUrl = (pageNum) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNum}`;
    }
    return keyword ? `/search/${keyword}/page/${pageNum}` : `/page/${pageNum}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5; // Maximum page numbers to show

    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pageNumbers.push(
        <Link
          key={1}
          to={getPageUrl(1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="w-10 h-10 flex items-center justify-center text-gray-400">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link
          key={i}
          to={getPageUrl(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${
            i === page
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50 scale-110'
              : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm hover:shadow-md'
          }`}
        >
          {i}
        </Link>
      );
    }

    // Add ellipsis and last page if needed
    if (endPage < pages) {
      if (endPage < pages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="w-10 h-10 flex items-center justify-center text-gray-400">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <Link
          key={pages}
          to={getPageUrl(pages)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        >
          {pages}
        </Link>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="flex items-center justify-center space-x-2 py-8" aria-label="Pagination">
      {/* Previous Button */}
      <Link
        to={getPageUrl(Math.max(1, page - 1))}
        className={`flex items-center space-x-2 px-4 h-10 rounded-lg font-medium transition-all duration-200 ${
          page === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm hover:shadow-md'
        }`}
        onClick={(e) => page === 1 && e.preventDefault()}
      >
        <FaChevronLeft className="text-sm" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {renderPageNumbers()}
      </div>

      {/* Next Button */}
      <Link
        to={getPageUrl(Math.min(pages, page + 1))}
        className={`flex items-center space-x-2 px-4 h-10 rounded-lg font-medium transition-all duration-200 ${
          page === pages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm hover:shadow-md'
        }`}
        onClick={(e) => page === pages && e.preventDefault()}
      >
        <span className="hidden sm:inline">Next</span>
        <FaChevronRight className="text-sm" />
      </Link>
    </nav>
  );
};

export default Paginate;
