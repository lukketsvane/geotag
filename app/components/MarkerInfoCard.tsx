"use client";
import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';

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
  const [title, setTitle] = useState(info ? info.title : '');
  const [description, setDescription] = useState(info ? info.description : '');
  const [placeInfo, setPlaceInfo] = useState<{ country: string; city: string } | null>(null);

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      const { lat, lng } = selectedMarker.getLatLng();
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.address) {
        const country = data.address.country;
        const city = data.address.city || data.address.town || data.address.village;
        setPlaceInfo({ country, city });
      }
    };

    fetchPlaceInfo();
  }, [selectedMarker]);

  return (
    <div className="leaflet-popup p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Marker Information</h2>
        {placeInfo && (
          <p className="mb-2 text-gray-800">Location: {placeInfo.city}, {placeInfo.country}</p>
        )}
        <p className="text-gray-800">Latitude: {selectedMarker.getLatLng().lat}</p>
        <p className="text-gray-800">Longitude: {selectedMarker.getLatLng().lng}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600 mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-600 mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-300"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-300"
          onClick={() => {
            onSaveMarkerInfo(selectedMarker, title, description);
            onMarkerClick(null); // Optionally close the card after saving
          }}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-gray-400"
          onClick={() => onMarkerClick(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MarkerInfoCard;
