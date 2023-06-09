import React from 'react'
import authStore from '../stores/authStore'
import { Navigate } from 'react-router-dom'

interface Iprops {
    element: React.ReactNode
}

export default function RequireAuth({ element }: Iprops) {
    const s = authStore()

    console.log("s.loggedIn >>", s.loggedIn)

    if (!s.loggedIn) return <Navigate to="/login" />
    return <>{element}</>

}

