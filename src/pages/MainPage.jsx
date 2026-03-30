import React from 'react'

export default function MainPage({ currentUser, users, onSignIn }) {
  if (currentUser) {
    return (
      <div className="panel">
        <h2>Welcome to E-Journal</h2>
        <p>Logged in as: {currentUser.name} ({currentUser.role})</p>
      </div>
    )
  }

  return (
    <div className="panel main-panel">
      <h2 className="main-title">Welcome to E-Journal</h2>
      <p className="main-subtitle">Select a user to sign in (OAuth2/JWT mock mode):</p>
      <div className="info-box">
        <p>Institute of Architectural Programming, Economic Modeling and Smart City Systems.</p>
      </div>
      <div className="user-grid">
        {users.map((person) => (
          <button key={person.id} className="user-card" onClick={() => onSignIn(person.id)}>
            <div className="user-name">{person.name}</div>
            <div className="user-role">{person.role}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
