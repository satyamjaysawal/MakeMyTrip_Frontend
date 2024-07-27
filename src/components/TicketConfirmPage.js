import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TicketConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passengerDetails, bookingId } = location.state || {};

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Ticket Confirmation', 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Name', passengerDetails.name],
        ['Age', passengerDetails.age],
        ['Gender', passengerDetails.gender],
        ['Mobile', passengerDetails.mobile],
        ['Email', passengerDetails.email],
        ['Payment Method', passengerDetails.paymentMethod],
        ['Meal Preference', passengerDetails.mealPreference],
        ['Travel Insurance', passengerDetails.travelInsurance ? 'Yes' : 'No'],
        ['Booking ID', bookingId],
        ['Flight From', `${passengerDetails.flightDetails.from} (${passengerDetails.flightDetails.fromAirport})`],
        ['Flight To', `${passengerDetails.flightDetails.to} (${passengerDetails.flightDetails.toAirport})`],
        ['Flight Date', passengerDetails.flightDetails.date],
      ],
    });

    doc.save('ticket.pdf');
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-600 flex items-center justify-center space-x-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_eQV1qwK3gDknamWtl4VlC-MDnO_JR8tGs7UPutTNEsnJ-r86lWFJHJpxORu-N7AlFpc&usqp=CAU" alt="Ticket Icon" className="w-8 h-8" />
        <span>Ticket Confirmation</span>
      </h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {passengerDetails.name}</p>
        <p><strong>Age:</strong> {passengerDetails.age}</p>
        <p><strong>Gender:</strong> {passengerDetails.gender}</p>
        <p><strong>Mobile:</strong> {passengerDetails.mobile}</p>
        <p><strong>Email:</strong> {passengerDetails.email}</p>
        <p><strong>Payment Method:</strong> {passengerDetails.paymentMethod}</p>
        <p><strong>Meal Preference:</strong> {passengerDetails.mealPreference}</p>
        <p><strong>Travel Insurance:</strong> {passengerDetails.travelInsurance ? 'Yes' : 'No'}</p>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Flight From:</strong> {passengerDetails.flightDetails.from} ({passengerDetails.flightDetails.fromAirport})</p>
        <p><strong>Flight To:</strong> {passengerDetails.flightDetails.to} ({passengerDetails.flightDetails.toAirport})</p>
        <p><strong>Flight Date:</strong> {passengerDetails.flightDetails.date}</p>
      </div>
      <button onClick={generatePDF} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
        Download Ticket PDF
      </button>
    </div>
  );
};

export default TicketConfirmPage;
