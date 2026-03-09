import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = () => {
    if (!doctors || !docId) return;

    const foundDoctor = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoctor || null);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Doctor Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="w-40 h-40 flex-shrink-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
          </div>

          {/* Main Info */}
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

            {/* About Section */}
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

            {/* Fee */}
            <div className="mt-6">
              <p className="text-gray-700">
                Appointment fee:{' '}
                <span className="font-medium text-gray-900">
                  ${docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* You can add booking button / calendar section here later */}
    </div>
  );
};

export default Appointment;