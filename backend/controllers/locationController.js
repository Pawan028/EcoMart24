const asyncHandler = require('../middleware/asyncHandler');
const Pincode = require('../models/pincodeModel');

// @desc    Check if pincode is serviceable
// @route   POST /api/locations/check
// @access  Public
const checkServiceability = asyncHandler(async (req, res) => {
  const { pincode } = req.body;

  if (!pincode) {
    res.status(400);
    throw new Error('Please provide a pincode');
  }

  const location = await Pincode.findOne({ pincode: pincode.toString() });

  if (location && location.isServiceable) {
    res.json({
      serviceable: true,
      city: location.city,
      state: location.state,
      deliveryTime: location.deliveryTime,
      pincode: location.pincode,
    });
  } else {
    res.json({
      serviceable: false,
      message: 'Sorry, we do not deliver to this area yet',
    });
  }
});

// @desc    Get all serviceable pincodes
// @route   GET /api/locations/serviceable
// @access  Public
const getServiceablePincodes = asyncHandler(async (req, res) => {
  const pincodes = await Pincode.find({ isServiceable: true }).select('-__v');
  res.json(pincodes);
});

// @desc    Set user location
// @route   POST /api/locations/set
// @access  Private
const setUserLocation = asyncHandler(async (req, res) => {
  const { pincode, city, state } = req.body;

  // In a real app, you might save this to the user's profile
  res.json({
    success: true,
    location: {
      pincode,
      city,
      state,
    },
  });
});

module.exports = {
  checkServiceability,
  getServiceablePincodes,
  setUserLocation,
};
