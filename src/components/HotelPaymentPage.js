import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    hotel,
    roomClass,
    roomCount,
    startDate,
    endDate,
    numberOfDays,
    totalPrice,
  } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({
    startDate: !startDate,
    endDate: !endDate,
    customerName: false,
    email: false,
    phoneNumber: false,
  });

  useEffect(() => {
    if (!hotel) {
      navigate('/hotel-search-results');
    }
  }, [hotel, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    // Validate startDate, endDate, and customer details
    const errors = {
      startDate: !startDate,
      endDate: !endDate,
      customerName: !customerDetails.customerName,
      email: !customerDetails.email,
      phoneNumber: !customerDetails.phoneNumber,
    };
    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const orderResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, {
        amount: totalPrice * 100, // Razorpay requires amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      const { id: order_id } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'Hotel Booking',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async (response) => {
          try {
            const paymentDetails = {
              hotel: hotel.hotel_name,
              roomClass,
              roomCount,
              startDate,
              endDate,
              numberOfDays,
              totalPrice,
              customerName: customerDetails.customerName,
              email: customerDetails.email,
              phoneNumber: customerDetails.phoneNumber,
            };

            setPaymentStatus('success');

            // Send email after payment
            await axios.post(`${process.env.REACT_APP_BASE_URL}/send-hotel-mail`, {
              email: customerDetails.email,
              customerName: customerDetails.customerName,
              hotel: hotel.hotel_name,
              roomClass,
              roomCount,
              startDate,
              endDate,
              numberOfDays,
              totalPrice,
            });

            // Redirect to the HotelBookingConfirmationPage
            navigate('/hotel-booking-confirmation', {
              state: {
                paymentDetails,
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (error) {
            setPaymentStatus('failure');
            console.error('Payment validation failed:', error);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: customerDetails.customerName,
          email: customerDetails.email,
          contact: customerDetails.phoneNumber,
        },
        notes: {
          address: 'Hotel Booking Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://dth95m2xtyv8v.cloudfront.net/tesseract/assets/blog/UPI_Payment_Failure_57ba07904b.png')" }}
    >
      <div className="max-w-2xl mx-auto my-6 p-6 bg-white bg-opacity-95 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
          Hotel Payment Page
        </h1>
        {hotel ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">{hotel.hotel_name}</h2>
            <p>{hotel.description}</p>
            <p><strong>Room Class:</strong> {roomClass}</p>
            <p><strong>Room Count:</strong> {roomCount}</p>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Start Date:</span>
                <input
                  type="date"
                  name="startDate"
                  value={startDate || ''}
                  onChange={(e) => setFormErrors({ ...formErrors, startDate: !e.target.value })}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 ${formErrors.startDate ? 'border-red-500' : 'focus:ring-indigo-600'}`}
                />
                {formErrors.startDate && (
                  <p className="text-red-500">Start Date is required.</p>
                )}
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">End Date:</span>
                <input
                  type="date"
                  name="endDate"
                  value={endDate || ''}
                  onChange={(e) => setFormErrors({ ...formErrors, endDate: !e.target.value })}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 ${formErrors.endDate ? 'border-red-500' : 'focus:ring-indigo-600'}`}
                />
                {formErrors.endDate && (
                  <p className="text-red-500">End Date is required.</p>
                )}
              </label>
            </div>
            <p className="font-bold text-green-500"><strong>Total Price:</strong> ₹{totalPrice}</p>
            <p className="font-bold text-green-500"><strong>Price per Day:</strong> ₹{(totalPrice / numberOfDays).toFixed(2)}</p>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Customer Name:</span>
                <input
                  type="text"
                  name="customerName"
                  value={customerDetails.customerName}
                  onChange={handleChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 ${formErrors.customerName ? 'border-red-500' : 'focus:ring-indigo-600'}`}
                />
                {formErrors.customerName && (
                  <p className="text-red-500">Customer Name is required.</p>
                )}
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Email:</span>
                <input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 ${formErrors.email ? 'border-red-500' : 'focus:ring-indigo-600'}`}
                />
                {formErrors.email && (
                  <p className="text-red-500">Email is required.</p>
                )}
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Phone Number:</span>
                <input
                  type="text"
                  name="phoneNumber"
                  value={customerDetails.phoneNumber}
                  onChange={handleChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 ${formErrors.phoneNumber ? 'border-red-500' : 'focus:ring-indigo-600'}`}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500">Phone Number is required.</p>
                )}
              </label>
            </div>
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Go To Payment'}
            </button>
            {paymentStatus && <p className="mt-4 text-green-500">{`Payment ${paymentStatus}`}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        ) : (
          <p className="text-center text-gray-600">No hotel selected. Please go back and select a hotel.</p>
        )}
      </div>
    </div>
  );
};

export default HotelPaymentPage;
