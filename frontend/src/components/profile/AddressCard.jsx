import React from 'react';
import { FaHome, FaBriefcase, FaMapMarkerAlt, FaPhone, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    const getAddressIcon = () => {
        switch (address.addressType) {
            case 'Home':
                return <FaHome className="text-green-600" />;
            case 'Office':
                return <FaBriefcase className="text-blue-600" />;
            default:
                return <FaMapMarkerAlt className="text-gray-600" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 relative ${address.isDefault ? 'border-2 border-green-500' : 'border border-gray-200'
                }`}
        >
            {/* Default Badge */}
            {address.isDefault && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    <FaStar className="text-xs" />
                    <span>Default</span>
                </div>
            )}

            {/* Address Type Icon & Tag */}
            <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getAddressIcon()}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{address.addressType}</h3>
                    <p className="text-sm text-gray-600">{address.fullName}</p>
                </div>
            </div>

            {/* Address Details */}
            <div className="space-y-1 text-gray-700 mb-4">
                <p className="leading-relaxed">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                </p>
                {address.landmark && (
                    <p className="text-sm text-gray-600">Landmark: {address.landmark}</p>
                )}
                <p className="font-semibold">
                    {address.city}, {address.state} - {address.pincode}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaPhone className="text-xs" />
                    <span>{address.phone}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
                {!address.isDefault && (
                    <button
                        onClick={() => onSetDefault(address._id)}
                        className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Set as Default
                    </button>
                )}
                <button
                    onClick={() => onEdit(address)}
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <FaEdit />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(address._id)}
                    className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <FaTrash />
                    Delete
                </button>
            </div>
        </motion.div>
    );
};

export default AddressCard;
