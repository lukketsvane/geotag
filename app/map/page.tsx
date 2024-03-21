"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import L from 'leaflet';

// Assuming MarkerData is defined in a similar manner in your project
interface MarkerData {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

const MapWithNoSSR = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
});

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedMarker, setSelectedMarker] = useState<L.Marker | null>(null);
  const [markerInfo, setMarkerInfo] = useState<{ [key: string]: { title: string; description: string } }>({});
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/markers');
        const data: MarkerData[] = await response.json();
        setMarkers(data);
      } catch (err) {
        console.error('Failed to fetch markers:', err);
      }
    };
    fetchMarkers();
  }, []);

  const handleMarkerClick = (marker: L.Marker) => {
    setSelectedMarker(marker);
  };

  const handleSaveMarkerInfo = async (marker: L.Marker, title: string, description: string) => {
    const markerKey = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
    const newMarkerInfo = {
      ...markerInfo,
      [markerKey]: { title, description },
    };
    setMarkerInfo(newMarkerInfo);

    try {
      await fetch('/api/markers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: marker.getLatLng().lat,
          longitude: marker.getLatLng().lng,
          title,
          description,
        }),
      });
      // Assuming the API returns the updated list of markers or the new marker itself
      // Update your state accordingly
      setMarkers((prevMarkers) => [...prevMarkers, { latitude: marker.getLatLng().lat, longitude: marker.getLatLng().lng, title, description }]);
    } catch (err) {
      console.error('Error saving marker info:', err);
    }
  };

  const handleSignOut = () => {
    // Example sign-out logic
    console.log('User signed out');
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSignOut={handleSignOut}
      />
      <div className={`relative flex-grow ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        <div className="fixed bottom-0 left-0 z-50 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white bg-black p-2 rounded-full"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <X color="white" size={24} /> : <Menu color="white" size={24} />}
          </button>
        </div>
        <MapWithNoSSR
          selectedMarker={selectedMarker}
          markerInfo={markerInfo}
          markers={markers}
          onMarkerClick={handleMarkerClick}
          onSaveMarkerInfo={handleSaveMarkerInfo}
        />
      </div>
    </div>
  );
};

export default MainPage;
