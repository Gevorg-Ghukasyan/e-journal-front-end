import React from 'react'

export default function AdminUsersPage({ users }) {
  const admins = users.filter(u => u.role === 'ADMIN')
  return (
    <div className="panel admin-panel">
      <div className="admin-hero">
        <h2>Admin Control Center</h2>
        <p>Golden governance console for institute operations, security oversight, and session management.</p>
      </div>
      <div className="admin-summary">
        <div className="summary-item">Active admin accounts: {admins.length}</div>
        <div className="summary-item">System integrity: nominal</div>
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
          {admins.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email || 'n/a'}</td>
              <td>{u.department || 'Operations'}</td>
              <td>{u.role}</td>
              <td>{u.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}