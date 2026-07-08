import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const { userData, setUserData, backendUrl, token, loadUserData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  if (!userData) {
    return <div className='p-6 text-center text-gray-500'>Loading profile...</div>
  }

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field, value) => {
    setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), [field]: value } }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const saveProfile = async () => {
    if (!userData.name || !userData.phone || !userData.dob || !userData.gender) {
      toast.error('Please complete all required fields')
      return
    }

    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('phone', userData.phone)
    formData.append('address', JSON.stringify(userData.address || { line1: '', line2: '' }))
    formData.append('gender', userData.gender)
    formData.append('dob', userData.dob)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      setIsSaving(true)
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: {
          token,
        },
      })

      if (data?.success) {
        toast.success('Profile updated successfully')
        setImageFile(null)
        await loadUserData()
        setIsEdit(false)
      } else {
        toast.error(data?.message || 'Failed to update profile')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <img
        className='w-36 rounded'
        src={userData.image || assets.profile_pic}
        alt='Profile'
      />
      <div className='flex flex-col gap-3 mt-4'>
        {isEdit ? (
          <input
            className='bg-gray-50 text-3xl font-medium max-w-60'
            type='text'
            value={userData.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        ) : (
          <p className='font-medium text-3xl text-neutral-800'>{userData.name || 'Unnamed'}</p>
        )}
      </div>

      <hr className='bg-zinc-400 h-[1px] border-none mt-4' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email || 'No email'}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 max-w-52'
              type='text'
              value={userData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone || 'Not set'}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div>
              <input
                className='bg-gray-100 mb-2 w-full'
                type='text'
                value={userData.address?.line1 || ''}
                onChange={(e) => handleAddressChange('line1', e.target.value)}
                placeholder='Line 1'
              />
              <input
                className='bg-gray-100 w-full'
                type='text'
                value={userData.address?.line2 || ''}
                onChange={(e) => handleAddressChange('line2', e.target.value)}
                placeholder='Line 2'
              />
            </div>
          ) : (
            <p className='text-gray-500'>
              {userData.address?.line1 || 'No address'}
              <br />
              {userData.address?.line2 || ''}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-gray-100'
              onChange={(e) => handleInputChange('gender', e.target.value)}
              value={userData.gender || 'Not Selected'}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Not Selected'>Not Selected</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender || 'Not Selected'}</p>
          )}

          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-48 bg-gray-100'
              type='date'
              value={userData.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          ) : (
            <p className='text-gray-400'>{userData.dob || 'Not Selected'}</p>
          )}
        </div>
      </div>

      {isEdit && (
        <div className='mt-4'>
          <label className='flex flex-col gap-2 cursor-pointer text-sm text-gray-700'>
            Upload profile picture
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </label>
          {imageFile && <p className='text-xs text-gray-500'>{imageFile.name}</p>}
        </div>
      )}

      <div className='mt-10'>
        <button
          className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={isEdit ? saveProfile : () => setIsEdit(true)}
          disabled={isSaving}
        >
          {isEdit ? (isSaving ? 'Saving...' : 'Save information') : 'Edit'}
        </button>
      </div>
    </div>
  )
}

export default MyProfile