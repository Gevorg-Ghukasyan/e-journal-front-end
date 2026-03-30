import React from 'react'

export default function TeacherPage({ currentUser, courses, journal }) {
  return (
    <div className="panel">
      <h2>Teacher Dashboard</h2>
      <p>Hello, {currentUser?.name}</p>
      <h3>Your courses</h3>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.title} ({c.semester}) — {c.studentsCount} students</li>
        ))}
      </ul>
      <h3>Journal entries for your courses</h3>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Topic</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {journal.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.studentName}</td>
              <td>{entry.courseTitle}</td>
              <td>{entry.topic}</td>
              <td>{entry.finalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
