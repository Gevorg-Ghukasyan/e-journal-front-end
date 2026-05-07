import React from 'react'

export default function JournalPage() {
  return (
    <div className="panel">
      <h2>Journal Overview</h2>
      <p>Journal entries will be displayed here based on your role and access permissions.</p>
      <p>For students: Your submission history</p>
      <p>For teachers: All submissions from your courses</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Student</th>
            <th>Topic</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>No journal entries available</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
