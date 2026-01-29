import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ReporterPage from './pages/ReporterPage';
import AmbulancePage from './pages/AmbulancePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reporter" element={<ReporterPage />} />
          <Route path="/ambulance" element={<AmbulancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;