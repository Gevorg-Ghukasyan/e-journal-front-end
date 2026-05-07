import api from './api'

const studentService = {
  // Get all courses the student is enrolled in
  getCourses: async () => {
    const response = await api.get('/api/students/courses')
    return response.data
  },

  // Get details of a specific course
  getCourse: async (courseId) => {
    const response = await api.get(`/api/students/courses/${courseId}`)
    return response.data
  },

  // Join a course by course ID
  joinCourse: async (courseId) => {
    const response = await api.post(`/api/students/courses/${courseId}/join`)
    return response.data
  },

  // Get assignments for a course
  getCourseAssignments: async (courseId) => {
    const response = await api.get(`/api/students/courses/${courseId}/assignments`)
    return response.data
  },

  // Get assignment detail
  getAssignment: async (assignmentId) => {
    const response = await api.get(`/api/students/assignments/${assignmentId}`)
    return response.data
  },

  // Submit an assignment
  submitAssignment: async (assignmentId, content) => {
    const response = await api.post(`/api/students/assignments/${assignmentId}/submissions`, {
      content: content
    })
    return response.data
  },

  // Get student's submissions
  getMySubmissions: async () => {
    const response = await api.get('/api/students/submissions')
    return response.data
  }
}

export default studentService
