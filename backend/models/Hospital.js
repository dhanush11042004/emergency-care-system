const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  severityLevel: { type: Number, required: true, min: 1, max: 3 }
});

module.exports = mongoose.model('Hospital', hospitalSchema);