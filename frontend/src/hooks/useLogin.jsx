import  { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useLogin() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  
  const login = async (formData) => {
    setError(false)
    setLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()
      const response = await axiosInstance.post('api/login', formData)
      setData(response.data)
      return response.data
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    login,
    data,
    loading,
    error
  }
}

export default useLogin