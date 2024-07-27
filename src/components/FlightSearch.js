import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlightSearch = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travellersClass, setTravellersClass] = useState('Economy');
  const [specialFareOption, setSpecialFareOption] = useState('Regular');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const citiesAndAirports = [
    { city: 'Delhi', airport: 'Indira Gandhi International Airport' },
    { city: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International Airport' },
    { city: 'Amritsar', airport: 'Sri Guru Ram Dass Jee International Airport' },
    { city: 'Calicut', airport: 'Calicut International Airport' },
    { city: 'Mangaluru', airport: 'Mangaluru International Airport' },
    { city: 'Bhubaneswar', airport: 'Biju Patnaik International Airport' },
    { city: 'Imphal', airport: 'Bir Tikendrajit International Airport' },
    { city: 'Bagdogra', airport: 'Bagdogra International Airport' },
    { city: 'Visakhapatnam', airport: 'Visakhapatnam International Airport' },
    { city: 'Vijayawada', airport: 'Vijayawada International Airport' },
    { city: 'Raipur', airport: 'Swami Vivekananda International Airport' },
    { city: 'Aurangabad', airport: 'Aurangabad Airport' },
    { city: 'Kandla', airport: 'Kandla Airport' },
    { city: 'Jharsuguda', airport: 'Veer Surendra Sai Airport' },
    { city: 'Chandigarh', airport: 'Chandigarh International Airport' },
    { city: 'Tiruchirappalli', airport: 'Tiruchirappalli International Airport' },
    { city: 'Port Blair', airport: 'Veer Savarkar International Airport' },
    { city: 'Coimbatore', airport: 'Coimbatore International Airport' },
    { city: 'Gaya', airport: 'Gaya International Airport' },
    { city: 'Kannur', airport: 'Kannur International Airport' },
    { city: 'Pune', airport: 'Pune International Airport' },
    { city: 'Tirupati', airport: 'Tirupati International Airport' },
    { city: 'Porbandar', airport: 'Porbandar Airport' },
    { city: 'Shirdi', airport: 'Shirdi International Airport' },
    { city: 'Balurghat', airport: 'Balurghat Airport' },
    { city: 'Tezu', airport: 'Tezu Airport' },
    { city: 'Goa', airport: 'Goa International Airport' },
    { city: 'Varanasi', airport: 'Lal Bahadur Shastri International Airport' },
    { city: 'Indore', airport: 'Devi Ahilyabai Holkar Airport' },
    { city: 'Madurai', airport: 'Madurai Airport' },
    { city: 'Surat', airport: 'Surat International Airport' },
    { city: 'Thiruvananthapuram', airport: 'Thiruvananthapuram International Airport' },
    { city: 'Nashik', airport: 'Nashik International Airport' },
    { city: 'Patna', airport: 'Jayprakash Narayan International Airport' },
    { city: 'Agartala', airport: 'Maharaja Bir Bikram Airport' },
    { city: 'Kushinagar', airport: 'Kushinagar Airport' },
    { city: 'Satna', airport: 'Bharhut Airport' },
    { city: 'Hisar', airport: 'Hisar Airport' },
    { city: 'Rajkot', airport: 'Rajkot (Hirasar) International Airport' }
  ];

  const handleSearch = async () => {
    setError('');
    setLoading(true);

    try {
      if (!from || !to) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams({
        from,
        to,
        departure_date: departureDate,
        return_date: returnDate,
        travellers_class: travellersClass,
        special_fare_option: specialFareOption,
      });

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/flights?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigate('/searchResults', { state: { flights: data, specialFareOption } });
      setError('');
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Unable to fetch flight details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://webcdn.infiniteflight.com/blog/content/images/2023/06/Blog.jpg)' }}>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-4 w-full md:w-4/5 lg:w-3/5 xl:w-1/2 opacity-95 overflow-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Flight Booking Form
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="from" className="block text-sm font-medium mb-1">From *</label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="p-2 border rounded-lg w-full text-sm"
              aria-label="Select departure city"
            >
              <option value="">Select From</option>
              {citiesAndAirports.map((item, index) => (
                <option key={index} value={item.city}>
                  {item.city} - {item.airport}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label htmlFor="to" className="block text-sm font-medium mb-1">To *</label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="p-2 border rounded-lg w-full text-sm"
              aria-label="Select destination city"
            >
              <option value="">Select To</option>
              {citiesAndAirports.map((item, index) => (
                <option key={index} value={item.city}>
                  {item.city} - {item.airport}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center mb-4">
          <h2 className="text-lg font-semibold mr-4">Search Example:</h2>
          <div className="text-green-600 font-bold cursor-pointer hover:scale-105 mb-2 md:mb-0">
            <p>Delhi to Mumbai</p>
            <p>Amritsar to Calicut</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="departureDate" className="block text-sm font-medium mb-1">Departure Date</label>
            <input
              id="departureDate"
              type="date"
              className="p-2 border rounded-lg w-full text-sm"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              aria-label="Select departure date"
            />
          </div>

          <div className="w-full md:w-1/2">
            <label htmlFor="returnDate" className="block text-sm font-medium mb-1">Return Date (optional)</label>
            <input
              id="returnDate"
              type="date"
              className="p-2 border rounded-lg w-full text-sm"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              aria-label="Select return date"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="travellersClass" className="block text-sm font-medium mb-1">Travellers Class</label>
          <select
            id="travellersClass"
            className="p-2 border rounded-lg w-full text-sm"
            value={travellersClass}
            onChange={(e) => setTravellersClass(e.target.value)}
            aria-label="Select travellers class"
          >
            <option value="Economy">Economy</option>
            <option value="Premium">Premium</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium mb-2">Special Fare Options</legend>
          <div className="flex flex-wrap gap-4">
            {['Regular', 'Student', 'Armed Forces', 'Senior Citizen', 'Doctors & Nurses'].map((option) => (
              <label key={option} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  name="specialFareOption"
                  value={option}
                  checked={specialFareOption === option}
                  onChange={() => setSpecialFareOption(option)}
                  className="form-radio"
                  aria-label={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSearch}
            disabled={loading}
            aria-label="Search flights"
          >
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
