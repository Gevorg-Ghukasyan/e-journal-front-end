import api from './api'

const teacherService = {
  // Get teacher's courses
  getCourses: async () => {
    const response = await api.get('/api/teachers/courses')
    return response.data
  },

  // Get course by ID
  getCourse: async (courseId) => {
    const response = await api.get(`/api/teachers/courses/${courseId}`)
    return response.data
  },

  // Create course
  createCourse: async (courseData) => {
    const response = await api.post('/api/teachers/courses', courseData)
    return response.data
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/api/teachers/courses/${courseId}`, courseData)
    return response.data
  },

  // Get students in a course
  getCourseStudents: async (courseId) => {
    const response = await api.get(`/api/teachers/courses/${courseId}/students`)
    return response.data
  },

  // Get assignments for a course
  getCourseAssignments: async (courseId) => {
    const response = await api.get(`/api/teachers/courses/${courseId}/assignments`)
    return response.data
  },

  // Create assignment
  createAssignment: async (courseId, assignmentData) => {
    const response = await api.post(`/api/teachers/courses/${courseId}/assignments`, assignmentData)
    return response.data
  },

  // Update assignment
  updateAssignment: async (courseId, assignmentId, assignmentData) => {
    const response = await api.put(`/api/teachers/courses/${courseId}/assignments/${assignmentId}`, assignmentData)
    return response.data
  },

  // Publish/unpublish assignment
  publishAssignment: async (courseId, assignmentId, publish = true) => {
    const response = await api.post(
      `/api/teachers/courses/${courseId}/assignments/${assignmentId}/publish?publish=${publish}`
    )
    return response.data
  },

  // Get submissions for an assignment
  getAssignmentSubmissions: async (assignmentId) => {
    const response = await api.get(`/api/teachers/assignments/${assignmentId}/submissions`)
    return response.data
  },

  // Grade a submission
  gradeSubmission: async (submissionId, grade) => {
    const response = await api.post(`/api/teachers/submissions/${submissionId}/grades`, {
      value: grade
    })
    return response.data
  }
}

export default teacherService
