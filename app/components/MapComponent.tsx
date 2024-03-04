"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { Map } from 'leaflet';

const PlaceMarkerButton: React.FC<{ map: Map }> = ({ map }) => {
  const [marker, setMarker] = useState<L.Marker>();

  const placeMarker = (latlng: L.LatLngExpression) => {
    if (marker) {
      marker.setLatLng(latlng);
    } else {
      const newMarker = L.marker(latlng, {
        icon: L.divIcon({
          className: 'emoji-icon',
          html: '📍',
          iconSize: [20, 20],
        }),
      }).addTo(map);
      setMarker(newMarker);
    }
  };

  useMapEvents({
    click(e) {
      placeMarker(e.latlng);
    },
  });

  return null;
};

const MapComponent: React.FC = () => {
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map('map', {
        center: [0, 0], // Centered at the globe
        zoom: 2, // Zoomed out to show the whole globe
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      mapRef.current = map;

      // Add zoom control with your desired position
      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      // Custom button for placing markers
      const customControl = L.Control.extend({
        options: {
          position: 'topright' // Control's position
        },
        onAdd: function () {
          const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
          button.innerHTML = '📍';
          button.style.backgroundColor = 'white';
          button.style.width = '30px';
          button.style.height = '30px';
          button.onclick = function () {
            console.log('Button clicked');
            // Activate marker placement mode here
          }
          return button;
        }
      });

      map.addControl(new customControl());

      // Event listener for button is set outside to avoid Leaflet control complications
      document.querySelector('.leaflet-control-custom').addEventListener('click', () => {
        // Use Leaflet's map click event to place marker
        map.on('click', function mapClickListen(e) {
          const marker = L.marker(e.latlng, {
            icon: L.divIcon({
              className: 'emoji-icon',
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);

          // Remove event listener after placing the marker
          map.off('click', mapClickListen);
        });
      });
    }
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;
