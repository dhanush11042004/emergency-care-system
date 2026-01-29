const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  ambulanceId: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, enum: ['idle', 'in_route'], default: 'idle' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ambulance', ambulanceSchema);