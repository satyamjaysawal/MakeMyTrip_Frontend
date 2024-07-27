import React, { useState, useEffect } from 'react';

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

const AddFlight = () => {
    const [formData, setFormData] = useState({
        from: '',
        from_airport: '',
        to: '',
        to_airport: '',
        departure_date: '',
        return_date: '',
        travellers_class: 'Economy',
        special_fare_option: {
            Regular: 0,
            Student: 0,
            'Senior Citizen': 0,
            'Armed Forces': 0,
            'Doctor and Nurses': 0,
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSpecialFareChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            special_fare_option: {
                ...formData.special_fare_option,
                [name]: parseInt(value),
            },
        });
    };

    useEffect(() => {
        if (formData.from) {
            const selectedCity = citiesAndAirports.find(location => location.city === formData.from);
            if (selectedCity) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    from_airport: selectedCity.airport,
                }));
            }
        }
    }, [formData.from]);

    useEffect(() => {
        if (formData.to) {
            const selectedCity = citiesAndAirports.find(location => location.city === formData.to);
            if (selectedCity) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    to_airport: selectedCity.airport,
                }));
            }
        }
    }, [formData.to]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/flights`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: formData.from,
                    from_airport: formData.from_airport,
                    to: formData.to,
                    to_airport: formData.to_airport,
                    departure_date: formData.departure_date,
                    return_date: formData.return_date,
                    travellers: {
                        class: formData.travellers_class,
                    },
                    special_fare_option: {
                        Regular: formData.special_fare_option.Regular,
                        Student: formData.special_fare_option.Student,
                        'Senior Citizen': formData.special_fare_option['Senior Citizen'],
                        'Armed Forces': formData.special_fare_option['Armed Forces'],
                        'Doctor and Nurses': formData.special_fare_option['Doctor and Nurses'],
                    },
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add flight');
            }
            alert('Flight added successfully!');
            setFormData({
                from: '',
                from_airport: '',
                to: '',
                to_airport: '',
                departure_date: '',
                return_date: '',
                travellers_class: 'Economy',
                special_fare_option: {
                    Regular: 0,
                    Student: 0,
                    'Senior Citizen': 0,
                    'Armed Forces': 0,
                    'Doctor and Nurses': 0,
                },
            });
        } catch (error) {
            console.error('Error adding flight:', error);
            alert('Failed to add flight. Please try again.');
        }
    };

    return (
        <div 
            className="bg-gray-100 bg-cover bg-center min-h-screen flex items-center justify-center"
            style={{ backgroundImage: "url('https://webcdn.infiniteflight.com/blog/content/images/2024/03/Blog.jpg')" }}
        >
            <div className="bg-white shadow-md rounded-md p-6 max-w-lg w-full opacity-90">
                <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center text-green-600">
                    <img src="https://img.freepik.com/premium-vector/plane-icon_1186366-105964.jpg" alt="Add Flight" className="w-6 h-6 mr-2" /> Add New Flight
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* From and To */}
                        <div className="flex-1 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">From</label>
                                <select
                                    name="from"
                                    className="p-1 border rounded-md w-full text-xs"
                                    value={formData.from}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Departure City</option>
                                    {citiesAndAirports.map((location, index) => (
                                        <option key={index} value={location.city}>{location.city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">From Airport</label>
                                <input
                                    type="text"
                                    name="from_airport"
                                    className="p-1 border rounded-md w-full bg-gray-100 text-xs"
                                    value={formData.from_airport}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">To</label>
                                <select
                                    name="to"
                                    className="p-1 border rounded-md w-full text-xs"
                                    value={formData.to}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Destination City</option>
                                    {citiesAndAirports.map((location, index) => (
                                        <option key={index} value={location.city}>{location.city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">To Airport</label>
                                <input
                                    type="text"
                                    name="to_airport"
                                    className="p-1 border rounded-md w-full bg-gray-100 text-xs"
                                    value={formData.to_airport}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Departure and Return Date */}
                        <div className="flex-1 flex flex-col gap-3">
                            <div>
                                <label className="block text-xs font-medium mb-1">Departure Date</label>
                                <input
                                    type="date"
                                    name="departure_date"
                                    className="p-1 border rounded-md w-full text-xs"
                                    value={formData.departure_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1">Return Date</label>
                                <input
                                    type="date"
                                    name="return_date"
                                    className="p-1 border rounded-md w-full text-xs"
                                    value={formData.return_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Travellers Class */}
                    <div>
                        <label className="block text-xs font-medium mb-1">Travellers Class</label>
                        <select
                            name="travellers_class"
                            className="p-1 border rounded-md w-full text-xs"
                            value={formData.travellers_class}
                            onChange={handleChange}
                            required
                        >
                            <option value="Economy">Economy</option>
                            <option value="Premium">Premium</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    {/* Special Fare Options */}
                    <div className="mt-3">
                        <label className="block text-xs font-medium mb-2">Special Fare Options</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.keys(formData.special_fare_option).map((key, index) => (
                                <div key={index}>
                                    <label className="block text-xs font-medium mb-1">{key}</label>
                                    <input
                                        type="number"
                                        name={key}
                                        placeholder={`${key} Fare`}
                                        className="p-1 border rounded-md w-full text-xs"
                                        value={formData.special_fare_option[key]}
                                        onChange={handleSpecialFareChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-green-500 text-white px-3 py-1 rounded-md transition duration-200 text-xs"
                        >
                            Add Flight
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlight;
