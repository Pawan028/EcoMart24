const asyncHandler = require('../middleware/asyncHandler.js');
const Address = require('../models/addressModel.js');

// @desc    Get all user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
});

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Private
const getAddressById = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address && address.user.toString() === req.user._id.toString()) {
        res.json(address);
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

// @desc    Create new address
// @route   POST /api/addresses
// @access  Private
const createAddress = asyncHandler(async (req, res) => {
    const {
        fullName,
        phone,
        pincode,
        addressLine1,
        addressLine2,
        city,
        state,
        landmark,
        addressType,
        isDefault,
    } = req.body;

    // Check if this is the first address, make it default
    const addressCount = await Address.countDocuments({ user: req.user._id });
    const shouldBeDefault = addressCount === 0 || isDefault;

    const address = new Address({
        user: req.user._id,
        fullName,
        phone,
        pincode,
        addressLine1,
        addressLine2,
        city,
        state,
        landmark,
        addressType,
        isDefault: shouldBeDefault,
    });

    const createdAddress = await address.save();
    res.status(201).json(createdAddress);
});

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address && address.user.toString() === req.user._id.toString()) {
        address.fullName = req.body.fullName || address.fullName;
        address.phone = req.body.phone || address.phone;
        address.pincode = req.body.pincode || address.pincode;
        address.addressLine1 = req.body.addressLine1 || address.addressLine1;
        address.addressLine2 = req.body.addressLine2 !== undefined ? req.body.addressLine2 : address.addressLine2;
        address.city = req.body.city || address.city;
        address.state = req.body.state || address.state;
        address.landmark = req.body.landmark !== undefined ? req.body.landmark : address.landmark;
        address.addressType = req.body.addressType || address.addressType;

        if (req.body.isDefault !== undefined) {
            address.isDefault = req.body.isDefault;
        }

        const updatedAddress = await address.save();
        res.json(updatedAddress);
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address && address.user.toString() === req.user._id.toString()) {
        await Address.deleteOne({ _id: address._id });
        res.json({ message: 'Address removed' });
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

// @desc    Set default address
// @route   PUT /api/addresses/:id/default
// @access  Private
const setDefaultAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);

    if (address && address.user.toString() === req.user._id.toString()) {
        // Remove default from all user addresses
        await Address.updateMany({ user: req.user._id }, { isDefault: false });

        // Set this address as default
        address.isDefault = true;
        const updatedAddress = await address.save();

        res.json(updatedAddress);
    } else {
        res.status(404);
        throw new Error('Address not found');
    }
});

module.exports = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};
