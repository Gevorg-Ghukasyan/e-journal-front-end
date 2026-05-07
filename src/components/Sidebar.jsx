import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const icons = {
  main: '🏠',
  overview: '📊',
  courses: '📚',
  journal: '📝',
  all: '🌐',
  users: '👥',
}

export default function Sidebar({ items, collapsed, onToggle, onSelect }) {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-expanded={!collapsed}>
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => onToggle(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '➡' : '⬅'}
        </button>
      </div>
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => onSelect(item.path)}
            title={item.label}
          >
            <span className="menu-icon" aria-hidden="true">{icons[item.id] || '•'}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className={`sidebar-meta ${collapsed ? 'hidden' : ''}`}>
        <h3>Session info</h3>
        {currentUser ? (
          <>
            <p>user: {currentUser.userName}</p>
            <p>roles: {currentUser.roles?.join(', ') || 'N/A'}</p>
            <p>Status: authenticated</p>
          </>
        ) : (
          <p>Status: not authenticated</p>
        )}
      </div>
    </aside>
  )
}
