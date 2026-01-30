const Ambulance = require('../models/Ambulance');

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude } = req.body;

    const ambulance = await Ambulance.findOneAndUpdate(
      { ambulanceId: id },
      { latitude, longitude, lastUpdated: new Date() },
      { new: true }
    );

    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }

    res.json(ambulance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAmbulanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ambulance = await Ambulance.findOne({ ambulanceId: id });

    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }

    res.json({
      status: ambulance.status,
      iotActive: ambulance.status === 'in_route'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllInRouteAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find({ status: 'in_route' });
    res.json(ambulances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateLocation,
  getAmbulanceStatus,
  getAllInRouteAmbulances
};