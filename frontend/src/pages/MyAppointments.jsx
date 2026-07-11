import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { currencySymbol = '₹', backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const formatAppointmentDate = (slotDate, dateValue) => {
    if (slotDate) {
      const dateArray = slotDate.split('_')
      if (dateArray.length === 3) {
        const day = dateArray[0]
        const month = months[Number(dateArray[1]) - 1] || dateArray[1]
        const year = dateArray[2]
        return `${day} ${month} ${year}`
      }

      return slotDate
    }

    if (dateValue) {
      const parsedDate = new Date(dateValue)
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      }
    }

    return 'TBD'
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      })

      if (data.success) {
        setAppointments([...data.appointments].reverse())
      } else {
        toast.error(data.message || 'Unable to load appointments')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message || 'Unable to load appointments')
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    } else {
      setAppointments([])
    }
  }, [token, backendUrl])

  return (
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>My Appointments</p>
          <h2 className='text-2xl font-semibold text-gray-800'>Upcoming visits</h2>
        </div>
        <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-primary'>
          {appointments.filter(item => !item.cancelled && !item.isCompleted).length} booked
        </span>
      </div>

      {appointments.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500'>
          No appointments found yet.
        </div>
      ) : (
        <div className='grid gap-5'>
          {appointments.map((item, index) => {
            const doctor = item.docData || {}
            const appointmentDate = formatAppointmentDate(item.slotDate, item.date)
            const appointmentFee = doctor.fees ?? item.amount ?? 500

            return (
              <div
                key={item._id || index}
                className='flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md'
              >
                <img src={doctor.image} alt={doctor.name || 'Doctor'} className='h-24 w-24 object-cover p-3' />
                <div className='flex flex-1 flex-col justify-between p-4'>
                  <div className='mb-2 flex items-start justify-between gap-4'>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{doctor.name || 'Doctor'}</h3>
                      <p className='text-sm font-medium text-primary'>{doctor.speciality || 'Specialist'}</p>
                      <p className='mt-1 text-sm text-gray-600'>
                        {doctor.address?.line1}
                        <br />
                        {doctor.address?.line2}
                      </p>
                    </div>
                    <div className='ml-auto text-right'>
                      <p className='text-sm text-gray-500'>Date & Time</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {appointmentDate} • {item.slotTime || item.time || 'Time TBD'}
                      </p>
                    </div>
                  </div>

                  <div className='mt-3 flex items-center justify-end gap-3'>
                    <span className='mr-auto text-sm font-medium text-gray-700'>
                      Fee: {currencySymbol}{appointmentFee}
                    </span>
                    {!item.cancelled && !item.isCompleted && (
                      <button className='rounded-full border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-700'>
                        Pay {currencySymbol}{appointmentFee}
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button onClick={() => cancelAppointment(item._id)} className='rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:border-red-400 hover:text-red-500'>
                        Cancel appointment
                      </button>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <button className='rounded-full border border-red-500 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 shadow-sm' disabled>
                        Appointment cancelled
                      </button>
                    )}
                    {item.isCompleted && (
                      <button className='rounded-full border border-green-500 bg-green-50 px-4 py-2 text-sm font-medium text-green-500 shadow-sm' disabled>
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyAppointments