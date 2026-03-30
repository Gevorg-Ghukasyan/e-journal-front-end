import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSES, API_EVENTS } from '../services/journalService'

export default function OverviewPage({ userEnrollments, decoratedJournal }) {
  const navigate = useNavigate()
  const uniqueDomains = new Set(COURSES.map((c) => c.domain)).size

  return (
    <div className="panel">
      <h2>Thematic Horizon</h2>
      <p>Welcome to the architectural economics dashboard with integrated programming design metrics, data lineage, and mock backend telemetry.</p>
      <div className="grid-tiles">
        <div className="tile" onClick={() => navigate('/courses')}>Total Courses: {COURSES.length}</div>
        <div className="tile" onClick={() => navigate('/overview')}>Active Enrollments: {userEnrollments.length}</div>
        <div className="tile" onClick={() => navigate('/journal')}>Journal Entries Visible: {decoratedJournal.length}</div>
        <div className="tile" onClick={() => navigate('/all')}>Architectural Domains: {uniqueDomains}</div>
      </div>
      <div className="backend-summary">
        <h3>Mock Backend Telemetry</h3>
        <div className="event-grid">
          {API_EVENTS.slice(0, 4).map((event) => (
            <div key={event.id} className={`event-chip event-${event.status}`}>
              <div className="event-chip-header">
                <span className="chip-type">{event.type}</span>
                <span className="chip-time">{event.timestamp}</span>
              </div>
              <div className="chip-message">{event.message}</div>
              <div className="chip-status">{event.status.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}