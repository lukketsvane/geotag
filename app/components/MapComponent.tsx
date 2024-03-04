// app/components/MapComponent.tsx
"use client";
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Map } from 'leaflet';

const MapComponent: React.FC = () => {
    const mapRef = useRef<Map | null>(null);

    useEffect(() => {
        // Initialize the map only once
        if (mapRef.current === null) {
            mapRef.current = L.map('map', {
                center: [51.505, -0.09], // Default center of the map
                zoom: 13, // Default zoom level
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(mapRef.current);
        }

        // Cleanup function to remove map when the component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;
