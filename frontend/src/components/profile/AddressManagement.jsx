import React, { useState } from 'react';
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    useGetAddressesQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useSetDefaultAddressMutation,
} from '../../slices/addressApiSlice';
import AddressCard from './AddressCard';
import AddressModal from './AddressModal';
import Loader from '../Loader';
import { motion } from 'framer-motion';

const AddressManagement = () => {
    const { data: addresses, isLoading, error, refetch } = useGetAddressesQuery();
    const [createAddress] = useCreateAddressMutation();
    const [updateAddress] = useUpdateAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    const [setDefaultAddress] = useSetDefaultAddressMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState(null);

    const handleAddNew = () => {
        setAddressToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (address) => {
        setAddressToEdit(address);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (addressToEdit) {
                // Update existing address
                await updateAddress({ id: addressToEdit._id, ...formData }).unwrap();
                toast.success('Address updated successfully!');
            } else {
                // Create new address
                await createAddress(formData).unwrap();
                toast.success('Address added successfully!');
            }
            setIsModalOpen(false);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to save address');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await deleteAddress(id).unwrap();
                toast.success('Address deleted successfully!');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || 'Failed to delete address');
            }
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await setDefaultAddress(id).unwrap();
            toast.success('Default address updated!');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to set default address');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">My Addresses</h2>
                    <p className="text-gray-600 text-sm">
                        Manage your delivery addresses
                    </p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                >
                    <FaPlus />
                    <span>Add New</span>
                </button>
            </div>

            {/* Address List */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="text-center py-12">
                    <p className="text-red-600 font-semibold">
                        {error?.data?.message || error.error}
                    </p>
                </div>
            ) : !addresses || addresses.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaMapMarkerAlt className="text-5xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        No addresses saved yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Add your first address to start shopping!
                    </p>
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address._id}
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                        />
                    ))}
                </div>
            )}

            {/* Address Modal */}
            <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                addressToEdit={addressToEdit}
            />
        </motion.div>
    );
};

export default AddressManagement;
