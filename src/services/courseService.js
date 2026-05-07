import api from './api'

const courseService = {
  // Get public courses list (anyone)
  getPublicCourses: async () => {
    const response = await api.get('/api/courses')
    return response.data
  },

  // Get authorized courses (role-based)
  getAuthorizedCourses: async () => {
    const response = await api.get('/api/courses/authorized')
    return response.data
  }
}

export default courseService