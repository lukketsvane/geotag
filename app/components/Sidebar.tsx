"use client";
import React from 'react';
import { X, Menu } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-black text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
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
      <div className={`fixed bottom-0 left-0 z-50 p-4 ${!isOpen ? 'block' : 'hidden'}`}>
        <button
          onClick={toggleSidebar}
          className="text-white bg-black p-2 rounded-full"
          aria-label="Toggle Sidebar"
        >
          <Menu color="white" size={24} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
