import React, { useState } from 'react';

const UserSettings = ({ onClose }) => {
  const [userImage, setUserImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUserImage(URL.createObjectURL(file));
  };

  const handleDeleteUser = () => {
    // Simulate user deletion by clearing localStorage (or call your API here)
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    alert('User has been deleted. Please log in again.');
    onClose();
    // Redirect user to the login page or home page
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-auto">
        <h2 className="text-lg font-bold mb-4">User Settings</h2>
        <div className="mb-4">
          <label htmlFor="userImage" className="block text-gray-700 font-bold mb-2">
            User Image
          </label>
          <input
            type="file"
            id="userImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-3 py-2 border rounded-md"
          />
          {userImage && (
            <div className="mt-4">
              <img src={userImage} alt="User Image" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
          <button
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
