import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  const fetchDocInfo = () => {
    if (!doctors || !docId) return;

    const foundDoctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoctor || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    const slotsByDay = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
      const bookedSlots = docInfo.slots_booked?.[dayKey] || [];
      const daySlots = [];

      const startHour = i === 0 ? new Date().getHours() : 10;
      const startMinute = i === 0 ? (new Date().getMinutes() >= 30 ? 30 : 0) : 0;

      for (let hour = startHour < 10 ? 10 : startHour; hour < 21; hour += 1) {
        for (const minute of [0, 30]) {
          const slotDate = new Date(currentDate);
          slotDate.setHours(hour, minute, 0, 0);

          if (i === 0 && slotDate < new Date()) {
            continue;
          }

          const slotTime = slotDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const isBooked = bookedSlots.includes(slotTime);

          if (!isBooked) {
            daySlots.push({
              datetime: slotDate,
              time: slotTime,
              slotDate: dayKey,
            });
          }
        }
      }

      slotsByDay.push({
        date: currentDate,
        slots: daySlots,
      });
    }

    setDocSlots(slotsByDay);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      navigate('/login');
      return;
    }

    if (!selectedSlot) {
      toast.warn('Please select a time slot');
      return;
    }

    if (!docInfo?.available) {
      toast.error('Doctor is not available for booking right now');
      return;
    }

    try {
      setIsBooking(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate: selectedSlot.slotDate,
          slotTime: selectedSlot.time,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message || 'Appointment booked successfully');
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message || 'Unable to book appointment');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong while booking');
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    const currentDaySlots = docSlots[selectedDayIndex]?.slots || [];

    if (currentDaySlots.length > 0 && !currentDaySlots.some((slot) => slot.time === selectedSlot?.time && slot.slotDate === selectedSlot?.slotDate)) {
      setSelectedSlot(currentDaySlots[0]);
    } else if (currentDaySlots.length === 0) {
      setSelectedSlot(null);
    }
  }, [docSlots, selectedDayIndex]);

  if (!docInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="h-40 w-40 shrink-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="h-full w-full rounded-lg border border-gray-200 object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">{docInfo.name}</h2>
              <img src={assets.verified_icon} alt="Verified" className="h-5 w-5" />
            </div>

            <p className="mt-1 text-gray-600">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <div className="mt-3">
              <span className="inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {docInfo.experience} years experience
              </span>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">About</h3>
                <img src={assets.info_icon} alt="Info" className="h-4 w-4" />
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-600">{docInfo.about}</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-700">
                Appointment fee:{' '}
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold text-gray-800">Booking slots</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {docSlots.length > 0 ? (
            docSlots.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedDayIndex(index);
                  setSelectedSlot(null);
                }}
                className={`rounded-full border px-4 py-2 text-sm ${
                  selectedDayIndex === index
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
              >
                <div className="text-center">
                  <div>{daysOfWeek[day.date.getDay()]}</div>
                  <div className="text-base font-semibold">{day.date.getDate()}</div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No slots available</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {docSlots[selectedDayIndex]?.slots?.length > 0 ? (
            docSlots[selectedDayIndex].slots.map((slot, index) => (
              <button
                key={`${slot.time}-${index}`}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-full border px-3 py-2 text-sm ${
                  selectedSlot?.time === slot.time && selectedSlot?.slotDate === slot.slotDate
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-gray-50 text-gray-700'
                }`}
              >
                {slot.time}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No time slots available for this day</p>
          )}
        </div>

        <button
          type="button"
          onClick={bookAppointment}
          disabled={isBooking || !selectedSlot || !docInfo.available || (docSlots[selectedDayIndex]?.slots || []).length === 0}
          className={`mt-6 rounded-full px-4 py-2 text-sm font-medium text-white ${
            isBooking || !selectedSlot || !docInfo.available || (docSlots[selectedDayIndex]?.slots || []).length === 0
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isBooking ? 'Booking...' : docInfo.available ? 'Book an appointment' : 'Not available'}
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;