import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out bg-black text-white overflow-hidden`}
    >
      <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col p-4 space-y-4`}>
        <a href="#" className="hover:text-gray-300">
          Home
        </a>
        <a href="#" className="hover:text-gray-300">
          Friends
        </a>
        <a href="#" className="hover:text-gray-300">
          Search by Place
        </a>
        <a href="#" className="hover:text-gray-300">
          Search by @
        </a>
        <a href="#" className="hover:text-gray-300">
          My Tags
        </a>
        <a href="#" className="hover:text-gray-300">
          Settings
        </a>
      </nav>
      <div className="mt-auto p-4">Michael Calder</div>
    </div>
  );
};

export default Sidebar;