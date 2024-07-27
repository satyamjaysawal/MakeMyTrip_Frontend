import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const HotelBookingConfirmationPage = () => {
  const location = useLocation();
  const { paymentDetails, paymentId } = location.state || {};
  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
    setLoading(true);
    try {
      const doc = new jsPDF();

      doc.text('Hotel Booking Confirmation', 20, 20);
      doc.autoTable({
        startY: 30,
        head: [['Field', 'Value']],
        body: [
          ['Customer Name', paymentDetails.customerName],
          ['Email', paymentDetails.email],
          ['Phone Number', paymentDetails.phoneNumber],
          ['Hotel Name', paymentDetails.hotel],
          ['Room Class', paymentDetails.roomClass],
          ['Room Count', paymentDetails.roomCount],
          ['Start Date', paymentDetails.startDate],
          ['End Date', paymentDetails.endDate],
          ['Number of Days', paymentDetails.numberOfDays],
          ['Total Price', paymentDetails.totalPrice],
          ['Payment ID', paymentId],
        ],
      });

      doc.save('hotel_booking.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600 flex items-center justify-center space-x-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_eQV1qwK3gDknamWtl4VlC-MDnO_JR8tGs7UPutTNEsnJ-r86lWFJHJpxORu-N7AlFpc&usqp=CAU" alt="Ticket Icon" className="w-8 h-8" />
        <span>Booking Confirmation</span>
      </h1>
      <div className="mb-4">
        <p><strong>Customer Name:</strong> {paymentDetails.customerName}</p>
        <p><strong>Email:</strong> {paymentDetails.email}</p>
        <p><strong>Phone Number:</strong> {paymentDetails.phoneNumber}</p>
        <p><strong>Hotel Name:</strong> {paymentDetails.hotel}</p>
        <p><strong>Room Class:</strong> {paymentDetails.roomClass}</p>
        <p><strong>Room Count:</strong> {paymentDetails.roomCount}</p>
        <p><strong>Start Date:</strong> {paymentDetails.startDate}</p>
        <p><strong>End Date:</strong> {paymentDetails.endDate}</p>
        <p><strong>Number of Days:</strong> {paymentDetails.numberOfDays}</p>
        <p><strong>Total Price:</strong> ₹{paymentDetails.totalPrice}</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
      </div>
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Generating PDF...' : 'Download Ticket PDF'}
      </button>
    </div>
  );
};

export default HotelBookingConfirmationPage;
