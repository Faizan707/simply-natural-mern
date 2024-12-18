import React from 'react';
import "../App.css";

function HeroSection() {
  return (
    <div className="bg-[url('https://websitedemos.net/plant-store-02/wp-content/uploads/sites/410/2020/07/hero-bg.jpg')] 
                    bg-cover bg-center w-full h-[600px] 
                    rounded-bl-[80px] rounded-br-[80px] 
                    custom-mobile-borders">
      <div className="flex flex-col p-8 md:p-16 lg:p-24 max-w-[1200px] mx-auto ">
        <p className="text-lg md:text-xl font-[500] text-gray-800 mb-4">
          Best Quality Plants
        </p>
        <div className="w-full md:w-[600px] mb-8">
          <h2 className="sm:w-auto lg:w-[640px] md:w-[640px] text-3xl md:text-5xl lg:text-[4.75rem] font-[500] lg:leading-[1.25] text-gray-900">
            Amazing Variety 
            Of Plants Starting 
            Just $6
          </h2>
        </div>
        <button className="px-10 py-3 rounded-full 
                         bg-[#fc5f5f] hover:bg-green-600 
                         text-white font-medium
                         transition-colors duration-300 
                         w-[200px] h-[50px]">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroSection;