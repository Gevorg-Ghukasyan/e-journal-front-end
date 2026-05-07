import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import studentService from '../services/studentService'
import courseService from '../services/courseService'
import { useAuth } from '../contexts/AuthContext'

export default function StudentCoursesPage() {
  const { currentUser } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [joinCourseId, setJoinCourseId] = useState('')
  const [copiedCourseId, setCopiedCourseId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const [enrolled, publicCourses] = await Promise.all([
        studentService.getCourses(),
        courseService.getPublicCourses()
      ])

      const enrolledIds = new Set((enrolled || []).map((course) => course.id))
      setEnrolledCourses(enrolled || [])
      setAvailableCourses((publicCourses || []).filter((course) => !enrolledIds.has(course.id)))
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load courses')
      console.error('Error loading courses:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinCourse = async (courseId) => {
    try {
      await studentService.joinCourse(courseId)
      setJoinCourseId('')
      fetchCourses()
      setShowJoinForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join course')
      console.error('Error joining course:', err)
    }
  }

  const handleCourseClick = (courseId) => {
    navigate(`/student/courses/${courseId}`)
  }

  const handleCopyCourseId = async (event, courseId) => {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(courseId)
      setCopiedCourseId(courseId)
      setTimeout(() => setCopiedCourseId(null), 1400)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  if (isLoading) {
    return <div className="panel"><p>Loading courses...</p></div>
  }

  if (error) {
    return (
      <div className="panel">
        <p className="error-text">Error: {error}</p>
        <button className="btn-primary" onClick={fetchCourses}>Retry</button>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="page-header">
        <div>
          <h2>Courses</h2>
          <p className="page-description">Browse public courses, copy the course ID, and join the class.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowJoinForm(!showJoinForm)}
        >
          {showJoinForm ? 'Cancel' : 'Join Course'}
        </button>
      </div>

      {showJoinForm && (
        <form className="course-form" onSubmit={(e) => { e.preventDefault(); handleJoinCourse(joinCourseId) }}>
          <h3>Join a Course</h3>
          <p>Enter the Course ID from the public course list below.</p>
          <div className="form-group">
            <label className="form-label" htmlFor="joinCourseId">Course ID</label>
            <input
              id="joinCourseId"
              className="input-field"
              type="text"
              value={joinCourseId}
              onChange={(e) => setJoinCourseId(e.target.value)}
              placeholder="Paste course ID here"
              required
            />
          </div>
          <button type="submit" className="btn-primary">Join Course</button>
        </form>
      )}

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Public Courses</h3>
        {availableCourses.length > 0 ? (
          <div className="courses-grid">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-card-header">
                  <div>
                    <h3>{course.name}</h3>
                    <p className="course-subtitle">{course.description}</p>
                  </div>
                </div>
                <div className="course-card-footer">
                  <div>
                    <span className="course-id-label">Course ID:</span>
                    <span className="course-id-value">{course.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="copy-icon-button"
                      onClick={(e) => handleCopyCourseId(e, course.id)}
                      aria-label="Copy course ID"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="10" height="10" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                    {copiedCourseId === course.id && <span className="copy-feedback">Copied!</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No public courses available to join right now.</p>
        )}
      </section>

      <section>
        <h3 style={{ marginBottom: '1rem' }}>My Courses</h3>
        {enrolledCourses.length > 0 ? (
          <div className="courses-grid">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-card-header">
                  <div>
                    <h3>{course.name}</h3>
                    <p className="course-subtitle">{course.description}</p>
                  </div>
                </div>
                <div className="course-card-footer">
                  <div>
                    <span className="course-id-label">Teacher:</span>
                    <span className="course-id-value">{course.teacherName || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">You are not enrolled in any courses yet. Join one above.</p>
        )}
      </section>
    </div>
  )
}
