import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = process.env.REACT_APP_BASE_URL;
const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;

function FlightPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, specialFareOption } = location.state || {};

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mealPreference, setMealPreference] = useState('');
  const [travelInsurance, setTravelInsurance] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    const passengerDetails = {
      flightDetails: {
        from: flight.from,
        fromAirport: flight.from_airport,
        to: flight.to,
        toAirport: flight.to_airport,
        date: flight.departure_date,
      },
      name,
      age,
      gender,
      mobile,
      email,
      paymentMethod,
      mealPreference,
      travelInsurance,
    };

    try {
      const response = await fetch(`${baseUrl}/save-passenger-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passengerDetails),
      });

      const data = await response.json();
      console.log('Passenger details saved:', data);

      initiatePayment(data.passenger.bookingId, passengerDetails);
    } catch (error) {
      console.error('Error saving passenger details:', error);
      toast.error('Error saving passenger details. Please try again.');
    }
  };

  const initiatePayment = async (bookingId, passengerDetails) => {
    const amount = flight.special_fare_option[specialFareOption] * 100;
    const currency = 'INR';
    const receipt = `receipt_${bookingId}`;

    try {
      const orderResponse = await fetch(`${baseUrl}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
        }),
      });

      const orderData = await orderResponse.json();
      console.log('Order created:', orderData);

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Flight Booking',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: function (response) {
          console.log('Payment successful', response);
          sendSuccessMail(passengerDetails);
          toast.success('Payment successful!');
          navigate('/ticket-confirm', { state: { passengerDetails, bookingId } });
        },
        prefill: {
          name,
          email,
          contact: mobile,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment. Please try again.');
    }
  };

  const sendSuccessMail = async (passengerDetails) => {
    try {
      const response = await fetch(`${baseUrl}/send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: passengerDetails.email,
          name: passengerDetails.name,
          flightDetails: passengerDetails.flightDetails,
        }),
      });

      const data = await response.json();
      console.log('Email sent successfully:', data);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email. Please try again.');
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(https://www.shutterstock.com/image-vector/3d-pay-mobile-phone-banking-600nw-2200665399.jpg)' }}
    >
      <div className="bg-white shadow-md rounded-md p-4 max-w-lg mx-auto my-8 mt-4 opacity-95">
        <h1 className="text-xl font-semibold mb-4 text-center text-green-600 flex items-center justify-center space-x-2">
          <img src="https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg" alt="Razorpay Logo" className="w-8 h-8" />
          <span>Razorpay Payment Gateway</span>
        </h1>

        <div className="bg-white shadow-md rounded-md p-4 mb-4">
          <p className="text-base font-semibold mb-2 text-green-600">Flight Details:</p>
          {flight && (
            <div className="space-y-1 text-sm">
              <p><strong>From:</strong> {flight.from} ({flight.from_airport})</p>
              <p><strong>To:</strong> {flight.to} ({flight.to_airport})</p>
              <p><strong>Departure Date:</strong> {flight.departure_date}</p>
              {flight.return_date && <p><strong>Return Date:</strong> {flight.return_date}</p>}
              <p><strong>Travellers Class:</strong> {flight.travellers_class}</p>
              <p><strong>Special Fare:</strong> ₹{flight.special_fare_option[specialFareOption]}</p>
            </div>
          )}
        </div>

        <form onSubmit={handlePayment} className="bg-white shadow-md rounded-md p-4 space-y-3">
          <p className="text-base font-semibold mb-2 text-green-600">Passenger Details:</p>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Name</label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Age</label>
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Gender</label>
            <select
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Mobile</label>
            <input
              type="tel"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Email</label>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Payment Method</label>
            <select
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Meal Preference</label>
            <select
              className="p-2 border border-gray-300 rounded-md w-full bg-gray-100 text-xs"
              value={mealPreference}
              onChange={(e) => setMealPreference(e.target.value)}
              required
            >
              <option value="">Select Meal Preference</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="mb-3 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={travelInsurance}
              onChange={(e) => setTravelInsurance(e.target.checked)}
            />
            <label className="text-xs font-medium">Travel Insurance</label>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-md w-full hover:bg-green-700"
          >
            Pay Now
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default FlightPayment;
