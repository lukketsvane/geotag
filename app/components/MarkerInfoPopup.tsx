import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';

const MarkerInfoPopup = ({
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
      const locationDetails = data.address;
      const country = locationDetails.country;
      const city = locationDetails.city || locationDetails.town || locationDetails.village;
      setLocationName(`${city}, ${country}`);
    };
    fetchLocationName();
  }, [selectedMarker]);

  useEffect(() => {
    if (info) {
      setTitle(info.title);
      setDescription(info.description);
    }
  }, [info]);

  const handleSave = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      onSaveMarkerInfo(selectedMarker, title, description);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{locationName || 'Location Details'}</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-700">{selectedMarker.getLatLng().lat}, {selectedMarker.getLatLng().lng}</p>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Title"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description"
          rows={3}
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSave}
          disabled={title.trim() === '' || description.trim() === ''}
        >
          Save
        </button>
        <button
          className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => onMarkerClick(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MarkerInfoPopup;
