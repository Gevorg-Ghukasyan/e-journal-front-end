import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSES, ENROLLMENTS } from '../services/journalService'

export default function OverviewPage({ userEnrollments, decoratedJournal }) {
  const navigate = useNavigate()

  return (
    <div className="panel">
      <h2>Thematic Horizon</h2>
      <p>Welcome to the architectural economics dashboard with integrated programming design metrics.</p>
      <div className="grid-tiles">
        <div className="tile" onClick={() => navigate('/courses')}>Total Courses: {COURSES.length}</div>
        <div className="tile" onClick={() => navigate('/overview')}>Active Enrollments: {userEnrollments.length}</div>
        <div className="tile" onClick={() => navigate('/journal')}>Journal Entries Visible: {decoratedJournal.length}</div>
        <div className="tile" onClick={() => navigate('/all')}>Architectural Domains: {new Set(COURSES.map((c) => c.domain)).size}</div>
      </div>
    </div>
  )
}