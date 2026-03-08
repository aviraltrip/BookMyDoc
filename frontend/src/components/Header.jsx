import React from 'react';

const Header = () => {
  return (
    <div className="bg-[#5F6FFF] rounded-xl px-5 py-8 md:px-10 md:py-10 lg:px-16 text-white shadow-md">

      <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start gap-5 md:gap-6 text-center md:text-left">

        {/* Title - smaller but still strong */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          Book Appointment With
          <br className="hidden sm:block" />
          Trusted Doctors
        </h1>

        {/* Description - more compact */}
        <p className="text-sm sm:text-base md:text-lg opacity-95 max-w-2xl">
          Browse our list of trusted doctors and schedule your appointment easily — no hassle.
        </p>

        {/* Button - prominent but not oversized */}
        <a
          href="#speciality"
          className="mt-2 inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full 
                     text-[#5F6FFF] font-medium text-sm sm:text-base 
                     hover:bg-gray-100 hover:shadow-md transition-all duration-300"
        >
          Book appointment
          <span className="text-base">→</span>
          {/* or keep your arrow icon if you prefer:
          <img className="w-3.5" src={assets.arrow_icon} alt="" /> */}
        </a>

      </div>
    </div>
  );
};

export default Header;