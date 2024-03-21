import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';

interface MarkerInfoPopupProps {
  selectedMarker: Marker;
  markerInfo: { [key: string]: { title: string; description: string } };
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchLocationName = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedMarker.getLatLng().lat}&lon=${selectedMarker.getLatLng().lng}`
      );
      const data = await response.json();
      // Check if data.address exists and has the properties you're looking for
      const { country, city } = data.address ? data.address : { country: undefined, city: undefined };
      setLocationName(`${city || 'Unknown city'}, ${country || 'Unknown country'}`);
    };
    fetchLocationName();
  }, [selectedMarker]);

  useEffect(() => {
    if (!info) {
      onMarkerClick(selectedMarker);
    }
  }, [info, onMarkerClick, selectedMarker]);

  const handleSave = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      onSaveMarkerInfo(selectedMarker, title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">{locationName}</h2>
          <div className="mb-4">
            <p>{selectedMarker.getLatLng().lat}, {selectedMarker.getLatLng().lng}</p>
          </div>
          {info ? (
            <div className="mb-4">
              <p>{info.title}</p>
              <p>{info.description}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Title"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSave}
                  disabled={title.trim() === '' || description.trim() === ''}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => onMarkerClick(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="leaflet-popup-tip-container">
        <div className="leaflet-popup-tip"></div>
      </div>
    </div>
  );
};

export default MarkerInfoPopup;
