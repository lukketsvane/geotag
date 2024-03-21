// app/components/MarkerInfoPopup.tsx
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

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">{locationName}</h2>
          <div className="mb-4">
            <p className="text-gray-600">Latitude:</p>
            <p>{selectedMarker.getLatLng().lat}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Longitude:</p>
            <p>{selectedMarker.getLatLng().lng}</p>
          </div>
          {info ? (
            <div className="mb-4">
              <p className="text-gray-600">Title:</p>
              <p>{info.title}</p>
              <p className="text-gray-600">Description:</p>
              <p>{info.description}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600">
                  Title:
                </label>
                <input type="text" id="title" className="w-full px-2 py-1 border rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">
                  Description:
                </label>
                <textarea id="description" className="w-full px-2 py-1 border rounded"></textarea>
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