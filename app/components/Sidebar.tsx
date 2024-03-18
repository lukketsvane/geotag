import Image from 'next/image';
import React, { useState } from 'react';
import { FaHome, FaUserFriends, FaMapMarkerAlt, FaHashtag, FaTags, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSignOut }) => {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    // Add your navigation logic here based on the clicked link
  };

  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out bg-gray-800 text-white overflow-hidden shadow-lg`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-2xl font-bold">Geotagger</h2>
        <button
          className="text-gray-500 hover:text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              className={`${isOpen ? 'hidden' : 'block'}`}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
            />
            <path
              className={`${isOpen ? 'block' : 'hidden'}`}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.343 4.243L12 9.9L17.657 4.243L19.071 5.657L12 12.728L4.929 5.657L6.343 4.243Z"
            />
          </svg>
        </button>
      </div>
      <nav className={`${isOpen ? 'block' : 'hidden'} py-4`}>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('home')}
            >
              <FaHome className="mr-2" />
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'friends' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('friends')}
            >
              <FaUserFriends className="mr-2" />
              Friends
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'search-place' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('search-place')}
            >
              <FaMapMarkerAlt className="mr-2" />
              Search by Place
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'search-hashtag' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('search-hashtag')}
            >
              <FaHashtag className="mr-2" />
              Search by #
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'my-tags' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('my-tags')}
            >
              <FaTags className="mr-2" />
              My Tags
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center px-4 py-2 ${
                activeLink === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('settings')}
            >
              <FaCog className="mr-2" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>Michael Calder</span>
          </div>
          <button
            className="text-gray-500 hover:text-white focus:outline-none"
            onClick={onSignOut}
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;