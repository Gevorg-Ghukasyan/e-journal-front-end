import React from 'react'
import { Link } from 'react-router-dom'

export default function UsersPage({ users }) {
  return (
    <div className="panel">
      <h2>User Management</h2>
      <div className="user-links">
        <Link to="/users/students" className="user-link">Students</Link>
        <Link to="/users/professors" className="user-link">Professors</Link>
        <Link to="/users/admins" className="user-link">Admins</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Роль</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
