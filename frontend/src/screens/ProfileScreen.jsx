import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaTimes, FaShoppingBag, FaBox, FaTruck, FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
            <FaUser className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your profile and view your order history
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'profile'
                ? 'bg-white shadow-lg text-green-600'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            <FaUser className="inline mr-2" />
            Profile Settings
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-white shadow-lg text-green-600'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            <FaShoppingBag className="inline mr-2" />
            My Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Update Profile</h2>
            
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  loadingUpdateProfile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/50'
                }`}
              >
                {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order History</h2>
            
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 font-semibold">
                  {error?.data?.message || error.error}
                </p>
              </div>
            ) : orders && orders.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg mb-4">No orders yet</p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      {/* Order Info */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FaBox className="text-green-600" />
                          <span className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <FaCalendar className="text-gray-400" />
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          Total: ₹{order.totalPrice}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          {order.isPaid ? (
                            <>
                              <FaCheckCircle className="text-green-500" />
                              <span className="text-sm text-green-600 font-semibold">
                                Paid on {new Date(order.paidAt).toLocaleDateString()}
                              </span>
                            </>
                          ) : (
                            <>
                              <FaTimes className="text-red-500" />
                              <span className="text-sm text-red-600 font-semibold">Not Paid</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {order.isDelivered ? (
                            <>
                              <FaTruck className="text-green-500" />
                              <span className="text-sm text-green-600 font-semibold">
                                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                              </span>
                            </>
                          ) : (
                            <>
                              <FaTruck className="text-orange-500" />
                              <span className="text-sm text-orange-600 font-semibold">
                                In Transit
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <Link
                        to={`/order/${order._id}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
