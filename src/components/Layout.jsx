import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout({ title, subtitle, currentUser, onLogout, menuItems, jwt, children, sidebarCollapsed, onToggleSidebar }) {
  const navigate = useNavigate()

  const handleMenuSelect = (path) => {
    navigate(path)
  }

  return (
    <div className="app-shell">
      <Header title={title} subtitle={subtitle} currentUser={currentUser} onLogout={onLogout} />
      <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar items={menuItems} jwt={jwt} collapsed={sidebarCollapsed} onToggle={onToggleSidebar} onSelect={handleMenuSelect} />
        <main className="content">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
