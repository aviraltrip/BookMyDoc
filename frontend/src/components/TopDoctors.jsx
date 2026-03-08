import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const {doctors} = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10">

      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Top Doctors to Book
      </h1>
      <p className="sm:w-2/3 md:w-1/2 text-center text-gray-600 text-sm md:text-base">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8 px-4 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick={()=>navigate(`/appointment/${item._id}`)}
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100/40 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="bg-blue-50 h-56 sm:h-64 overflow-hidden flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>

              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600 mt-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={()=> { navigate('/doctors'); scrollTo(0,0)}} className="mt-12 bg-blue-50 text-gray-700 px-10 py-3.5 rounded-full text-sm font-medium
       hover:bg-blue-100 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">more</button>
    </div>
  );
};

export default TopDoctors;