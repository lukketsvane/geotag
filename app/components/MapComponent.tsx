import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapComponent.module.css';
import MarkerInfoPopup from './MarkerInfoPopup';

interface MarkerData {
  latitude: number;a
  longitude: number;
  title?: string;
  description?: string;
}

interface MapComponentProps {
  selectedMarker: L.Marker | null;
  markerInfo: { [key: string]: { title: string; description: string } };
  markers: MarkerData[];
  onMarkerClick: (marker: L.Marker) => void;
  onSaveMarkerInfo: (marker: L.Marker, title: string, description: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  selectedMarker,
  markerInfo,
  markers,
  onMarkerClick,
  onSaveMarkerInfo,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [markerPlacementActive, setMarkerPlacementActive] = useState<boolean>(false);
  const [temporaryMarker, setTemporaryMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
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
                className: styles.emojiIcon,
                html: '📍',
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
              className: styles.emojiIcon,
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          marker.on('click', () => {
            onMarkerClick(marker);
          });
          setMarkerPlacementActive(false);
          if (temporaryMarker) {
            temporaryMarker.remove();
            setTemporaryMarker(null);
          }
        }
      });

      markers.forEach((markerData) => {
        if (typeof markerData.latitude === 'number' && typeof markerData.longitude === 'number') {
          const markerInstance = L.marker([markerData.latitude, markerData.longitude], {
            icon: L.divIcon({
              className: styles.emojiIcon,
              html: '📍',
              iconSize: [20, 20],
            }),
          }).addTo(map);
          markerInstance.on('click', () => {
            onMarkerClick(markerInstance);
          });
        }
      });
    }
  }, [markerPlacementActive, onMarkerClick, markers, onSaveMarkerInfo]);

  return (
    <div>
      <div id="map" className={styles.map} />
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
