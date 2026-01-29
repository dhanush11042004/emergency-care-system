import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ambulanceService } from '../services/api';

function LoginPage() {
  const [userType, setUserType] = useState('');
  const [ambulanceId, setAmbulanceId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setError('');
    if (type === 'user') {
      navigate('/reporter');
    }
  };

  const handleAmbulanceLogin = async () => {
    if (!ambulanceId.trim()) {
      setError('Please enter ambulance ID');
      return;
    }

    try {
      const response = await ambulanceService.getStatus(ambulanceId);
      if (response.data) {
        navigate('/ambulance', { state: { ambulanceId } });
      }
    } catch (error) {
      setError('Invalid ambulance ID');
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Emergency Ambulance System</h2>
      
      {!userType && (
        <div>
          <h3>Select User Type</h3>
          <button 
            onClick={() => handleUserTypeSelect('user')}
            style={{ padding: '15px 30px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
          >
            Regular User
          </button>
          <br />
          <button 
            onClick={() => handleUserTypeSelect('ambulance')}
            style={{ padding: '15px 30px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
          >
            Ambulance Driver
          </button>
        </div>
      )}

      {userType === 'ambulance' && (
        <div>
          <h3>Ambulance Login</h3>
          <input
            type="text"
            placeholder="Enter Ambulance ID (e.g., AMB001)"
            value={ambulanceId}
            onChange={(e) => setAmbulanceId(e.target.value)}
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
          <br />
          <button 
            onClick={handleAmbulanceLogin}
            style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}
          >
            Login
          </button>
          <br />
          <button 
            onClick={() => setUserType('')}
            style={{ padding: '5px 15px', margin: '10px', cursor: 'pointer', fontSize: '12px' }}
          >
            Back
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p style={{ fontSize: '12px', color: '#666' }}>
            Sample IDs: AMB001, AMB002, AMB003
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;