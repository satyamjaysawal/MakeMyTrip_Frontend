// Offers.js
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import offersData from './offersData.json';
import OffersCategories from './OffersCategories'; // Import OffersCategories component

// Function to chunk the array into smaller arrays of specified size
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const Offers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const offerChunks = chunkArray(offersData, 4); // Chunking offersData into groups of 4

  // Function to handle slide change
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Offers</h1>
        <OffersCategories /> {/* Including OffersCategories component */}
      </div>
      <div className="relative">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          selectedItem={currentSlide}
          onChange={handleSlideChange}
          className="relative"
        >
          {offerChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="flex space-x-4 p-4">
              {chunk.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-lg shadow-lg p-4 w-full sm:w-1/2 lg:w-1/4 ${
                    currentSlide === chunkIndex ? 'border-4 border-blue-500' : ''
                  }`}
                >
                  <img
                    src={offer.img}
                    alt={offer.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold mb-2">{offer.title}</h2>
                    <p className="text-gray-700 mb-2">{offer.description1}</p>
                    <p className="text-gray-700 mb-4">{offer.description2}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={() => setCurrentSlide((currentSlide - 1 + offerChunks.length) % offerChunks.length)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={() => setCurrentSlide((currentSlide + 1) % offerChunks.length)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Offers;
