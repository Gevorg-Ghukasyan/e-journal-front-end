import React from 'react'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  return (
    <div className="panel">
      <h2>User Management</h2>
      <div className="user-links">
        <Link to="/students" className="user-link">Students</Link>
        <Link to="/teachers" className="user-link">Teachers</Link>
        <Link to="/admins" className="user-link">Admins</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>User management data from backend</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
