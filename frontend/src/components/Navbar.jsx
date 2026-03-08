import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(true);

  const isDoctorPage =
    location.pathname.startsWith('/doctors') ||
    location.pathname.startsWith('/appointment');

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300'>

      <img
        onClick={() => navigate('/')}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt=""
      />

      <ul className='hidden md:flex items-center gap-5 font-medium'>

        <NavLink
          to='/'
          className={({ isActive }) =>
            `py-1 ${isActive ? "text-blue-600" : "text-gray-700"}`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to='/doctors'
          className={`py-1 ${isDoctorPage ? "text-blue-600" : "text-gray-700"}`}
        >
          ALL DOCTORS
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) =>
            `py-1 ${isActive ? "text-blue-600" : "text-gray-700"}`
          }
        >
          ABOUT
        </NavLink>

        <NavLink
          to='/contact'
          className={({ isActive }) =>
            `py-1 ${isActive ? "text-blue-600" : "text-gray-700"}`
          }
        >
          CONTACT
        </NavLink>

      </ul>

      <div>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>

            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />

            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

                <p
                  onClick={() => navigate('/my-profile')}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate('/my-appointments')}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>

                <p
                  onClick={() => setToken(false)}
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>

              </div>
            </div>

          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium'
          >
            Create Account
          </button>
        )}
      </div>

    </div>
  )
}

export default Navbar