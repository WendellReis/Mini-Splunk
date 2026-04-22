import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function validate() {
            try {
                const response = await fetch(`${apiUrl}/auth/validate`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()
                setIsValid(data.success)

            } catch (err) {
                setIsValid(false)
            }
        }

        validate()
    }, [])

    if (isValid === null) {
        return <p>Carregando...</p>
    }

    if (!isValid) {
        return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute