import React from 'react';
import { Link } from 'react-router-dom';

const IconsNav = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
            <div 
                className="flex flex-wrap justify-around items-center px-4 py-2 bg-gray-200 rounded-t-lg bg-cover bg-center" 
                style={{ backgroundImage: "url('https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/cloud-speicher-dienste-t.jpg')" }}
            >
                <Link to="/flight-booking" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-plane text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Flights</span>
                </Link>
                <Link to="/hotel-booking" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-hotel text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Hotels</span>
                </Link>

                <button aria-label="Homestays & Villas" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-home text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Villas</span>
                </button>

                <button aria-label="Holiday Packages" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-suitcase text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Holiday</span>
                </button>

                <button aria-label="Trains" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-train text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Trains</span>
                </button>

                <button aria-label="Buses" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-bus text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Buses</span>
                </button>

                <button aria-label="Cabs" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-taxi text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Cabs</span>
                </button>

                <button aria-label="Travel Insurance" className="nav-button flex items-center p-2 bg-white border rounded-lg hover:bg-green-100 transition duration-200 text-sm m-2">
                    <i className="fas fa-shield-alt text-blue-600 text-lg mr-1"></i>
                    <span className="text-gray-800 text-sm">Travel Insurance</span>
                </button>
            </div>
        </div>
    );
}

export default IconsNav;
