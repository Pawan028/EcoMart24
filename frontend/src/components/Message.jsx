import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

const Message = ({ variant = 'info', children }) => {
  const variants = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: FaCheckCircle,
      iconColor: 'text-green-500',
    },
    danger: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: FaTimesCircle,
      iconColor: 'text-red-500',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: FaExclamationCircle,
      iconColor: 'text-yellow-500',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: FaInfoCircle,
      iconColor: 'text-blue-500',
    },
  };

  const config = variants[variant] || variants.info;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} ${config.text} border-l-4 p-4 rounded-lg shadow-sm flex items-start space-x-3 animate-fadeIn`}>
      <Icon className={`${config.iconColor} text-xl flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Message;
