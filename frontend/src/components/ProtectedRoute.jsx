import React, { useEffect, useState } from 'react'
import { getAuthToken } from '../utils/auth'
import { jwtDecode } from 'jwt-decode'
import { Routes } from '../routes/route'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({element}) {
    const [isAuthorize, setAuthorized] = useState(null)
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await getAuthToken()
                if(!token) {
                    setAuthorized(false)
                    return
                }
                
                const decoded = jwtDecode(token)
                if(decoded.role === "admin") {
                    setAuthorized(true)
                } else {
                    setAuthorized(false)
                }
            } catch(e) {
                console.error("Authentication error:", e)
                setAuthorized(false)
            }
        }
        checkAuth()
    }, [])

    if (isAuthorize === null) {
        return <div>Loading...</div>
    }

    return isAuthorize ? element : <Navigate to={Routes.Login} />
}
export default ProtectedRoute