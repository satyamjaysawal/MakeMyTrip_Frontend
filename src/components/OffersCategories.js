// OffersCategories.js
import React from 'react';

const OffersCategories = () => {
  return (
    <div className="flex overflow-x-auto space-x-4 mb-8">
      {['All Offers', 'Bank Offers', 'Flights', 'Hotels', 'Trains', 'Bus'].map((text, index) => (
        <button
          key={index}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default OffersCategories;
