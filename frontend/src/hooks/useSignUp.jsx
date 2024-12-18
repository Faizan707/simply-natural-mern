// hooks/useSignUp.js
import { useState } from 'react'
import { getAxiosInstance } from '../utils/axios'

function useSignUp() {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const signUp = async (formData) => {
        setError(false)
        setLoading(true)
        try {
            // Fix: Pass false as first argument and headers as second argument
            const axiosInstance = await getAxiosInstance(false, {
                "Content-Type": "multipart/form-data"
            })
            
            // Add debugging
            console.log("FormData contents:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            
            const response = await axiosInstance.post("/api/register", formData)
            setData(response.data)
            return response.data
        } catch (error) {
            console.error("Signup error:", error);
            setError(error?.response?.data?.message || error.message)
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return {
        error,
        loading,
        data,
        signUp
    }
}

export default useSignUp