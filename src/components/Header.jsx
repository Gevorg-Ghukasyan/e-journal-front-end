import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const notificationItems = [
  'Architecture milestone achieved',
  'Economic model revision ready',
  'New Journal entry requires review',
]

export default function Header({ title, subtitle, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo-icon" aria-hidden="true">🏛️</div>
        <div>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="pulse-header">ARCHITECTURE · ECONOMICS · PROGRAMMING</div>

      <div className="header-actions">
        <button
          className="notification-button"
          onClick={() => setShowNotifications((prev) => !prev)}
          aria-label="Open notifications"
        >
          <span aria-hidden="true">🔔</span>
          <span className="notification-count">{notificationItems.length}</span>
        </button>
        {showNotifications && (
          <div className="notifications-popup">
            <h4>Notifications</h4>
            <ul>
              {notificationItems.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="user-wrapper">
          {currentUser ? (
            <>
              <div className="user-badge">
                <span aria-hidden="true">👤</span> {currentUser.roles?.[0]?.toUpperCase() || 'USER'}: {currentUser.userName}
              </div>
              <button className="ghost logout" onClick={handleLogout}>
                <span aria-hidden="true">🚪</span> Logout
              </button>
            </>
          ) : (
            <span className="user-badge"><span aria-hidden="true">👥</span> Guest</span>
          )}
        </div>
      </div>
    </header>
  )
}
