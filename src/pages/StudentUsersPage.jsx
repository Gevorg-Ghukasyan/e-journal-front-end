import React from 'react'

export default function StudentUsersPage({ users }) {
  const students = users.filter(u => u.role === 'STUDENT')
  return (
    <div className="panel">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((u) => (
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