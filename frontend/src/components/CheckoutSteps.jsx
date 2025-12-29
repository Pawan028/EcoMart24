import { Link } from 'react-router-dom';
import { FaCheck, FaUser, FaTruck, FaCreditCard, FaShoppingBag } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { num: 1, label: 'Sign In', icon: FaUser, path: '/login', active: step1 },
    { num: 2, label: 'Shipping', icon: FaTruck, path: '/shipping', active: step2 },
    { num: 3, label: 'Payment', icon: FaCreditCard, path: '/payment', active: step3 },
    { num: 4, label: 'Place Order', icon: FaShoppingBag, path: '/placeorder', active: step4 },
  ];

  return (
    <div className="w-full py-8 px-4">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = steps.slice(0, index).every(s => s.active);
          const isCurrent = step.active && !steps[index + 1]?.active;
          
          return (
            <div key={step.num} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                {step.active ? (
                  <Link
                    to={step.path}
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 transform hover:scale-110 ${
                      isCurrent
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/50 animate-pulse'
                        : isCompleted
                        ? 'bg-green-500 border-green-400'
                        : 'bg-white border-green-500'
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheck className="text-white text-xl" />
                    ) : (
                      <Icon className={`text-2xl ${isCurrent ? 'text-white' : 'text-green-500'}`} />
                    )}
                  </Link>
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-300 bg-gray-100 cursor-not-allowed">
                    <Icon className="text-2xl text-gray-400" />
                  </div>
                )}
                
                {/* Label */}
                <span
                  className={`mt-3 font-semibold text-sm whitespace-nowrap ${
                    step.active ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 relative">
                  <div className="absolute inset-0 bg-gray-300 rounded"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded transition-all duration-500 ${
                      steps[index + 1]?.active ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col space-y-4 max-w-sm mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = steps.slice(0, index).every(s => s.active);
          const isCurrent = step.active && !steps[index + 1]?.active;

          return (
            <div key={step.num} className="flex items-center space-x-4">
              {/* Vertical Line */}
              {index > 0 && (
                <div className="absolute left-8 w-0.5 h-12 -mt-12 bg-gray-300">
                  {step.active && (
                    <div className="w-full bg-gradient-to-b from-green-500 to-emerald-600 h-full"></div>
                  )}
                </div>
              )}

              {/* Step Circle */}
              {step.active ? (
                <Link
                  to={step.path}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4 flex-shrink-0 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-lg shadow-green-500/50'
                      : isCompleted
                      ? 'bg-green-500 border-green-400'
                      : 'bg-white border-green-500'
                  }`}
                >
                  {isCompleted ? (
                    <FaCheck className="text-white text-lg" />
                  ) : (
                    <Icon className={`text-xl ${isCurrent ? 'text-white' : 'text-green-500'}`} />
                  )}
                </Link>
              ) : (
                <div className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-gray-300 bg-gray-100 flex-shrink-0">
                  <Icon className="text-xl text-gray-400" />
                </div>
              )}

              {/* Label and Description */}
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    step.active ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.num === 1 && 'Login to your account'}
                  {step.num === 2 && 'Enter delivery address'}
                  {step.num === 3 && 'Choose payment method'}
                  {step.num === 4 && 'Review and confirm'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
