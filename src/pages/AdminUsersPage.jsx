import React from 'react'

export default function AdminUsersPage() {
  return (
    <div className="panel admin-panel">
      <div className="admin-hero">
        <h2>Admin Control Center</h2>
        <p>Golden governance console for institute operations, security oversight, and session management.</p>
      </div>
      <div className="admin-summary">
        <div className="summary-item">System integrity: nominal</div>
        <div className="summary-item">Connected to backend API</div>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>Loading admin data from backend...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}