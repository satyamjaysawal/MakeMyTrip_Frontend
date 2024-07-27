import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HotelSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomClass, setRoomClass] = useState('Economy'); // Default room class
  const [roomCount, setRoomCount] = useState(1); // Default room count
  const [totalPrice, setTotalPrice] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [formErrors, setFormErrors] = useState({
    startDate: false,
    endDate: false,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const queryParams = new URLSearchParams({ city });

        console.log('Fetching with queryParams:', queryParams.toString());
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/hotels?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Hotels fetched:', data);
        setHotels(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Unable to fetch hotel details. Please try again.');
      }
    };

    if (city) {
      fetchHotels();
    }
  }, [city]);

  const handleRoomClassChange = (event) => {
    setRoomClass(event.target.value);
  };

  const handleRoomCountChange = (delta) => {
    setRoomCount((prevCount) => Math.max(prevCount + delta, 1)); // Ensure room count is at least 1
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    calculateNumberOfDays(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    calculateNumberOfDays(startDate, event.target.value);
  };

  const calculateNumberOfDays = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setNumberOfDays(diffDays);
    }
  };

  useEffect(() => {
    if (selectedHotel) {
      const pricePerDay = selectedHotel.price_options[roomClass]?.room_count["1_room_2_adults"] || 0;
      const price = numberOfDays * roomCount * pricePerDay; // Multiply by number of days
      setTotalPrice(price);
    }
  }, [roomClass, roomCount, selectedHotel, numberOfDays]);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    // Reset room class and count when selecting a new hotel
    setRoomClass('Economy');
    setRoomCount(1);
    setStartDate('');
    setEndDate('');
    setNumberOfDays(0);
  };

  const handleGoToPayment = () => {
    if (!startDate || !endDate) {
      setFormErrors({
        startDate: !startDate,
        endDate: !endDate,
      });
      return;
    }
    navigate('/hotel-payment', { 
      state: { 
        hotel: selectedHotel, 
        roomClass, 
        roomCount, 
        startDate, 
        endDate, 
        numberOfDays, 
        totalPrice 
      } 
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://www.travelandleisure.com/thmb/NmHjS-LKe4KEvuMydUd9j-7OB98=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/stein-eriksen-lodge-park-city-utah_MTNRESORT1022-0ee0468515e346a98660ded1eb9db2dc.jpg')" }}
    >
      <div className="max-w-3xl w-full bg-white bg-opacity-90 p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Hotel Search Results</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {hotels.length > 0 ? (
          <div>
            <ul className="space-y-3">
              {hotels.map((hotel, index) => (
                <li key={index} className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                  <img
                    src={hotel.hotel_img.startsWith('http') ? hotel.hotel_img : `/images/${hotel.hotel_img}`}
                    alt={hotel.hotel_name}
                    className="w-full h-32 object-cover mb-2 rounded-lg sm:w-48 sm:h-32"
                  />
                  <div className="flex flex-col items-center sm:items-start">
                    <h2 className="text-lg font-semibold mb-1">{hotel.city_name}</h2>
                    <h3 className="text-md font-medium mb-1">{hotel.hotel_name}</h3>
                    <p className="text-gray-700 mb-2 text-sm text-center sm:text-left">{hotel.description}</p>
                    <button
                      onClick={() => handleSelectHotel(hotel)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Select To Book
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {selectedHotel && (
              <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Booking Details</h2>
                <p className="mb-2">{`Selected Hotel: ${selectedHotel.hotel_name}`}</p>
                <label className="block mb-2 text-sm">
                  Room Class:
                  <select
                    value={roomClass}
                    onChange={handleRoomClassChange}
                    className="w-full p-2 border border-gray-300 rounded-lg mt-1 text-sm"
                  >
                    {Object.keys(selectedHotel.price_options).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex items-center mb-2">
                  <button
                    onClick={() => handleRoomCountChange(-1)}
                    className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-l-lg border border-gray-300 text-sm"
                  >
                    -
                  </button>
                  <span className="px-2 py-0.5 border-t border-b border-gray-300 text-sm">{roomCount}</span>
                  <button
                    onClick={() => handleRoomCountChange(1)}
                    className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-r-lg border border-gray-300 text-sm"
                  >
                    +
                  </button>
                </div>
                <label className="block mb-2 text-sm">
                  Start Date:
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={`w-full p-2 border border-gray-300 rounded-lg mt-1 text-sm ${formErrors.startDate ? 'border-red-500' : ''}`}
                  />
                  {formErrors.startDate && (
                    <p className="text-red-500">Start Date is required.</p>
                  )}
                </label>
                <label className="block mb-2 text-sm">
                  End Date:
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className={`w-full p-2 border border-gray-300 rounded-lg mt-1 text-sm ${formErrors.endDate ? 'border-red-500' : ''}`}
                  />
                  {formErrors.endDate && (
                    <p className="text-red-500">End Date is required.</p>
                  )}
                </label>
                <p className="mb-1 text-sm">{`Number of Days: ${numberOfDays}`}</p>
                <p className="mb-1 text-sm font-bold text-green-500">{`Price per Day: ₹${selectedHotel.price_options[roomClass]?.room_count["1_room_2_adults"] || 0}`}</p>
                <p className="text-lg font-bold">{`Total Price: ₹${totalPrice}`}</p>
                <button
                  onClick={handleGoToPayment}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200 mt-3 text-sm"
                >
                  Go To Payment
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center my-6 text-gray-600 mt-4">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearchResults;
