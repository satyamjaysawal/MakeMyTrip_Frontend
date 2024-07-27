import React from 'react';

const Where2Go = () => {
    return (
        <div 
            className="bg-gray-100 w-auto bg-cover bg-center" 
            style={{ backgroundImage: "url('https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/cloud-speicher-dienste-t.jpg')" }}
        >
            <header className="bg-white shadow-md py-4 px-8 opacity-70">
                <div className="flex justify-between items-center">
                    <a href="/" className="text-xl font-bold">Where2Go</a>
                    <nav className="flex space-x-4">
                        <ul className="flex space-x-4">
                            <li className="list-none">
                                <a href="/insurance" className="text-gray-600 hover:text-gray-800">Insurance</a>
                                <span className="block text-lg text-gray-600">For International Trips</span>
                            </li>
                            <li className="list-none">
                                <a href="/flights" className="text-gray-600 hover:text-gray-800">Explore International Flights</a>
                                <span className="block text-lg text-gray-600">Cheapest Flights to Paris, Bali, Tokyo & more</span>
                            </li>
                            <li className="list-none">
                                <a href="/mice" className="text-gray-600 hover:text-gray-800">MICE</a>
                                <span className="block text-lg text-gray-600">Offsites, Events & Meetings</span>
                            </li>
                            
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="flex justify-center mt-4">
                <button className="bg-blue-200 text-white py-2 px-4 rounded hover:bg-blue-400">
                    Explore More
                </button>
            </div>
        </div>
    );
}

export default Where2Go;
