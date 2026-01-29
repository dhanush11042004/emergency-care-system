import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accidentService } from '../services/api';

const ReporterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    severity: 1,
    totalPeople: 1
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await accidentService.createAccident({
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        severity: parseInt(formData.severity),
        totalPeople: parseInt(formData.totalPeople)
      });
      
      setMessage('Accident reported successfully! Emergency services have been notified.');
      setFormData({ latitude: '', longitude: '', severity: 1, totalPeople: 1 });
    } catch (error) {
      setMessage('Error reporting accident. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        });
      });
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Report Emergency Accident</h2>
        <button onClick={() => navigate('/')} style={{ padding: '5px 15px', cursor: 'pointer' }}>Back</button>
      </div>
      
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Latitude:</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Longitude:</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </div>

          <button type="button" className="btn" onClick={getCurrentLocation}>
            Use Current Location
          </button>

          <div className="form-group">
            <label>Severity Level:</label>
            <select name="severity" value={formData.severity} onChange={handleChange}>
              <option value={1}>Level 1 - Minor</option>
              <option value={2}>Level 2 - Moderate</option>
              <option value={3}>Level 3 - Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Total People Involved:</label>
            <input
              type="number"
              min="1"
              name="totalPeople"
              value={formData.totalPeople}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger">
            Report Emergency
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReporterPage;