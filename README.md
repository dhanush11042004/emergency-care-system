# Emergency Ambulance Allocation System

A MERN stack application for emergency ambulance allocation with real-time GPS tracking and hospital assignment.

## Features

- **Accident Reporting**: Submit emergency reports with location and severity
- **Automatic Allocation**: Finds nearest idle ambulance and appropriate hospital
- **Real-time Tracking**: GPS updates every 5 seconds
- **Interactive Map**: Visual route display with markers
- **IoT Simulation**: Backend flag for device status

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, React Router, Leaflet Maps
- **Database**: MongoDB with pre-seeded data

## Project Structure

```
ambulance-system/
├── backend/
│   ├── models/
│   │   ├── Accident.js
│   │   ├── Ambulance.js
│   │   └── Hospital.js
│   ├── controllers/
│   │   ├── accidentController.js
│   │   └── ambulanceController.js
│   ├── routes/
│   │   ├── accidents.js
│   │   └── ambulances.js
│   ├── utils/
│   │   └── distance.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── MapComponent.js
    │   ├── pages/
    │   │   ├── ReporterPage.js
    │   │   └── AmbulancePage.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (running on localhost:27017)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database:
```bash
node seed.js
```

4. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

Frontend will run on http://localhost:3000

## API Endpoints

### Accidents
- `POST /api/accidents` - Create new accident
- `GET /api/accidents?ambulanceId=<id>` - Get assignment for ambulance
- `PUT /api/accidents/:id/complete` - Mark accident as completed

### Ambulances
- `PUT /api/ambulances/:id/location` - Update ambulance location
- `GET /api/ambulances/:id/status` - Get ambulance status and IoT flag

## Usage

### Reporting an Accident
1. Go to "Report Accident" page
2. Enter latitude/longitude or use "Current Location"
3. Select severity level (1-3)
4. Enter number of people involved
5. Submit the report

### Ambulance Operations
1. Go to "Ambulance View" page
2. Enter ambulance ID (AMB001, AMB002, or AMB003)
3. Click "Connect" to start receiving assignments
4. View assignment details and map with route
5. Click "Complete Assignment" when finished

## Sample Data

### Hospitals
- City General Hospital (Severity 3)
- Metro Medical Center (Severity 2)
- Downtown Clinic (Severity 1)
- Emergency Care Unit (Severity 3)

### Ambulances
- AMB001, AMB002, AMB003 (all initially idle)

## Key Features Implementation

### Distance Calculation
Uses Haversine formula for accurate distance calculation between coordinates.

### Automatic Assignment
- Finds nearest idle ambulance to accident location
- Finds nearest hospital that can handle the severity level
- Updates ambulance status to "in_route"

### Real-time Updates
- Ambulance location updates every 5 seconds
- Map refreshes automatically
- IoT status indicator shows device activity

### Map Visualization
- Blue marker: Ambulance location
- Red marker: Accident location
- Green marker: Hospital destination
- Blue line: Route between ambulance and hospital

## Development Notes

- No authentication required (demo scope)
- Single ambulance per accident
- Single hospital per accident
- CRUD-based implementation only
- No WebSockets or cron jobs
- IoT simulation via backend flag