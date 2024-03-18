import React from 'react';

const MarkerInfoPopup: React.FC = ({ selectedMarker, markerInfo, onSaveMarkerInfo, onMarkerClick }) => {
  const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
  const info = markerInfo[markerKey];

  return (
    <div className="leaflet-popup">
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">Marker Information</h2>
          <div className="mb-4">
            <p className="text-gray-600">Latitude:</p>
            <p>{selectedMarker.getLatLng().lat}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Longitude:</p>
            <p>{selectedMarker.getLatLng().lng}</p>
          </div>
          {info ? (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">{info.title}</h3>
              <p>{info.description}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600">Title:</label>
                <input type="text" id="title" className="w-full px-2 py-1 border rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">Description:</label>
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