import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import teacherService from '../services/teacherService'
import { useAuth } from '../contexts/AuthContext'

export default function TeacherCoursesPage() {
  const { currentUser } = useAuth()
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCourse, setNewCourse] = useState({ name: '', description: '' })
  const [copiedCourseId, setCopiedCourseId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await teacherService.getCourses()
      setCourses(data || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load courses')
      console.error('Error loading courses:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    try {
      await teacherService.createCourse(newCourse)
      setNewCourse({ name: '', description: '' })
      setShowCreateForm(false)
      fetchCourses() // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create course')
    }
  }

  const handleCourseClick = (courseId) => {
    navigate(`/teacher/courses/${courseId}`)
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
          <h2>My Courses</h2>
          <p className="page-description">Manage your classes, create assignments, and share course IDs with students.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create Course'}
        </button>
      </div>

      {showCreateForm && (
        <form className="course-form" onSubmit={handleCreateCourse}>
          <h3>Create New Course</h3>
          <div className="form-group">
            <label className="form-label">Course Name</label>
            <input
              className="input-field"
              type="text"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              required
              placeholder="Enter course name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="textarea-field"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              rows="4"
              placeholder="Briefly describe the course"
            />
          </div>
          <button type="submit" className="btn-primary">Create Course</button>
        </form>
      )}

      {courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map((course) => (
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
                <div className="copy-row">
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
        <p className="empty-state">No courses available. Create your first course!</p>
      )}
    </div>
  )
}
