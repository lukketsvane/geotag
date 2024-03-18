// app/page.tsx
"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';

const MapWithNoSSR = dynamic(() => import('./components/MapComponent'), {
  ssr: false,
});

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out bg-black text-white overflow-hidden`}>
      <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col p-4 space-y-4`}>
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">Friends</a>
        <a href="#" className="hover:text-gray-300">Search by Place</a>
        <a href="#" className="hover:text-gray-300">Search by @</a>
        <a href="#" className="hover:text-gray-300">My Tags</a>
        <a href="#" className="hover:text-gray-300">Settings</a>
      </nav>
      <div className="mt-auto p-4">
        Michael Calder
      </div>
    </div>
  );
};

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default MainPage;