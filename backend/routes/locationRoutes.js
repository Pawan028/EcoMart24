const express = require('express');
const router = express.Router();
const {
  checkServiceability,
  getServiceablePincodes,
  setUserLocation,
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/check', checkServiceability);
router.get('/serviceable', getServiceablePincodes);
router.post('/set', protect, setUserLocation);

module.exports = router;
