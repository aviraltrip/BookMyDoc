import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300'>
        <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-center gap-5 font-medium'>
            <NavLink to = '/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to = '/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to = '/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to = '/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div>
            <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium'>Create Account</button>
        </div>
    </div>
  )
}

export default Navbar