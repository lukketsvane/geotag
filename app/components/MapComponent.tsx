// MapComponent.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, Marker } from 'leaflet';
import styles from './MapComponent.module.css';
import MarkerInfoPopup from './MarkerInfoPopup';
import { MarkerInfo } from './types'; // Import MarkerInfo from the shared types file

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
  // Component logic remains unchanged...

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
