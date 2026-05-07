import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authToken, setAuthToken] = useState(null)

  // Initialize auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const user = localStorage.getItem('user')

    if (token && authService.isTokenValid(token)) {
      setAuthToken(token)
      if (user) {
        try {
          setCurrentUser(JSON.parse(user))
        } catch (e) {
          console.error('Failed to parse stored user:', e)
          localStorage.removeItem('user')
        }
      }
    } else if (token) {
      // Token expired
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }

    setIsLoading(false)
  }, [])

  const normalizeRoles = (roles) => {
    if (!roles) return []
    if (Array.isArray(roles)) return roles.filter(Boolean).map((role) => role.toString().toLowerCase())
    return [roles.toString().toLowerCase()]
  }

  const getRolesFromToken = (payload, fallbackRole) => {
    if (!payload) return normalizeRoles(fallbackRole)

    const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    const directRole = payload.role || payload.roles
    const roleArray = []

    if (roleClaim) {
      if (Array.isArray(roleClaim)) roleArray.push(...roleClaim)
      else roleArray.push(roleClaim)
    }

    if (directRole) {
      if (Array.isArray(directRole)) roleArray.push(...directRole)
      else roleArray.push(directRole)
    }

    if (payload.realm_access?.roles) {
      roleArray.push(...payload.realm_access.roles)
    }

    if (roleArray.length > 0) {
      return normalizeRoles(roleArray)
    }

    return normalizeRoles(fallbackRole)
  }

  const login = useCallback(async (userNameOrEmail, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await authService.login(userNameOrEmail, password)

      // Parse JWT to get user info
      const tokenPayload = authService.parseJWT(data.token)

      const roles = getRolesFromToken(tokenPayload)
      const user = {
        id: tokenPayload?.sub,
        userName: tokenPayload?.unique_name || tokenPayload?.preferred_username || userNameOrEmail,
        roles,
        roleType: tokenPayload?.roleType || roles[0] || 'user',
        email: tokenPayload?.email,
      }

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(user))

      setAuthToken(data.token)
      setCurrentUser(user)

      return user
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      // Register
      await authService.register(userData)

      // Auto-login after registration
      const loginData = await authService.login(userData.userName, userData.password)

      const tokenPayload = authService.parseJWT(loginData.token)

      const roles = getRolesFromToken(tokenPayload, userData.role)
      const user = {
        id: tokenPayload?.sub,
        userName: tokenPayload?.unique_name || tokenPayload?.preferred_username || userData.userName,
        roles,
        roleType: tokenPayload?.roleType || userData.role || roles[0] || 'user',
        email: userData.email,
      }

      localStorage.setItem('authToken', loginData.token)
      localStorage.setItem('user', JSON.stringify(user))

      setAuthToken(loginData.token)
      setCurrentUser(user)

      return user
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setAuthToken(null)
    setCurrentUser(null)
    setError(null)
  }, [])

  const isAuthenticated = !!authToken && !!currentUser

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    authToken,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
