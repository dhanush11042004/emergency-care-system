const express = require('express');
const router = express.Router();
const {
  updateLocation,
  getAmbulanceStatus
} = require('../controllers/ambulanceController');

router.put('/:id/location', updateLocation);
router.get('/:id/status', getAmbulanceStatus);

module.exports = router;