import apiClient from './api'

export const authService = {
  register: async (userData) => {
    const response = await apiClient.post('/api/auth/register', {
      userName: userData.userName,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      role: userData.role, // 'Student' or 'Teacher'
    })
    return response.data
  },

  login: async (userNameOrEmail, password) => {
    const response = await apiClient.post('/api/auth/login', {
      userNameOrEmail,
      password,
    })
    return response.data
  },

  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  getMe: async () => {
    const response = await apiClient.get('/users/me')
    return response.data
  },

  parseJWT: (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Failed to parse JWT:', error)
      return null
    }
  },

  getTokenExpirationDate: (token) => {
    const payload = authService.parseJWT(token)
    if (!payload || !payload.exp) return null
    return new Date(payload.exp * 1000)
  },

  isTokenValid: (token) => {
    if (!token) return false
    const expirationDate = authService.getTokenExpirationDate(token)
    if (!expirationDate) return false
    return expirationDate > new Date()
  },
}

export default authService
