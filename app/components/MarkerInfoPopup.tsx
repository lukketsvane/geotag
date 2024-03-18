// app/components/MarkerInfoPopup.tsx
import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';

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
    const fetchLocationNameAndFunFact = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedMarker.getLatLng().lat}&lon=${selectedMarker.getLatLng().lng}`
        );
        const data = await response.json();
        const { country, city, town, village } = data.address;
        const locationCity = city || town || village;
        setLocationName(`${locationCity}, ${country}`);

        const funFactResponse = await fetch(`/api/funFact?lat=${selectedMarker.getLatLng().lat}&lng=${selectedMarker.getLatLng().lng}&name=${encodeURIComponent(locationCity)}`);
        const funFactData = await funFactResponse.json();
        setFunFact(funFactData.funFact);
      } catch (error) {
        console.error('Error fetching location name or fun fact:', error);
        setLocationName('Error fetching location');
        setFunFact('Error fetching fun fact');
      }
    };

    if (selectedMarker) {
      fetchLocationNameAndFunFact();
    }
  }, [selectedMarker]);

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      {/* Existing markup and logic for displaying marker info */}
      {/* New section for displaying the fun fact */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Fun Fact</h3>
        <p>{funFact || 'Loading fun fact...'}</p>
      </div>
    </div>
  );
};

export default MarkerInfoPopup;
