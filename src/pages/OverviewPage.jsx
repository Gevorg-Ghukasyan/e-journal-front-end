import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OverviewPage() {
  const navigate = useNavigate()

  return (
    <div className="panel">
      <h2>Thematic Horizon</h2>
      <p>Welcome to the academic dashboard with integrated metrics and telemetry.</p>
      <div className="grid-tiles">
        <div className="tile" onClick={() => navigate('/courses')}>View Courses</div>
        <div className="tile" onClick={() => navigate('/journal')}>My Journal</div>
        <div className="tile" onClick={() => navigate('/all')}>All Courses</div>
        <div className="tile" onClick={() => navigate('/')}>Dashboard</div>
      </div>
      <div className="backend-summary">
        <h3>System Status</h3>
        <div className="event-grid">
          <div className="event-chip event-success">
            <div className="event-chip-header">
              <span className="chip-type">Backend</span>
              <span className="chip-time">Active</span>
            </div>
            <div className="chip-message">Connected to API server</div>
            <div className="chip-status">READY</div>
          </div>
        </div>
      </div>
    </div>
  )
}