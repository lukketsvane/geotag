"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const MapWithNoSSR = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
});

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({});
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/markers');
        const data = await response.json();
        setMarkers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMarkers();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleSaveMarkerInfo = async (marker, title, description) => {
    const markerKey = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
    const newMarkerInfo = {
      ...markerInfo,
      [markerKey]: { title, description },
    };
    setMarkerInfo(newMarkerInfo);

    try {
      const response = await fetch('/api/markers', {
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
      const data = await response.json();
      setMarkers((prevMarkers) => [...prevMarkers, data]);
    } catch (err) {
      console.error(err);
    }

    setSelectedMarker(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    // Add any additional sign-out logic here
    console.log('User signed out');
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