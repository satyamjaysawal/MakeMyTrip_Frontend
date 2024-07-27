import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlightSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, specialFareOption } = location.state || { flights: [], specialFareOption: 'Regular' };

  const handlePayClick = (flight) => {
    navigate('/payFlightBook', { state: { flight, specialFareOption } });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(https://travel-blog.happyeasygo.com/wp-content/uploads/2021/03/Booking-early.jpg)' }}
    >
      <div className="bg-white shadow-lg rounded-lg mx-4 my-6 p-6 max-w-4xl w-full opacity-95">
        <h2 className="text-xl font-bold mb-6 text-center text-green-800">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjf50Nu-3w8wOtYhBD1pJ2JZXJWUYNU01Yexog1h0wGeFusbFE7r06jddV4InqRiwgm7c&usqp=CAU" 
            alt="Flights" 
            className="inline-block h-8 w-8 mr-2"
          />
          Available Flights
        </h2>
        {flights.length === 0 ? (
          <p className="text-gray-700 text-base text-center">No flights found matching your criteria.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {flights.map((flight, index) => (
              <div 
                key={index} 
                className="w-full md:w-1/2 lg:w-1/3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                style={{ backgroundImage: 'url(https://regmedia.co.uk/2023/07/04/shutterstock_cloud_skull.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
              >
                <div className="p-4 relative z-10 bg-white bg-opacity-80 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <p className="font-semibold text-base text-gray-900">
                        {flight.from} ({flight.from_airport}) to {flight.to} ({flight.to_airport})
                      </p>
                      <p className="text-sm text-gray-700"><strong>Departure:</strong> {flight.departure_date}</p>
                      {flight.return_date && <p className="text-sm text-gray-700"><strong>Return:</strong> {flight.return_date}</p>}
                      <p className="text-sm text-gray-700"><strong>Travellers Class:</strong> {flight.travellers_class}</p>
                    </div>
                    <div className="text-right md:text-left">
                      <p className="text-base font-semibold text-gray-900">
                        <strong>Special Fare:</strong> ₹{flight.special_fare_option[specialFareOption]}
                      </p>
                      <button
                        className="bg-green-600 text-white text-sm px-4 py-2 rounded-md mt-3 hover:bg-green-700 transition-colors duration-300"
                        onClick={() => handlePayClick(flight)}
                      >
                        Pay ₹{flight.special_fare_option[specialFareOption]}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold mb-2 text-sm text-gray-800"><strong>Flight Details:</strong></p>
                    <ul className="list-disc list-inside pl-4 text-sm text-gray-600">
                      <li><strong>Flight Number:</strong> {flight.flight_number || 'N/A'}</li>
                      <li><strong>Airline:</strong> {flight.airline || 'N/A'}</li>
                      <li><strong>Duration:</strong> {flight.duration || 'N/A'}</li>
                      {/* Add more flight details as needed */}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchResults;
