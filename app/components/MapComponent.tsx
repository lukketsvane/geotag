"use client";
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker } from 'leaflet';
import styles from './MapComponent.module.css';
import MarkerInfoPopup from './MarkerInfoPopup';



const MapComponent = ({
  selectedMarker,
  markerInfo,
  markers,
  onMarkerClick,
  onSaveMarkerInfo,
}) => {
  const mapRef = useRef(null);
  const [markerPlacementActive, setMarkerPlacementActive] = useState(false);
  const [temporaryMarker, setTemporaryMarker] = useState(null);


  
  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map('map', {
        center: [0, 0],
        zoom: 2,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Â© OpenStreetMap contributors',
      }).addTo(map);

      mapRef.current = map;

      const customControl = L.Control.extend({
        options: {
          position: 'topleft',
        },
        onAdd: function () {
          const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
          button.innerHTML = 'ð';
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
          if (temporaryMarker) {
            temporaryMarker.setLatLng(e.latlng);
          } else {
            const marker = L.marker(e.latlng, {
              icon: L.divIcon({
                className: 'emoji-icon', // Ensure this class is correctly defined in your CSS
                html: `<span class="emoji-icon" style="font-size: 24px;">📍</span>`, // Adjust styling as necessary
            
                iconSize: [20, 20],
              }),
            });
            setTemporaryMarker(marker.addTo(map));
          }
        } else {
          map.getContainer().style.cursor = '';
          if (temporaryMarker) {
            temporaryMarker.remove();
            setTemporaryMarker(null);
          }
        }
      });

      map.on('click', function (e) {
        if (markerPlacementActive) {
          const marker = L.marker(e.latlng, {
            icon: L.divIcon({
              className: 'emoji-icon',
              html: 'ð',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', function () {
            onMarkerClick(marker);
          });
          setMarkerPlacementActive(false);
          if (temporaryMarker) {
            temporaryMarker.remove();
            setTemporaryMarker(null);
          }
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'p') {
          const { lat, lng } = map.getCenter();
          const marker = L.marker([lat, lng], {
            icon: L.divIcon({
              className: 'emoji-icon',
              html: 'ð',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', function () {
            onMarkerClick(marker);
          });
        }
      });

      markers.forEach((marker) => {
        const { latitude, longitude } = marker;
        const markerInstance = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: 'emoji-icon',
            html: 'ð',
            iconSize: [20, 20],
          }),
        }).addTo(map);
        markerInstance.on('click', function () {
          onMarkerClick(markerInstance);
        });
      });
    }
  }, [markerPlacementActive, onMarkerClick, markers]);

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