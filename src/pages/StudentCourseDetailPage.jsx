import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import studentService from '../services/studentService'
import { useAuth } from '../contexts/AuthContext'

export default function StudentCourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [course, setCourse] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submittingAssignment, setSubmittingAssignment] = useState(null)
  const [submissionContent, setSubmissionContent] = useState('')

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch course details and assignments in parallel
      const [courseData, assignmentsData] = await Promise.all([
        studentService.getCourse(courseId),
        studentService.getCourseAssignments(courseId)
      ])

      setCourse(courseData)
      setAssignments(assignmentsData || [])
    } catch (err) {
      setError(err.message || 'Failed to load course data')
      console.error('Error loading course data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      await studentService.submitAssignment(assignmentId, submissionContent)
      setSubmittingAssignment(null)
      setSubmissionContent('')
      fetchCourseData() // Refresh to show updated submission status
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit assignment')
    }
  }

  const openSubmissionModal = (assignment) => {
    setSubmittingAssignment(assignment)
    setSubmissionContent('')
  }

  if (isLoading) {
    return <div className="panel"><p>Loading course details...</p></div>
  }

  if (error) {
    return (
      <div className="panel">
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={fetchCourseData}>Retry</button>
      </div>
    )
  }

  if (!course) {
    return <div className="panel"><p>Course not found</p></div>
  }

  return (
    <div className="panel">
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate('/student/courses')} style={{ marginBottom: '1rem' }}>
          ← Back to Courses
        </button>
        <h2>{course.name}</h2>
        <p>{course.description}</p>
        {course.teacherName && (
          <div style={{ fontSize: '0.9em', color: '#666' }}>
            Teacher: {course.teacherName}
          </div>
        )}
      </div>

      <h3>Assignments</h3>
      {assignments.length > 0 ? (
        <div className="assignments-list">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="assignment-card"
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h4>{assignment.title}</h4>
                  <p>{assignment.description}</p>
                  <div style={{ fontSize: '0.9em', color: '#666', marginTop: '0.5rem' }}>
                    Due: {new Date(assignment.dueDate).toLocaleString()}
                  </div>
                  {assignment.submission && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                      <span style={{ color: assignment.submission.gradeValue !== null ? '#28a745' : '#ffc107' }}>
                        Submitted: {new Date(assignment.submission.submittedAt).toLocaleString()}
                        {assignment.submission.gradeValue !== null && ` | Grade: ${assignment.submission.gradeValue}`}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  {!assignment.submission ? (
                    <button
                      onClick={() => openSubmissionModal(assignment)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Submit
                    </button>
                  ) : (
                    <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Submitted</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No assignments available</p>
      )}

      {submittingAssignment && (
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
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3>Submit Assignment</h3>
            <p><strong>{submittingAssignment.title}</strong></p>
            <div style={{ marginBottom: '1rem' }}>
              <label>Your Submission:</label>
              <textarea
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                rows="6"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                placeholder="Enter your assignment submission here..."
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSubmittingAssignment(null)}
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
                onClick={() => handleSubmitAssignment(submittingAssignment.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                disabled={!submissionContent.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}