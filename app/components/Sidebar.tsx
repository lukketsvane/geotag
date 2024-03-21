import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onSignOut }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100">
        <h2 className="text-lg font-bold">GeoTag</h2>
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
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;