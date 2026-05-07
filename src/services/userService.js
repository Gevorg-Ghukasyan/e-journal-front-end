import api from './api'

const userService = {
  // Get current user profile
  getMe: async () => {
    const response = await api.get('/api/users/me')
    return response.data
  },

  // Update current user profile
  updateMe: async (userData) => {
    const response = await api.put('/api/users/me', userData)
    return response.data
  }
}

export default userService