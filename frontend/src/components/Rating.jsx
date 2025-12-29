import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className="flex items-center gap-0.5" style={{ color }}>
        <span className="transition-transform hover:scale-125">
          {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className="transition-transform hover:scale-125">
          {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className="transition-transform hover:scale-125">
          {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className="transition-transform hover:scale-125">
          {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className="transition-transform hover:scale-125">
          {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      </div>
      {text && (
        <span className='text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full'>
          {text} {text === '1' ? 'review' : 'reviews'}
        </span>
      )}
    </div>
  );
};

Rating.defaultProps = {
  color: '#facc15',
};

export default Rating;
