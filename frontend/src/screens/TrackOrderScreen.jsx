import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useEffect } from 'react';

const TrackOrderScreen = () => {
  const { id } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(id);

  // Refetch data periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  const status = order?.status || {};
  const timestamps = order?.timestamps || {};

  const trackingSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: '✓' },
    { key: 'placed', label: 'Order Placed', icon: '📦' },
    { key: 'shipped', label: 'Shipped', icon: '🚚' },
    { key: 'outForDelivery', label: 'Out for Delivery', icon: '🛵' },
    { key: 'delivered', label: 'Delivered', icon: '✨' },
  ];

  const getCurrentStep = () => {
    if (status.delivered) return 4;
    if (status.outForDelivery) return 3;
    if (status.shipped) return 2;
    if (status.placed) return 1;
    if (status.confirmed) return 0;
    return -1;
  };

  const currentStepIndex = getCurrentStep();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Order ID: <span className="font-mono font-semibold">#{order._id.slice(-8)}</span>
          </p>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
          {/* Progress Bar */}
          <div className="relative mb-16">
            <div className="flex justify-between items-center">
              {trackingSteps.map((step, index) => (
                <div key={step.key} className="flex-1 relative">
                  {/* Connector Line */}
                  {index < trackingSteps.length - 1 && (
                    <div className="absolute top-10 left-1/2 w-full h-1 -z-10">
                      <div className="w-full h-full bg-gray-200 rounded"></div>
                      <div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded transition-all duration-500 ${
                          index < currentStepIndex ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  )}

                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 transition-all duration-300 ${
                        index <= currentStepIndex
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/50 scale-110'
                          : 'bg-gray-200'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-semibold mb-1 ${
                          index <= currentStepIndex ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500">
                        {timestamps[step.key]
                          ? new Date(timestamps[step.key]).toLocaleString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : index === currentStepIndex + 1
                          ? 'Processing...'
                          : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            {status.delivered ? (
              <div>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  🎉 Order Delivered Successfully!
                </p>
                <p className="text-gray-700">
                  Thank you for shopping with EcoMart. We hope you enjoy your fresh products!
                </p>
              </div>
            ) : status.outForDelivery ? (
              <div>
                <p className="text-2xl font-bold text-orange-600 mb-2">
                  🚚 Out for Delivery
                </p>
                <p className="text-gray-700">
                  Your order is on its way! Expected delivery within 2 hours.
                </p>
              </div>
            ) : status.shipped ? (
              <div>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  📦 Order Shipped
                </p>
                <p className="text-gray-700">
                  Your order has been shipped and is in transit.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  ✓ Order Confirmed
                </p>
                <p className="text-gray-700">
                  We're preparing your order for shipment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderScreen;
