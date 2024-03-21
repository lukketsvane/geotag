import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Cog, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Geotag {
  latitude: number;
  longitude: number;
  title: string;
}

const Sidebar = ({ isOpen, toggleSidebar, onSignOut }) => {
  const [showLatestTags, setShowLatestTags] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const { data: session } = useSession(); // Use the useSession hook to access session data
  const [latestGeotags, setLatestGeotags] = useState<Geotag[]>([]); // Assuming this state will store geotags data

  useEffect(() => {
    // Placeholder for fetching latest geotags logic
    // This should be replaced with actual fetching logic
    // For example, setLatestGeotags(fetchLatestGeotags());
  }, []);

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
        <Link href="/">
          <a>
            <h2 className="text-lg font-bold">GeoTag</h2>
          </a>
        </Link>
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
          {/* Icon for closing or toggling the sidebar */}
          <ChevronDown size={24} />
        </button>
      </div>
      <nav className="mt-6">
        {/* Display the user's name if logged in */}
        {session && (
          <div className="px-4 mb-4">
            <span>Welcome, {session.user.name}!</span>
          </div>
        )}
        <div className="px-4">
          <button onClick={() => setShowLatestTags(!showLatestTags)} className="flex justify-between w-full py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100">
            <span>Latest GeoTags</span>
            {showLatestTags ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showLatestTags && (
            <ul className="mt-2">
              {latestGeotags.map((geotag, index) => (
                <li key={index} className="ml-4 text-gray-600 hover:text-gray-800">
                  {geotag.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-4 mt-4">
          <button onClick={() => setShowUserSettings(!showUserSettings)} className="flex justify-between w-full py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100">
            <span>User Settings</span>
            {showUserSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showUserSettings && (
            // User settings dropdown content
          )}
        </div>
        <div className="px-4 mt-4">
          <button onClick={onSignOut} className="w-full py-2 text-left text-gray-600 hover:text-gray-800 hover:bg-gray-100">
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
