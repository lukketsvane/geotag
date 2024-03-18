// MarkerInfoPopup.tsx
import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';

// Removed OpenAI imports

interface MarkerInfo {
  title: string;
  description: string;
}

interface MarkerInfoPopupProps {
  selectedMarker: Marker;
  markerInfo: { [key: string]: MarkerInfo };
  onSaveMarkerInfo: (marker: Marker, title: string, description: string) => void;
  onMarkerClick: (marker: Marker | null) => void;
}

const MarkerInfoPopup: React.FC<MarkerInfoPopupProps> = ({
  selectedMarker,
  markerInfo,
  onSaveMarkerInfo,
  onMarkerClick,
}) => {
  const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
  const info = markerInfo[markerKey];
  const [locationName, setLocationName] = useState('');
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    // Fetch location name and fun fact logic remains unchanged
    // Assume fetchFunFact makes a call to your own API endpoint
    const fetchFunFact = async () => {
      // Example call to your API endpoint
      const response = await fetch(`/api/funFact?lat=${selectedMarker.getLatLng().lat}&lng=${selectedMarker.getLatLng().lng}`);
      const data = await response.json();
      setFunFact(data.funFact || 'No fun fact found.');
    };

    if (locationName) {
      fetchFunFact();
    }
  }, [locationName, selectedMarker]);

  // Component JSX remains unchanged
};

export default MarkerInfoPopup;
