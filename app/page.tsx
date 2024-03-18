"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';

const MapWithNoSSR = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerInfo, setMarkerInfo] = useState({});

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleSaveMarkerInfo = (marker, title, description) => {
    const markerKey = `${marker.getLatLng().lat},${marker.getLatLng().lng}`;
    setMarkerInfo(prevInfo => ({
      ...prevInfo,
      [markerKey]: { title, description }
    }));
    setSelectedMarker(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
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
          onMarkerClick={handleMarkerClick}
          onSaveMarkerInfo={handleSaveMarkerInfo}
        />
      </div>
    </div>
  );
};

export default MainPage;