import React, { useState } from 'react';
import { FaHome, FaUserFriends, FaMapMarkerAlt, FaHashtag, FaTags, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NextRouter } from 'next/router';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  router: NextRouter;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, router }) => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    router.push(path);
    toggleSidebar();
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('Logout clicked');
    // Redirect to login page or homepage
    router.push('/login');
  };

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out bg-gray-900 text-white overflow-hidden shadow-lg`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-2xl font-bold">Geotagger</h1>
      </div>
      <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col p-4 space-y-4`}>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/')}
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/friends' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/friends')}
        >
          <FaUserFriends className="text-lg" />
          <span>Friends</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/search-place' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/search-place')}
        >
          <FaMapMarkerAlt className="text-lg" />
          <span>Search by Place</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/search-user' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/search-user')}
        >
          <FaHashtag className="text-lg" />
          <span>Search by @</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/my-tags' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/my-tags')}
        >
          <FaTags className="text-lg" />
          <span>My Tags</span>
        </a>
        <a
          href="#"
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeLink === '/settings' ? 'bg-gray-800' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleLinkClick('/settings')}
        >
          <FaCog className="text-lg" />
          <span>Settings</span>
        </a>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>Michael Calder</span>
          </div>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;