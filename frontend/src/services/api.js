import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const accidentService = {
  createAccident: (data) => api.post('/accidents', data),
  getAccidentByAmbulance: (ambulanceId) => api.get(`/accidents?ambulanceId=${ambulanceId}`),
  completeAccident: (id) => api.put(`/accidents/${id}/complete`)
};

export const ambulanceService = {
  updateLocation: (id, location) => api.put(`/ambulances/${id}/location`, location),
  getStatus: (id) => api.get(`/ambulances/${id}/status`)
};