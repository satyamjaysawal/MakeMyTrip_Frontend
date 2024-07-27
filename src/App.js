import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import HomeNavbar from './components/HomeNavbar';
import IconsNav from './components/IconsNav';
import FlightSearch from './components/FlightSearch';
import FlightSearchResults from './components/FlightSearchResults';
import HotelsBookingForm from './components/HotelsBookingForm';
import HotelSearchResults from './components/HotelSearchResults';
import HotelBookingConfirmationPage from './components/HotelBookingConfirmationPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { ToastContainer, toast } from 'react-toastify';
import AddFlight from './components/AddFlight';
import Where2Go from './components/Where2Go';
import FlightPayment from './components/FlightPayment';
import HotelPaymentPage from './components/HotelPaymentPage';
import PlaystoreScan from './components/PlaystoreScan';
import TicketConfirmPage from './components/TicketConfirmPage';
import Carts from './components/Carts';
import Offers from './components/Offers';

import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        if (!toast.isActive('login-toast')) {
            toast.info('Please log in to access this page.', {
                toastId: 'login-toast', 
                style: {
                    backgroundColor: '#fff',
                    color: '#ff4d4d'
                },
                progressStyle: {
                    backgroundColor: '#ff1a1a'
                }
            });
        }
        return <Navigate to="/" />;
    }

    return element;
};

const App = () => {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false); // Initially false
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false); // Initially false

    const handleLoginSuccess = () => {
        setLoginModalIsOpen(false);
    };

    const handleRegisterSuccess = () => {
        setRegisterModalIsOpen(false);
        setLoginModalIsOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token on logout
    };

    return (
        <Router>
            <HomeNavbar
                openRegisterModal={() => setRegisterModalIsOpen(true)}
                openLoginModal={() => setLoginModalIsOpen(true)}
            />
            <IconsNav />

            <Routes>
                <Route path="/" element={<FlightSearch />} />
                <Route path="/flight-booking" element={<FlightSearch />} />
                <Route path="/hotel-booking" element={<HotelsBookingForm />} />
                <Route path="/searchResults" element={<FlightSearchResults />} />
                <Route path="/hotel-search-results" element={<HotelSearchResults />} />
                <Route path="/hotel-payment" element={<PrivateRoute element={<HotelPaymentPage />} />} />
                <Route path="/hotel-booking-confirmation" element={<PrivateRoute element={<HotelBookingConfirmationPage />} />} />
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                <Route path="/addflight" element={<AddFlight />} />
                <Route path="/payFlightBook" element={<PrivateRoute element={<FlightPayment />} />} />
                <Route path="/ticket-confirm" element={<PrivateRoute element={<TicketConfirmPage />} />} />
            </Routes>
            <ToastContainer />
            
            <ConditionalFooterAndComponents />

            {/* Login Modal */}
            <Modal
                isOpen={loginModalIsOpen}
                onRequestClose={() => setLoginModalIsOpen(false)}
                contentLabel="Login Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        padding: '20px'
                    }
                }}
            >
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    openRegisterModal={() => setRegisterModalIsOpen(true)}
                    closeModal={() => setLoginModalIsOpen(false)}
                />
            </Modal>

            {/* Register Modal */}
            <Modal
                isOpen={registerModalIsOpen}
                onRequestClose={() => setRegisterModalIsOpen(false)}
                contentLabel="Register Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        padding: '20px'
                    }
                }}
            >
                <Register
                    onRegisterSuccess={handleRegisterSuccess}
                    openLoginModal={() => setLoginModalIsOpen(true)}
                    closeModal={() => setRegisterModalIsOpen(false)}
                />
            </Modal>
        </Router>
    );
};

const ConditionalFooterAndComponents = () => {
    const location = useLocation();
    const hiddenFooterRoutes = [
        '/hotel-payment',
        '/hotel-booking-confirmation',
        '/hotel-search-results',
        '/addflight',
        '/payFlightBook',
        '/ticket-confirm',
        '/searchResults'
    ];

    // Agar current location pathname hiddenFooterRoutes me hai toh Footer render nahi hoga
    return hiddenFooterRoutes.includes(location.pathname) ? null : (
        <>
            <Where2Go />
            <Offers />
            <PlaystoreScan/>
            <Carts />
            <Footer />
        </>
    );
};

export default App;
