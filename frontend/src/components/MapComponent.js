import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const ambulanceIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ff0000"/>
      <circle cx="12.5" cy="12.5" r="8" fill="white"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const MapComponent = ({ ambulanceLocation, hospitalLocation }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  if (!ambulanceLocation?.latitude || !hospitalLocation?.latitude) {
    return null;
  }

  const center = [Number(ambulanceLocation.latitude), Number(ambulanceLocation.longitude)];

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const sourceLng = Number(ambulanceLocation.longitude);
        const sourceLat = Number(ambulanceLocation.latitude);
        const destLng = Number(hospitalLocation.longitude);
        const destLat = Number(hospitalLocation.latitude);

        const url = `https://router.project-osrm.org/route/v1/driving/${sourceLng},${sourceLat};${destLng},${destLat}?overview=full&geometries=geojson`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.routes && data.routes[0]) {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRouteCoordinates(coordinates);
        }
      } catch (error) {
        console.error('Failed to fetch route:', error);
        // Fallback to straight line
        setRouteCoordinates([
          [Number(ambulanceLocation.latitude), Number(ambulanceLocation.longitude)],
          [Number(hospitalLocation.latitude), Number(hospitalLocation.longitude)]
        ]);
      }
    };

    fetchRoute();
  }, [ambulanceLocation.latitude, ambulanceLocation.longitude, hospitalLocation.latitude, hospitalLocation.longitude]);

  return (
    <div style={{ height: '500px', width: '100%', margin: '1rem 0', border: '1px solid #ddd', borderRadius: '8px' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={center} icon={ambulanceIcon}>
          <Popup>Ambulance Location</Popup>
        </Marker>
        <Marker position={[Number(hospitalLocation.latitude), Number(hospitalLocation.longitude)]} icon={hospitalIcon}>
          <Popup>Hospital Location</Popup>
        </Marker>
        {routeCoordinates.length > 0 && (
          <Polyline positions={routeCoordinates} color="blue" weight={3} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;