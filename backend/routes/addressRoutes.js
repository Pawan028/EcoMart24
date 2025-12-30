const express = require('express');
const router = express.Router();
const {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} = require('../controllers/addressController.js');
const { protect } = require('../middleware/authMiddleware.js');

// All routes require authentication
router.route('/').get(protect, getAddresses).post(protect, createAddress);
router.route('/:id').get(protect, getAddressById).put(protect, updateAddress).delete(protect, deleteAddress);
router.route('/:id/default').put(protect, setDefaultAddress);

module.exports = router;
