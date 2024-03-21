import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserSettings from './UserSettings';

interface Geotag {
  latitude: number;
  longitude: number;
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSignOut }) => {
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [latestGeotags, setLatestGeotags] = useState<Geotag[]>([]);
  const router = useRouter();


  const handleLogoClick = () => {
    router.push('/');
  };

  const toggleUserSettings = () => {
    setShowUserSettings(!showUserSettings);
  };

  const fetchLatestGeotags = async () => {
    try {
      const response = await fetch('/api/markers?limit=5');
      const data = await response.json();
      setLatestGeotags(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
        <h2 className="text-lg font-bold cursor-pointer" onClick={handleLogoClick}>
          GeoTag
        </h2>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-6">
        <div className="px-4">
          <button
            className="w-full py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            onClick={toggleUserSettings}
          >
            User Settings
          </button>
        </div>
        <div className="px-4 mt-4">
          <h3 className="text-gray-600 font-bold mb-2">Latest Geotags</h3>
          {latestGeotags.length > 0 ? (
            <ul>
              {latestGeotags.map((geotag) => (
                <li key={`${geotag.latitude},${geotag.longitude}`} className="text-gray-600 hover:text-gray-800">
                  {geotag.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No geotags found.</p>
          )}
        </div>
      </nav>
      <div className="absolute bottom-4 left-4">
        <button
          className="w-full py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
      {showUserSettings && <UserSettings onClose={toggleUserSettings} />}
    </div>
  );
};

export default Sidebar;