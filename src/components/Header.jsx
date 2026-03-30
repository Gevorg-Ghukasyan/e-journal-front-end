import React, { useState } from 'react'

const notificationItems = [
  'Architecture milestone achieved',
  'Economic model revision ready',
  'New Journal entry requires review',
]

export default function Header({ title, subtitle, currentUser, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false)

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
              <div className="user-badge"><span aria-hidden="true">👤</span> {currentUser.name} ({currentUser.role})</div>
              <button className="ghost logout" onClick={onLogout}><span aria-hidden="true">🚪</span> Logout</button>
            </>
          ) : (
            <span className="user-badge"><span aria-hidden="true">👥</span> Guest</span>
          )}
        </div>
      </div>
    </header>
  )
}
