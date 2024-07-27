import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HotelsBookingForm = () => {
  const [city, setCity] = useState('');
  const [starRatings, setStarRatings] = useState('');
  const [roomClass, setRoomClass] = useState('Economy');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Gurugram",
    "Kolkata",
    "Hyderabad",
    "Goa",
    "Visakhapatnam",
    "Pune",
    "Jaipur"
  ];

  const roomClassOptions = {
    Economy: 'Economy',
    Premium: 'Premium',
    Business: 'Business'
  };

  const handleSearch = () => {
    if (!city) {
      setError('Please select a city.');
      return;
    }

    console.log('Navigating to results with:', { city, starRatings, roomClass });
    navigate('/hotel-search-results', { state: { city, starRatings, roomClass } });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://www.italiahotels.com/assets/img-cover_italiahotels@2x.jpg')" }}
    >
      <div className="max-w-md w-full p-6 bg-white bg-opacity-90 shadow-md rounded-lg mx-2 md:mx-0">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Find your next stay</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="city">City *</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="starRatings">Star Ratings (1-5)</label>
          <input
            id="starRatings"
            type="number"
            placeholder="Star Ratings (1-5)"
            value={starRatings}
            onChange={(e) => setStarRatings(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="roomClass">Room Class</label>
          <select
            id="roomClass"
            value={roomClass}
            onChange={(e) => setRoomClass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {Object.entries(roomClassOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default HotelsBookingForm;
