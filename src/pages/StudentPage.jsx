import React from 'react'

export default function StudentPage({ currentUser, courses, journal }) {
  return (
    <div className="panel">
      <h2>Student Dashboard</h2>
      <p>Hello, {currentUser?.name}</p>
      <h3>Your enrolled courses</h3>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.title} ({c.semester})</li>
        ))}
      </ul>
      <h3>Journal entries</h3>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {journal.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.courseTitle}</td>
              <td>{entry.topic}</td>
              <td>{entry.date}</td>
              <td>{entry.finalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
