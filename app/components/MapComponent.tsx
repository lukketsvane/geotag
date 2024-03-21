import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapComponent.module.css';
import MarkerInfoPopup from './MarkerInfoPopup';

const MapComponent = ({
  selectedMarker,
  markerInfo,
  markers,
  onMarkerClick,
  onSaveMarkerInfo,
}) => {
  // Update here: Specify the type of object the ref will hold (L.Map | null)
  const mapRef = useRef<L.Map | null>(null);
  const [markerPlacementActive, setMarkerPlacementActive] = useState(false);
  const [temporaryMarker, setTemporaryMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map('map', {
        center: [0, 0],
        zoom: 2,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      mapRef.current = map;

      const customControl = L.Control.extend({
        options: {
          position: 'topleft',
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
          if (temporaryMarker) {
            temporaryMarker.setLatLng(e.latlng);
          } else {
            const marker = L.marker(e.latlng, {
              icon: L.divIcon({
                className: 'emoji-icon',
                html: '📍',
                iconSize: [20, 20],
              }),
            }).addTo(map);
            setTemporaryMarker(marker);
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
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', () => onMarkerClick(marker));
          setMarkerPlacementActive(false);
          setTemporaryMarker(null);
        }
      });

      markers.forEach((markerData) => {
        const markerInstance = L.marker([markerData.latitude, markerData.longitude], {
          icon: L.divIcon({
            className: 'emoji-icon',
            html: '📍',
            iconSize: [20, 20],
          }),
        }).addTo(map);
        markerInstance.on('click', () => onMarkerClick(markerInstance));
      });
    }
  }, [markerPlacementActive, onMarkerClick, markers, temporaryMarker]);

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
