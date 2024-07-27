import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Updated to use correct import

const HomeNavbar = ({ openRegisterModal, openLoginModal }) => {
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
    let role = '';

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.user.role;
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav
            className="flex items-center justify-between px-4 py-2 shadow-md"
            style={{ backgroundImage: 'url(//imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg4.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Link to="/">
                <img
                    className="h-10"
                    src="https://promos.makemytrip.com/Growth/Images/1x/mmt_dt_top_icon.png"
                    alt="Logo"
                />
            </Link>

            {/* Desktop Menu */}
            <ul className={`hidden md:flex md:space-x-4 md:items-center ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-1.5 hover:bg-green-300">
                    <i className="fas fa-briefcase text-white text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">Introducing myBiz</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Business Travel Solution</p>
                    </div>
                </li>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-1.5 hover:bg-green-300">
                    <i className="fas fa-building text-white text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">List Your Property</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Start earning today!</p>
                    </div>
                </li>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-1.5 hover:bg-green-300">
                    <i className="fas fa-suitcase text-white text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">My Trips</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Manage your bookings</p>
                    </div>
                </li>

                {role === 'admin' && (
                    <li>
                        <Link to="/addflight" className="nav-button bg-sky-500 hover:bg-green-300 text-white p-2 rounded-lg">
                            +Add Flight
                        </Link>
                    </li>
                )}
                {token ? (
                    <li className="flex items-center space-x-2 group bg-purple-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                        <i className="fas fa-sign-out-alt text-white"></i>
                        <Link to="/logout" className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200">
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className="flex items-center space-x-2 group bg-purple-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                            <i className="fas fa-sign-in-alt text-white"></i>
                            <button className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200" onClick={openLoginModal}>Login</button>
                        </li>
                        <li className="flex items-center space-x-2 group bg-red-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                            <i className="fas fa-user-plus text-white"></i>
                            <button className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200" onClick={openRegisterModal}>Register</button>
                        </li>
                    </>
                )}
                <li className="flex items-center space-x-1 group bg-yellow-200 rounded-lg border-dotted border border-gray-300 p-1.5 text-xs hover:bg-green-300">
                    <i className="fas fa-globe text-white text-sm"></i>
                    <span className="text-gray-800 group-hover:text-blue-200 text-xs">EN</span>
                    <i className="fas fa-dollar-sign text-gray-800 text-sm"></i>
                    <span className="text-gray-800 group-hover:text-blue-200 text-xs">INR</span>
                    <svg
                        className="fill-current h-3 w-3 text-gray-800 group-hover:text-blue-200"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5 5.5A9 9 0 1 0 14.5 14.5zM7.5 9v7.5a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 1.5 0z" />
                    </svg>
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M4 6H20M4 12H20M4 18H11V16H4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <ul className={`absolute top-16 left-0 w-full bg-white border border-gray-200 md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                    <i className="fas fa-briefcase text-gray-800 text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">Introducing myBiz</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Business Travel Solution</p>
                    </div>
                </li>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                    <i className="fas fa-building text-gray-800 text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">List Your Property</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Start earning today!</p>
                    </div>
                </li>
                <li className="flex items-center space-x-1.5 group rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                    <i className="fas fa-suitcase text-gray-800 text-sm"></i>
                    <div className="flex flex-col">
                        <p className="text-yellow-500 font-semibold group-hover:text-blue-900 text-xs">My Trips</p>
                        <p className="text-orange-500 text-xs group-hover:text-blue-700">Manage your bookings</p>
                    </div>
                </li>

                {role === 'admin' && (
                    <li>
                        <Link to="/addflight" className="nav-button bg-sky-500 hover:bg-green-300 text-white p-2 rounded-lg block text-center">
                            +Add Flight
                        </Link>
                    </li>
                )}
                {token ? (
                    <li className="flex items-center space-x-2 group bg-purple-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                        <i className="fas fa-sign-out-alt text-white"></i>
                        <Link to="/logout" className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200">
                            Logout
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className="flex items-center space-x-2 group bg-purple-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                            <i className="fas fa-sign-in-alt text-white"></i>
                            <button className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200 w-full text-center" onClick={openLoginModal}>Login</button>
                        </li>
                        <li className="flex items-center space-x-2 group bg-red-300 rounded-lg border-dotted border border-gray-400 p-2 hover:bg-green-300">
                            <i className="fas fa-user-plus text-white"></i>
                            <button className="text-gray-800 hover:text-blue-200 group-hover:text-blue-200 w-full text-center" onClick={openRegisterModal}>Register</button>
                        </li>
                    </>
                )}
                <li className="flex items-center space-x-1 group bg-yellow-200 rounded-lg border-dotted border border-gray-300 p-2 text-xs hover:bg-green-300">
                    <i className="fas fa-globe text-gray-800 text-sm"></i>
                    <span className="text-gray-800 group-hover:text-blue-200 text-xs">EN</span>
                    <i className="fas fa-dollar-sign text-gray-800 text-sm"></i>
                    <span className="text-gray-800 group-hover:text-blue-200 text-xs">INR</span>
                    <svg
                        className="fill-current h-3 w-3 text-gray-800 group-hover:text-blue-200"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5 5.5A9 9 0 1 0 14.5 14.5zM7.5 9v7.5a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 1.5 0z" />
                    </svg>
                </li>
            </ul>
        </nav>
    );
};

export default HomeNavbar;
