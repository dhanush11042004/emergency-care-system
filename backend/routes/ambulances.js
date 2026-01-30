const express = require('express');
const router = express.Router();
const {
  updateLocation,
  getAmbulanceStatus,
  getAllInRouteAmbulances
} = require('../controllers/ambulanceController');

router.get('/in-route', getAllInRouteAmbulances);
router.put('/:id/location', updateLocation);
router.get('/:id/status', getAmbulanceStatus);

module.exports = router;