import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  const handleCancel = async (id) => {
    const success = await cancelAppointment(id)
    if (success) {
      getDashData()
    }
  }

  return dashData && (
    <div className='m-5 w-full max-w-6xl'>
      
      {/* Stats Cards */}
      <div className='flex flex-wrap gap-5'>
        {/* Doctors Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-100 shadow-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 bg-blue-50/50 rounded-lg'>
            <img className='w-14' src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-[#1F2937]'>{dashData.doctors}</p>
            <p className='text-gray-500 text-sm font-medium'>Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-100 shadow-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 bg-blue-50/50 rounded-lg'>
            <img className='w-14' src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-[#1F2937]'>{dashData.appointments}</p>
            <p className='text-gray-500 text-sm font-medium'>Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-100 shadow-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 bg-blue-50/50 rounded-lg'>
            <img className='w-14' src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-[#1F2937]'>{dashData.patients}</p>
            <p className='text-gray-500 text-sm font-medium'>Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments list */}
      <div className='bg-white border border-gray-100 rounded-lg mt-10 shadow-sm'>
        <div className='flex items-center gap-2.5 px-6 py-4 border-b border-gray-100'>
          <img src={assets.list_icon} alt="List Icon" />
          <p className='font-semibold text-lg text-[#1F2937]'>Latest Appointment</p>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50/50 transition-colors' key={index}>
              <img className='w-12 h-12 rounded-full object-cover bg-gray-100 border border-gray-100' src={item.docData.image} alt={item.docData.name} />
              <div className='flex-1'>
                <p className='text-[#1F2937] font-semibold text-base'>{item.docData.name}</p>
                <p className='text-gray-500 text-sm mt-0.5'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              <div>
                {item.cancelled ? (
                  <p className='text-red-400 text-xs font-semibold bg-red-50 px-2.5 py-1 rounded-full'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-semibold bg-green-50 px-2.5 py-1 rounded-full'>Completed</p>
                ) : (
                  <img onClick={() => handleCancel(item._id)} className='w-10 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200' src={assets.cancel_icon} alt="Cancel Action" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard