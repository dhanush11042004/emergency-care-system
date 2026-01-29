const mongoose = require('mongoose');
require('dotenv').config();
const Hospital = require('./models/Hospital');
const Ambulance = require('./models/Ambulance');

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    await Hospital.deleteMany({});
    await Ambulance.deleteMany({});

    const hospitals = [
      { name: 'Apollo Hospital Chennai', latitude: 13.0827, longitude: 80.2707, severityLevel: 3 },
      { name: 'AIIMS Delhi', latitude: 28.5672, longitude: 77.2100, severityLevel: 2 },
      { name: 'Care Hospital Hyderabad', latitude: 17.4065, longitude: 78.4772, severityLevel: 1 },
      { name: 'Fortis Hospital Hyderabad', latitude: 17.4399, longitude: 78.3489, severityLevel: 3 }
    ];

    const ambulances = [
      { ambulanceId: 'AMB001', latitude: 13.0878, longitude: 80.2785, status: 'idle' },
      { ambulanceId: 'AMB002', latitude: 28.6139, longitude: 77.2090, status: 'idle' },
      { ambulanceId: 'AMB003', latitude: 17.4126, longitude: 78.4656, status: 'idle' }
    ];

    await Hospital.insertMany(hospitals);
    await Ambulance.insertMany(ambulances);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();