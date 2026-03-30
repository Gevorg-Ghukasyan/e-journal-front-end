import React from 'react'
import { useLocation } from 'react-router-dom'

const icons = {
  main: '🏠',
  overview: '📊',
  courses: '📚',
  journal: '📝',
  all: '🌐',
  users: '👥',
}

export default function Sidebar({ items, jwt, collapsed, onToggle, onSelect }) {
  const location = useLocation()

  return (
    <aside className={collapsed ? 'sidebar collapsed' : 'sidebar'}>
      <div className="sidebar-top">
        <button className="collapse-btn" onClick={() => onToggle(!collapsed)}>
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
            {!collapsed && item.label}
          </button>
        ))}
      </nav>
      <div className={`sidebar-meta ${collapsed ? 'hidden' : ''}`}>
        <h3>JWT Authentication</h3>
        {jwt ? (
          <>
            <p>iss: {jwt.iss}</p>
            <p>sub: {jwt.sub}</p>
            <p>roles: {jwt.realm_access.roles.join(', ')}</p>
            <p>exp: {new Date(jwt.exp * 1000).toLocaleString()}</p>
          </>
        ) : (
          <p>Status: not authenticated</p>
        )}
      </div>
    </aside>
  )
}
