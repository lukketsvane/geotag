import React, { useState } from 'react';
import Image from 'next/image';
import closeButtonImage from '@/public/next.svg'; // Update with your path

// Assuming you have a user image upload handling and want to display it optimally
const UserSettings = ({ onClose }) => {
  const [userImage, setUserImage] = useState('/path/to/default/user/image.jpg'); // Placeholder path

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUserImage(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
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
              <Image src={userImage} alt="User Image" width={128} height={128} className="object-cover rounded-full" />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
