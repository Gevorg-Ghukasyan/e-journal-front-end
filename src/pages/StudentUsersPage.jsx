import React from 'react'

export default function StudentUsersPage() {
  return (
    <div className="panel">
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>Loading student data from backend...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}