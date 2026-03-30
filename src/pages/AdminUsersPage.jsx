import React from 'react'

export default function AdminUsersPage({ users }) {
  const admins = users.filter(u => u.role === 'ADMIN')
  return (
    <div className="panel">
      <h2>Admins</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}