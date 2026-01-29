const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  severity: { type: Number, required: true, min: 1, max: 3 },
  totalPeople: { type: Number, required: true },
  ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  status: { type: String, enum: ['pending', 'assigned', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accident', accidentSchema);