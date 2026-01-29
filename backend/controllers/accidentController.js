const Accident = require('../models/Accident');
const Ambulance = require('../models/Ambulance');
const Hospital = require('../models/Hospital');
const { calculateDistance } = require('../utils/distance');

const createAccident = async (req, res) => {
  try {
    const { latitude, longitude, severity, totalPeople } = req.body;

    const accident = new Accident({
      latitude,
      longitude,
      severity,
      totalPeople
    });

    const savedAccident = await accident.save();

    const nearestAmbulance = await findNearestIdleAmbulance(latitude, longitude);
    const nearestHospital = await findNearestHospitalBySeverity(latitude, longitude, severity);

    if (nearestAmbulance && nearestHospital) {
      savedAccident.ambulanceId = nearestAmbulance._id;
      savedAccident.hospitalId = nearestHospital._id;
      savedAccident.status = 'assigned';
      await savedAccident.save();

      nearestAmbulance.status = 'in_route';
      await nearestAmbulance.save();
    }

    res.status(201).json(savedAccident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccidentByAmbulance = async (req, res) => {
  try {
    const { ambulanceId } = req.query;
    
    // First find the ambulance by its string ID
    const ambulance = await Ambulance.findOne({ ambulanceId });
    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }
    
    // Then find the accident using the ambulance's ObjectId
    const accident = await Accident.findOne({ 
      ambulanceId: ambulance._id, 
      status: 'assigned' 
    }).populate('hospitalId');
    
    res.json(accident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeAccident = async (req, res) => {
  try {
    const { id } = req.params;
    const accident = await Accident.findById(id);
    
    if (!accident) {
      return res.status(404).json({ error: 'Accident not found' });
    }

    accident.status = 'completed';
    await accident.save();

    if (accident.ambulanceId) {
      await Ambulance.findByIdAndUpdate(accident.ambulanceId, { status: 'idle' });
    }

    res.json(accident);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findNearestIdleAmbulance = async (lat, lon) => {
  const ambulances = await Ambulance.find({ status: 'idle' });
  let nearest = null;
  let minDistance = Infinity;

  ambulances.forEach(ambulance => {
    const distance = calculateDistance(lat, lon, ambulance.latitude, ambulance.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = ambulance;
    }
  });

  return nearest;
};

const findNearestHospitalBySeverity = async (lat, lon, severity) => {
  const hospitals = await Hospital.find({ severityLevel: { $gte: severity } });
  let nearest = null;
  let minDistance = Infinity;

  hospitals.forEach(hospital => {
    const distance = calculateDistance(lat, lon, hospital.latitude, hospital.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = hospital;
    }
  });

  return nearest;
};

module.exports = {
  createAccident,
  getAccidentByAmbulance,
  completeAccident
};