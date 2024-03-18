"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map } from 'leaflet';
import styles from './MapComponent.module.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const [markerPlacementActive, setMarkerPlacementActive] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<L.Marker | null>(null);
  const [markerInfo, setMarkerInfo] = useState<{ [key: string]: { title: string; description: string } }>({});

  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map('map', {
        center: [0, 0],
        zoom: 2,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      mapRef.current = map;

      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      const customControl = L.Control.extend({
        options: {
          position: 'topright'
        },
        onAdd: function () {
          const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
          button.innerHTML = '📍';
          button.style.backgroundColor = 'white';
          button.style.width = '30px';
          button.style.height = '30px';
          button.onclick = function () {
            setMarkerPlacementActive(!markerPlacementActive);
          }
          return button;
        }
      });

      map.addControl(new customControl());

      map.on('mousemove', function (e) {
        if (markerPlacementActive) {
          map.getContainer().style.cursor = 'crosshair';
        } else {
          map.getContainer().style.cursor = '';
        }
      });

      map.on('click', function (e) {
        if (markerPlacementActive) {
          const marker = L.marker(e.latlng, {
            icon: L.divIcon({
              className: 'emoji-icon',
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', function () {
            setSelectedMarker(marker);
            const markerKey = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
            const info = markerInfo[markerKey];
            if (info) {
              (document.getElementById('title') as HTMLInputElement).value = info.title;
              (document.getElementById('description') as HTMLTextAreaElement).value = info.description;
              (document.getElementById('title') as HTMLInputElement).readOnly = true;
              (document.getElementById('description') as HTMLTextAreaElement).readOnly = true;
            } else {
              (document.getElementById('title') as HTMLInputElement).value = '';
              (document.getElementById('description') as HTMLTextAreaElement).value = '';
              (document.getElementById('title') as HTMLInputElement).readOnly = false;
              (document.getElementById('description') as HTMLTextAreaElement).readOnly = false;
            }
          });
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'p') {
          const { lat, lng } = map.getCenter();
          const marker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'emoji-icon',
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', function () {
            setSelectedMarker(marker);
            const markerKey = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
            const info = markerInfo[markerKey];
            if (info) {
              (document.getElementById('title') as HTMLInputElement).value = info.title;
              (document.getElementById('description') as HTMLTextAreaElement).value = info.description;
              (document.getElementById('title') as HTMLInputElement).readOnly = true;
              (document.getElementById('description') as HTMLTextAreaElement).readOnly = true;
            } else {
              (document.getElementById('title') as HTMLInputElement).value = '';
              (document.getElementById('description') as HTMLTextAreaElement).value = '';
              (document.getElementById('title') as HTMLInputElement).readOnly = false;
              (document.getElementById('description') as HTMLTextAreaElement).readOnly = false;
            }
          });
        }
      });
    }
  }, [markerPlacementActive, markerInfo]);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }} />
      {selectedMarker && (
        <div className={`leaflet-popup ${styles.infoCard}`}>
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
                    const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
                    setMarkerInfo(prevInfo => ({
                      ...prevInfo,
                      [markerKey]: { title, description }
                    }));
                    setSelectedMarker(null);
                  }}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setSelectedMarker(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="leaflet-popup-tip-container">
            <div className="leaflet-popup-tip"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;