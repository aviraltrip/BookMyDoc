import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Login = () => {

  const { backendUrl, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }
      const { data } = await axios.post(backendUrl + endpoint, payload)

      if (data.success && data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success('Logged in successfully')
        navigate('/my-profile')
      } else {
        toast.error(data.message || 'Authentication failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Authentication failed')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>

        <p>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-md text-base shadow-md transition-colors duration-300'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className='text-primary cursor-pointer underline'
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className='text-primary cursor-pointer underline'
            >
              Click here
            </span>
          </p>
        )}

      </div>
    </form>
  )
}

export default Login