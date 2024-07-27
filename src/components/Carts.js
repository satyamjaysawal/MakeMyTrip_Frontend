import React, { useEffect, useState } from 'react';
import handpickedCollectionsData from './Carts.json';

const Card = ({ title, subtitle, image }) => (
  <div className="flex-shrink-0 w-56 m-2 bg-white rounded-lg shadow-lg overflow-hidden">
    <img className="h-32 w-full object-cover" src={image} alt={title} />
    <div className="p-4">
      <p className="text-sm font-semibold text-gray-700">{subtitle}</p>
      <p className="text-lg font-bold text-gray-900">{title}</p>
    </div>
  </div>
);

const Carousel = ({ title, items }) => (
  <div className="my-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex overflow-x-scroll pb-4 space-x-4">
      {items.map((item, index) => (
        <Card key={index} title={item.title} subtitle={item.subtitle} image={item.image} />
      ))}
    </div>
  </div>
);

const Carts = () => {
  const [data, setData] = useState({ handpickedCollections: [], lesserKnownWonders: [] });

  useEffect(() => {
    // JSON data ko state me set karenge
    setData(handpickedCollectionsData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Carousel title="Handpicked Collections for You" items={data.handpickedCollections} />
      <Carousel title="Unlock Lesser-Known Wonders of India" items={data.lesserKnownWonders} />
    </div>
  );
};

export default Carts;
