// app/components/MarkerInfoCard.tsx
import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';

interface MarkerInfoCardProps {
  selectedMarker: Marker;
  markerInfo: { [key: string]: { title: string; description: string } };
  onSaveMarkerInfo: (marker: Marker, title: string, description: string) => void;
  onMarkerClick: (marker: Marker | null) => void;
}

const MarkerInfoCard: React.FC<MarkerInfoCardProps> = ({
  selectedMarker,
  markerInfo,
  onSaveMarkerInfo,
  onMarkerClick,
}) => {
  const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
  const info = markerInfo[markerKey];
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    const fetchPlaceName = async () => {
      const { lat, lng } = selectedMarker.getLatLng();
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.address) {
        const { city, country } = data.address;
        setPlaceName(`${city || ''}, ${country || ''}`);
      }
    };

    fetchPlaceName();
  }, [selectedMarker]);

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">{placeName || 'Marker Information'}</h2>
          {/* Rest of the code remains the same */}
        </div>
      </div>
      <div className="leaflet-popup-tip-container">
        <div className="leaflet-popup-tip"></div>
      </div>
    </div>
  );
};

export default MarkerInfoCard;