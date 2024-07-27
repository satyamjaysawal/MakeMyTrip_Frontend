import React from 'react';

const Footer = () => {
  const handleSocialClick = (url) => {
    window.location.href = url;
  };

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Why MakeMyTrip?</h3>
            <p className="text-gray-700">
              Established in 2000, MakeMyTrip has since positioned itself as one of the leading companies,
              providing great offers, competitive airfares, exclusive discounts, and a seamless online booking
              experience to many of its customers. The experience of booking your flight tickets, hotel stay,
              and holiday package through our desktop site or mobile app can be done with complete ease and no
              hassles at all. We also deliver amazing offers, such as Instant Discounts, Fare Calendar,
              MyRewardsProgram, MyWallet, and many more while updating them from time to time to better suit our
              customers’ evolving needs and demands.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Booking Flights with MakeMyTrip</h3>
            <p className="text-gray-700">
              At MakeMyTrip, you can find the best of deals and cheap air tickets to any place you want by booking
              your tickets on our website or app. Being India’s leading website for hotel, flight, and holiday
              bookings, MakeMyTrip helps you book flight tickets that are affordable and customized to your
              convenience. With customer satisfaction being our ultimate goal, we also have a 24/7 dedicated
              helpline to cater to our customer’s queries and concerns. Serving over 5 million happy customers,
              we at MakeMyTrip are glad to fulfill the dreams of folks who need a quick and easy means to find air
              tickets. You can get a hold of the cheapest flight of your choice today while also enjoying the other
              available options for your travel needs with us.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Domestic Flights with MakeMyTrip</h3>
            <p className="text-gray-700">
              MakeMyTrip is India’s leading player for flight bookings. With the cheapest fare guarantee,
              experience great value at the lowest price. Instant notifications ensure current flight status,
              instant fare drops, amazing discounts, instant refunds and rebook options, price comparisons and
              many more interesting features.
            </p>
          </div>
        </div>
        <div className="bg-gray-500 px-4 py-8 mt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <button onClick={() => handleSocialClick('#')} className="text-gray-200 hover:text-gray-100">
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={() => handleSocialClick('#')} className="text-gray-200 hover:text-gray-100">
              <i className="fab fa-facebook-f"></i>
            </button>
          </div>
          <div className="text-gray-300 mb-4 md:mb-0">
            © 2024 MAKEMYTRIP PVT. LTD.
          </div>
          <div className="text-gray-300">
            Country <span className="font-bold text-gray-100">India USA UAE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
