import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../routes/route'
import useSignUp from '../hooks/useSignUp'

function SignUp() {
  const navigate = useNavigate()
  const { error, signUp } = useSignUp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  })
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file directly, not in formData
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const submitData = new FormData();
        
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('password', formData.password);
        
        
        if (formData.image) {
            submitData.append("image", formData.image);
           
        }

        const response = await signUp(submitData);
        
        if (response) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            
            navigate(Routes.Login);
            setFormData({
                name: "",
                email: "",
                password: "",
                image: null
            });
            setPreviewUrl(null);
        }
    } catch (err) {
        console.error('Signup failed', err);
    } finally {
        setIsSubmitting(false);
    }
};


  return (
    <>
      <Navbar />
      <div className="h-auto lg:min-h-screen lg:bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-full lg:w-[1200px] bg-white h-auto p-16 mt-7">
          <h1 className="text-[30px] mb-4">Create Account</h1>
          <h1 className="text-[30px] mb-4 font-bold">SignUp</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="border border-gray-300 p-[20px] rounded-[4px]" onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="text-[20px] text-gray-500 font-bold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
              value={formData.name}
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5"
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Upload Image:
            </label>
            <input 
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500 mb-4 mt-2
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-500 file:text-white
                hover:file:bg-red-400"
              required
            />

            {previewUrl && (
              <div className="mb-4">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col items-start gap-4 lg:items-center lg:flex-row">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-red-400 p-3 rounded-[40px] px-10 text-white font-bold hover:bg-red-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Signing up...' : 'Submit'}
              </button>
              <p
                className="underline text-red-600 hover:cursor-pointer hover:text-red-400"
                onClick={() => navigate(Routes.Login)}
              >
                Already have an account
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp