import React from 'react';
import { specialityData } from '../assets/assets'; // adjust path if needed
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div 
      className="flex flex-col items-center gap-4 py-16 text-gray-800" 
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors 
        and find the right one for you.
      </p>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link onClick={() => scrollTo(0,0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="
              flex flex-col items-center 
              text-xs cursor-pointer flex-shrink-0
              hover:translate-y-[-10px] 
              transition-all duration-500 ease-out delay-150
              min-w-[100px] sm:min-w-[140px] md:min-w-[160px]
            "
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-16 sm:w-20 md:w-24 mb-2 rounded-full object-cover"
            />
            <p className="text-center font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;