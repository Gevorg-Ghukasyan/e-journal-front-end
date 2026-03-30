import React from 'react'

export default function ProfessorUsersPage({ users }) {
  const professors = users.filter(u => u.role === 'PROFESSOR')
  return (
    <div className="panel">
      <h2>Professors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((u) => (
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