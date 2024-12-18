import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { Routes } from '../routes/route'
import useLogin from '../hooks/useLogin'
import { getAuthToken, setAuthToken } from '../utils/auth'
import {jwtDecode} from "jwt-decode"
function Login() {
    const navigate=useNavigate()
    const location = useLocation()
    const {login,error,loading} = useLogin()
  const [formdata,setFormData] = useState({
    email:"",
    password:""
  })
  const handleChange = (e) =>{
    const {name,value} = e.target

    setFormData((prev)=>({
      ...prev,[name]:value
    }))
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: formdata.email,
        password: formdata.password,
      };
  
      const response = await login(loginData);
  
      if (response.token) {
        setAuthToken(response.token);
      } else {
        console.error("No token found in the response");
        return;
      }
  
      const token = await getAuthToken();
  
      if (!token) {
        console.error("Token is null or undefined");
        return;
      }
  
      const decode =  jwtDecode(token);
  
      if (decode.role === "admin") {
        navigate(Routes.Dashboard);
      } else if (decode.role === "user") {
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate(Routes.Home);
        }
      } else {
        console.error("Unauthorized Role:", decode.role);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  
  return (
    <>
        <Navbar/>
        <div className="h-auto lg:min-h-screen lg:bg-gray-50 flex flex-col justify-center items-center">
        <div className='w-full lg:w-[1200px] bg-white h-auto p-16'>
          <h1 className='text-[30px] mb-4'>My Account</h1>
          <h1 className='text-[30px] mb-4 font-bold'>Login</h1>
          <form className='border border-gray-300 p-[20px] rounded-[4px]' onSubmit={handleSubmit}>
            <label className='text-[20px] text-gray-500 font-bold'>Email Address:</label>
            <input 
              type="email" 
              name="email"
              onChange={handleChange}
              value={formdata.email}
              className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5 mt-5' 
              required
            />
            <label className='text-[20px] text-gray-500 font-bold'>Password:</label>
            <input 
              type="password" 
              name="password"
              onChange={handleChange}
              value={formdata.password}
              className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5' 
              required
            />
            <div className='flex gap-4 items-center'>
              <button type="submit" className='bg-red-400 p-3 rounded-[40px] px-10 text-white  hover:bg-red-300'>LOG IN</button>
              <p className='underline text-red-600 hover:cursor-pointer hover:text-red-400' onClick={() => navigate(Routes.SignUp)}>Register</p>
            </div>
          </form>
        </div>
      </div>
    </>
)
}

export default Login