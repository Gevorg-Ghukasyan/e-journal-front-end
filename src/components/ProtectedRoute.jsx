import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, currentUser, isLoading } = useAuth()

  const normalizedRoles = (currentUser?.roles || []).map((role) => role?.toString().toLowerCase())
  const requiredRoleNormalized = requiredRole?.toString().toLowerCase()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRoleNormalized && !normalizedRoles.includes(requiredRoleNormalized)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
