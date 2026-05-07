import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import teacherService from '../services/teacherService'
import { useAuth } from '../contexts/AuthContext'

export default function TeacherCourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [course, setCourse] = useState(null)
  const [students, setStudents] = useState([])
  const [assignments, setAssignments] = useState([])
  const [activeTab, setActiveTab] = useState('students')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateAssignment, setShowCreateAssignment] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: ''
  })

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch course details
      const courseData = await teacherService.getCourse(courseId)
      setCourse(courseData)

      // Fetch students and assignments in parallel
      const [studentsData, assignmentsData] = await Promise.all([
        teacherService.getCourseStudents(courseId),
        teacherService.getCourseAssignments(courseId)
      ])

      setStudents(studentsData || [])
      setAssignments(assignmentsData || [])
    } catch (err) {
      setError(err.message || 'Failed to load course data')
      console.error('Error loading course data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAssignment = async (e) => {
    e.preventDefault()
    try {
      await teacherService.createAssignment(courseId, {
        title: newAssignment.title,
        description: newAssignment.description,
        dueDate: new Date(newAssignment.dueDate).toISOString()
      })
      setNewAssignment({ title: '', description: '', dueDate: '' })
      setShowCreateAssignment(false)
      // Refresh assignments
      const assignmentsData = await teacherService.getCourseAssignments(courseId)
      setAssignments(assignmentsData || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create assignment')
    }
  }

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/teacher/assignments/${assignmentId}`)
  }

  const togglePublishAssignment = async (assignmentId, currentPublished) => {
    try {
      await teacherService.publishAssignment(courseId, assignmentId, !currentPublished)
      // Refresh assignments
      const assignmentsData = await teacherService.getCourseAssignments(courseId)
      setAssignments(assignmentsData || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update assignment')
    }
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
        <button onClick={() => navigate('/teacher/courses')} style={{ marginBottom: '1rem' }}>
          ← Back to Courses
        </button>
        <h2>{course.name}</h2>
        <p>{course.description}</p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'students' ? 'active' : ''}
          onClick={() => setActiveTab('students')}
        >
          Students ({students.length})
        </button>
        <button
          className={activeTab === 'assignments' ? 'active' : ''}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments ({assignments.length})
        </button>
      </div>

      {activeTab === 'students' && (
        <div className="tab-content">
          <h3>Enrolled Students</h3>
          {students.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.userName}</td>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students enrolled yet</p>
          )}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="tab-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Course Assignments</h3>
            <button
              className="btn-primary"
              onClick={() => setShowCreateAssignment(!showCreateAssignment)}
            >
              {showCreateAssignment ? 'Cancel' : 'Create Assignment'}
            </button>
          </div>

          {showCreateAssignment && (
            <form onSubmit={handleCreateAssignment} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h4>Create New Assignment</h4>
              <div style={{ marginBottom: '1rem' }}>
                <label>Title:</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Description:</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Due Date:</label>
                <input
                  type="datetime-local"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <button type="submit" className="btn-primary">Create Assignment</button>
            </form>
          )}

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
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => handleAssignmentClick(assignment.id)}>
                      <h4>{assignment.title}</h4>
                      <p>{assignment.description}</p>
                      <div style={{ fontSize: '0.9em', color: '#666', marginTop: '0.5rem' }}>
                        Due: {new Date(assignment.dueDate).toLocaleString()}
                        {assignment.isPublished !== undefined && (
                          <span style={{ marginLeft: '1rem' }}>
                            Status: {assignment.isPublished ? 'Published' : 'Draft'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <button
                        onClick={() => togglePublishAssignment(assignment.id, assignment.isPublished)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: assignment.isPublished ? '#dc3545' : '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {assignment.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No assignments created yet</p>
          )}
        </div>
      )}
    </div>
  )
}