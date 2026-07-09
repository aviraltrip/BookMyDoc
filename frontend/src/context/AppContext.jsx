import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = '₹';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  const [userData, setUserData] = useState(null)

  const loadUserData = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/get-profile',
        {},
        { headers: { token } }
      );

      if (data && data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data?.message || 'Failed to load user data');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to load user data');
    }
  }
  const getDoctorsData = async () => {
    try {
        const {data} = await axios.get(backendUrl + '/api/doctor/list')
        if(data.success) {
            setDoctors(data.doctors);
        }
        else {
            toast.error(data.message);
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        
    }
  }
  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if(token) {
      loadUserData();
    } else {
      setUserData(null);
    }
  }, [token] );

  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;