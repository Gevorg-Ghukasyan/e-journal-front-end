import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function StudentPage() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    // Redirect to courses page
    navigate('/student/courses', { replace: true })
  }, [navigate])

  return (
    <div className="panel">
      <p>Redirecting to courses...</p>
    </div>
  )
}