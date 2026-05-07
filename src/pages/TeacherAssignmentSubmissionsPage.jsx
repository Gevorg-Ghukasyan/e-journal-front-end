import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import teacherService from '../services/teacherService'
import { useAuth } from '../contexts/AuthContext'

export default function TeacherAssignmentSubmissionsPage() {
  const { assignmentId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [assignment, setAssignment] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gradingSubmission, setGradingSubmission] = useState(null)
  const [gradeValue, setGradeValue] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [assignmentId])

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await teacherService.getAssignmentSubmissions(assignmentId)
      setSubmissions(data || [])

      // Get assignment details from first submission if available
      if (data && data.length > 0) {
        setAssignment({
          id: assignmentId,
          title: data[0].assignmentTitle || 'Assignment',
          courseName: data[0].courseTitle || 'Course'
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to load submissions')
      console.error('Error loading submissions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGradeSubmission = async (submissionId) => {
    try {
      await teacherService.gradeSubmission(submissionId, parseInt(gradeValue))
      setGradingSubmission(null)
      setGradeValue('')
      fetchSubmissions() // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to grade submission')
    }
  }

  const openGradingModal = (submission) => {
    setGradingSubmission(submission)
    setGradeValue(submission.gradeValue?.toString() || '')
  }

  if (isLoading) {
    return <div className="panel"><p>Loading submissions...</p></div>
  }

  if (error) {
    return (
      <div className="panel">
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={fetchSubmissions}>Retry</button>
      </div>
    )
  }

  return (
    <div className="panel">
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
          ← Back
        </button>
        <h2>{assignment?.title || 'Assignment'} Submissions</h2>
        {assignment?.courseName && <p>Course: {assignment.courseName}</p>}
      </div>

      {submissions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Submitted At</th>
              <th>Content Preview</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.studentName || submission.studentUserName || 'Unknown'}</td>
                <td>{new Date(submission.submittedAt).toLocaleString()}</td>
                <td>
                  <div style={{
                    maxWidth: '300px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {submission.content || 'No content'}
                  </div>
                </td>
                <td>{submission.gradeValue !== null ? submission.gradeValue : 'Not graded'}</td>
                <td>
                  <button
                    onClick={() => openGradingModal(submission)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {submission.gradeValue !== null ? 'Update Grade' : 'Grade'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No submissions yet</p>
      )}

      {gradingSubmission && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3>Grade Submission</h3>
            <p><strong>Student:</strong> {gradingSubmission.studentName || gradingSubmission.studentUserName}</p>
            <p><strong>Submitted:</strong> {new Date(gradingSubmission.submittedAt).toLocaleString()}</p>
            <div style={{ marginBottom: '1rem' }}>
              <label>Grade:</label>
              <input
                type="number"
                min="0"
                max="100"
                value={gradeValue}
                onChange={(e) => setGradeValue(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                placeholder="Enter grade (0-100)"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setGradingSubmission(null)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleGradeSubmission(gradingSubmission.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}