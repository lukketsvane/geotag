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
  const [placeInfo, setPlaceInfo] = useState<{ country: string; city: string } | null>(null);

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      const { lat, lng } = selectedMarker.getLatLng();
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const country = data.address.country;
      const city = data.address.city || data.address.town || data.address.village;
      setPlaceInfo({ country, city });
    };

    fetchPlaceInfo();
  }, [selectedMarker]);

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">Marker Information</h2>
          <div className="mb-4">
            <p className="text-gray-600"></p>
            <p>{selectedMarker.getLatLng().lat}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600"></p>
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

export default MarkerInfoCard;