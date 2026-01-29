const express = require('express');
const router = express.Router();
const {
  createAccident,
  getAccidentByAmbulance,
  completeAccident
} = require('../controllers/accidentController');

router.post('/', createAccident);
router.get('/', getAccidentByAmbulance);
router.put('/:id/complete', completeAccident);

module.exports = router;