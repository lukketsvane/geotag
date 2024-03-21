import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';

const MarkerInfoPopup = ({
  selectedMarker,
  markerInfo,
  onSaveMarkerInfo,
  onMarkerClick,
}) => {
  const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
  const info = markerInfo[markerKey];
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    const fetchLocationName = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedMarker.getLatLng().lat}&lon=${selectedMarker.getLatLng().lng}`
      );
      const data = await response.json();
      const { country, city } = data.address;
      setLocationName(`${city}, ${country}`);
    };
    fetchLocationName();
  }, [selectedMarker]);

  useEffect(() => {
    if (!info) {
      onMarkerClick(selectedMarker);
    }
  }, [info, onMarkerClick, selectedMarker]);

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
                <input type="text" id="title" className="w-full px-2 py-1 border rounded" placeholder="Title" />
              </div>
              <div className="mb-4">
                <textarea id="description" className="w-full px-2 py-1 border rounded" placeholder="Description"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const title = (document.getElementById('title') as HTMLInputElement).value;
                    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                    onSaveMarkerInfo(selectedMarker, title, description);
                  }}
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