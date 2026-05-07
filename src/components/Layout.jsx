import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout({ menuItems, children, sidebarCollapsed, setSidebarCollapsed }) {
  const navigate = useNavigate()

  const handleMenuSelect = (path) => {
    navigate(path)
  }

  return (
    <div className="app-shell">
      <Header title="E-Journal" subtitle="Institutional E-Journal" />
      <div className={`layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar items={menuItems} collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} onSelect={handleMenuSelect} />
        <main className="content">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
