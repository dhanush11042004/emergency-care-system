import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import { accidentService, ambulanceService } from '../services/api';

const AmbulancePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ambulanceId, setAmbulanceId] = useState(location.state?.ambulanceId || '');
  const [assignment, setAssignment] = useState(null);
  const [ambulanceStatus, setAmbulanceStatus] = useState(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);


  useEffect(() => {
    if (!ambulanceId) {
      navigate('/');
      return;
    }
    
    checkAssignment();
    updateAmbulanceLocation();
    checkAmbulanceStatus();
    
    const interval = setInterval(() => {
      checkAssignment();
      updateAmbulanceLocation();
      checkAmbulanceStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [ambulanceId, navigate]);

  const checkAssignment = async () => {
    try {
      const response = await accidentService.getAccidentByAmbulance(ambulanceId);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error checking assignment:', error);
    }
  };

  const updateAmbulanceLocation = () => {
    if (navigator.geolocation && ambulanceId) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          
          setAmbulanceLocation(location);
          
          try {
            await ambulanceService.updateLocation(ambulanceId, location);
          } catch (error) {
            console.error('Error updating location:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback location for demo
          const fallbackLocation = { latitude: 40.7128, longitude: -74.0060 };
          setAmbulanceLocation(fallbackLocation);
        }
      );
    }
  };



  const checkAmbulanceStatus = async () => {
    if (ambulanceId) {
      try {
        const response = await ambulanceService.getStatus(ambulanceId);
        setAmbulanceStatus(response.data.status);
      } catch (error) {
        console.error('Error checking ambulance status:', error);
      }
    }
  };

  const completeAssignment = async () => {
    if (assignment) {
      try {
        await accidentService.completeAccident(assignment._id);
        setAssignment(null);
        alert('Assignment completed successfully!');
      } catch (error) {
        alert('Error completing assignment');
      }
    }
  };

  const logout = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Ambulance Dashboard - {ambulanceId}</h2>
        <button onClick={logout} style={{ padding: '5px 15px', cursor: 'pointer' }}>Logout</button>
      </div>

      {(assignment || ambulanceStatus === 'in_route') ? (
        <div>
          {assignment && (
            <div className="assignment-info">
              <h3>Current Assignment</h3>
              <p><strong>Accident Location:</strong> {assignment.latitude}, {assignment.longitude}</p>
              <p><strong>Severity:</strong> Level {assignment.severity}</p>
              <p><strong>People Involved:</strong> {assignment.totalPeople}</p>
              <p><strong>Hospital:</strong> {assignment.hospitalId?.name}</p>
              <p><strong>Hospital Location:</strong> {assignment.hospitalId?.latitude}, {assignment.hospitalId?.longitude}</p>
              
              <button className="btn btn-danger" onClick={completeAssignment}>
                Complete Assignment
              </button>
            </div>
          )}

          {ambulanceStatus === 'in_route' && assignment && ambulanceLocation && (
            <MapComponent
              ambulanceLocation={ambulanceLocation}
              hospitalLocation={{
                latitude: assignment.hospitalId?.latitude,
                longitude: assignment.hospitalId?.longitude
              }}
            />
          )}
        </div>
      ) : (
        <div className="alert alert-info">
          No current assignment. Waiting for emergency calls...
        </div>
      )}
    </div>
  );
};

export default AmbulancePage;