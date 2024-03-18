// app/components/MapComponent.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker } from 'leaflet';
import styles from './MapComponent.module.css';
import MarkerInfoPopup from './MarkerInfoPopup';

interface MarkerInfo {
  title: string;
  description: string;
}

interface MapComponentProps {
  selectedMarker: Marker | null;
  markerInfo: { [key: string]: MarkerInfo };
  onMarkerClick: (marker: Marker | null) => void;
  onSaveMarkerInfo: (marker: Marker, title: string, description: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedMarker,
  markerInfo,
  onMarkerClick,
  onSaveMarkerInfo,
}) => {
  const mapRef = useRef<Map | null>(null);
  const [markerPlacementActive, setMarkerPlacementActive] = useState(false);

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
        position: 'topright',
      }).addTo(map);

      const customControl = L.Control.extend({
        options: {
          position: 'topright',
        },
        onAdd: function () {
          const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
          button.innerHTML = '📍';
          button.style.backgroundColor = 'white';
          button.style.width = '30px';
          button.style.height = '30px';
          button.onclick = function () {
            setMarkerPlacementActive(!markerPlacementActive);
          };
          return button;
        },
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
            onMarkerClick(marker);
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
            onMarkerClick(marker);
          });
        }
      });
    }
  }, [markerPlacementActive, onMarkerClick]);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }} />
      {selectedMarker && (
        <MarkerInfoPopup
          selectedMarker={selectedMarker}
          markerInfo={markerInfo}
          onSaveMarkerInfo={onSaveMarkerInfo}
          onMarkerClick={onMarkerClick}
        />
      )}
    </div>
  );
};

export default MapComponent;