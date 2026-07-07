import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const fetchDocInfo = () => {
    if (!doctors || !docId) return;

    const foundDoctor = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoctor || null);
  };

  const getAvailableSlots = async () => {
    const slotsByDay = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const daySlots = [];
      const slotStart = new Date(currentDate);
      slotStart.setHours(i === 0 ? Math.max(10, new Date().getHours() + (new Date().getMinutes() >= 30 ? 1 : 0)) : 10, 0, 0, 0);

      const slotEnd = new Date(currentDate);
      slotEnd.setHours(21, 0, 0, 0);

      let currentSlot = new Date(slotStart);
      while (currentSlot < slotEnd) {
        daySlots.push({
          datetime: new Date(currentSlot),
          time: currentSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
      }

      slotsByDay.push({
        date: currentDate,
        slots: daySlots,
      });
    }

    setDocSlots(slotsByDay);
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo]);
  
  useEffect(() => {
    console.log(docSlots)
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-40 h-40 shrink-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {docInfo.name}
              </h2>
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </div>

            <p className="text-gray-600 mt-1">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <div className="mt-3">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-300">
                {docInfo.experience} years experience
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-gray-900">About</h3>
                <img
                  src={assets.info_icon}
                  alt="Info"
                  className="w-4 h-4"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                {docInfo.about}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-gray-700">
                Appointment fee:{' '}
                <span className="font-medium text-gray-900">
                  {currencySymbol}{docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='mt-3 flex flex-wrap gap-2'>
          {docSlots && docSlots.length > 0 ? (
            docSlots.map((day, index) => (
              <button
                key={index}
                type='button'
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSlotIndex(0);
                  setSlotTime('');
                }}
                className={`rounded-full border px-4 py-2 text-sm ${
                  selectedDayIndex === index ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-700'
                }`}
              >
                <div className='text-center'>
                  <div>{daysOfWeek[day.date.getDay()]}</div>
                  <div className='text-base font-semibold'>{day.date.getDate()}</div>
                </div>
              </button>
            ))
          ) : (
            <p className='text-sm text-gray-500'>No slots available</p>
          )}
        </div>

        <div className='mt-6 grid grid-cols-3 gap-2'>
          {docSlots[selectedDayIndex]?.slots?.map((slot, index) => (
            <button
              key={index}
              type='button'
              onClick={() => {
                setSlotIndex(index);
                setSlotTime(slot.time);
              }}
              className={`rounded-full border px-3 py-2 text-sm ${
                slotIndex === index ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-gray-50 text-gray-700'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        <button type='button' className='mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm text-white'>
          Book an appointment
        </button>
      </div>

      {/* listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;