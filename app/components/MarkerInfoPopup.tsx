"use client"
import React, { useEffect, useState } from 'react';
import { Marker } from 'leaflet';
import styles from './MapComponent.module.css';
import { Configuration, OpenAIApi } from 'openai';

interface MarkerInfo {
  title: string;
  description: string;
}

interface MarkerInfoPopupProps {
  selectedMarker: Marker;
  markerInfo: { [key: string]: MarkerInfo };
  onSaveMarkerInfo: (marker: Marker, title: string, description: string) => void;
  onMarkerClick: (marker: Marker | null) => void;
}

const MarkerInfoPopup: React.FC<MarkerInfoPopupProps> = ({
  selectedMarker,
  markerInfo,
  onSaveMarkerInfo,
  onMarkerClick,
}) => {
  const markerKey = `${selectedMarker.getLatLng().lat},${selectedMarker.getLatLng().lng}`;
  const info = markerInfo[markerKey];
  const [locationName, setLocationName] = useState('');
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedMarker.getLatLng().lat}&lon=${selectedMarker.getLatLng().lng}`
        );
        const data = await response.json();
        
        if (data && data.address) {
          const { country, city, town, village } = data.address;
          const locationCity = city || town || village;
          setLocationName(`${locationCity}, ${country}`);
        } else {
          console.error('Address data is missing from the response');
          setLocationName('Location unknown');
        }
      } catch (error) {
        console.error('Failed to fetch location name:', error);
        setLocationName('Location fetching failed');
      }
    };
    fetchLocationName();
  }, [selectedMarker]);

  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const prompt = `Tell me a fun fact about ${locationName} (${selectedMarker.getLatLng().lat}, ${selectedMarker.getLatLng().lng}).`;

        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        });

        const funFact = response.data.choices[0].message?.content.trim() || '';
        setFunFact(funFact);
      } catch (error) {
        console.error('Failed to fetch fun fact:', error);
        setFunFact('Fun fact fetching failed');
      }
    };
    fetchFunFact();
  }, [locationName, selectedMarker]);

  return (
    <div className={`leaflet-popup ${styles.infoCard}`}>
      <div className="leaflet-popup-content-wrapper">
        <div className="leaflet-popup-content">
          <h2 className="text-lg font-bold mb-2">{locationName}</h2>
          <div className="mb-4">
            <p className="text-gray-600">Latitude:</p>
            <p>{selectedMarker.getLatLng().lat}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Longitude:</p>
            <p>{selectedMarker.getLatLng().lng}</p>
          </div>
          {info ? (
            <div className="mb-4">
              <p className="text-gray-600">Title:</p>
              <p>{info.title}</p>
              <p className="text-gray-600">Description:</p>
              <p>{info.description}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600">
                  Title:
                </label>
                <input type="text" id="title" className="w-full px-2 py-1 border rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600">
                  Description:
                </label>
                <textarea id="description" className="w-full px-2 py-1 border rounded"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    const title = (document.getElementById('title') as HTMLInputElement).value;
                    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                    onSaveMarkerInfo(selectedMarker, title, description);
                  }}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => onMarkerClick(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          {funFact && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Fun Fact</h3>
              <p>{funFact}</p>
            </div>
          )}
        </div>
      </div>
      <div className="leaflet-popup-tip-container">
        <div className="leaflet-popup-tip"></div>
      </div>
    </div>
  );
};

export default MarkerInfoPopup;