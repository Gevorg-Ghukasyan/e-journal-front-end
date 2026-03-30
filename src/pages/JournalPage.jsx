import React from 'react'

export default function JournalPage({ journal }) {
  return (
    <div className="panel">
      <h2>Journal Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Student</th>
            <th>Topic</th>
            <th>Raw</th>
            <th>Bonus</th>
            <th>Penalty</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {journal.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.courseTitle}</td>
              <td>{entry.studentName}</td>
              <td>{entry.topic}</td>
              <td>{entry.rawScore}</td>
              <td>{entry.bonus}</td>
              <td>{entry.penalty}</td>
              <td>{entry.finalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
