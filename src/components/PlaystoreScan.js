import React from 'react';

const PlaystoreScan = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg mx-4 md:mx-16 lg:mx-40 my-8">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center md:text-left">Download App Now!</h1>
        </header>
        <button className="text-blue-500 underline mb-4 block mx-auto md:mx-0 bg-transparent border-none">
          Use code WELCOMEMMT and get FLAT 12% OFF on your first domestic flight booking
        </button>
        <main className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">+91</p>
              <input
                type="text"
                placeholder="Enter Mobile number"
                className="rounded-md border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
                GET IT ON
              </button>
              <a
                href="https://apps.apple.com/in/app/makemytrip-flight-hotel-bus/id530488359"
                className="border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-500 px-2 py-1 rounded"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf4_2z_MQr4Pk2FMzL7cJ-DHrVf3xSM3kCrSimihR5_TkMfqBA73j0dk1IEbl24632Y20&usqp=CAU"
                  alt="Apple Store"
                  className="object-contain h-6 w-20"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.makemytrip&hl=en_IN"
                className="border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-500 rounded"
              >
                <img
                  src="https://getsby.com/wp-content/uploads/2023/06/google-play-badge.png"
                  alt="Google Play Store"
                  className="object-contain h-8"
                />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              className="w-32 h-32 md:w-48 md:h-48 object-cover"
              src="https://promos.makemytrip.com/Growth/Images/B2C/dt_app_download_qr.png"
              alt="App QR Code"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlaystoreScan;
