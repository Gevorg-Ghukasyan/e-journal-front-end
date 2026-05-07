import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import StudentPage from './pages/StudentPage'
import TeacherPage from './pages/TeacherPage'
import JournalPage from './pages/JournalPage'
import OverviewPage from './pages/OverviewPage'
import UsersPage from './pages/UsersPage'
import StudentUsersPage from './pages/StudentUsersPage'
import ProfessorUsersPage from './pages/ProfessorUsersPage'
import AdminUsersPage from './pages/AdminUsersPage'
import TeacherCoursesPage from './pages/TeacherCoursesPage'
import TeacherCourseDetailPage from './pages/TeacherCourseDetailPage'
import TeacherAssignmentSubmissionsPage from './pages/TeacherAssignmentSubmissionsPage'
import StudentCoursesPage from './pages/StudentCoursesPage'
import StudentCourseDetailPage from './pages/StudentCourseDetailPage'

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()

  // Home page is a shared landing page for all authenticated users
  const getDashboardPage = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    return <MainPage />
  }

  const normalizedRoles = (currentUser?.roles || []).map((role) => role?.toString().toLowerCase())

  const coursesPath = normalizedRoles.includes('teacher')
    ? '/teacher/courses'
    : normalizedRoles.includes('student')
    ? '/student/courses'
    : '/courses'

  const menuItems = [
    { id: 'main', label: 'Home', path: '/' },
    { id: 'overview', label: 'My Overview', path: '/overview' },
    { id: 'courses', label: 'Courses', path: coursesPath },
    { id: 'journal', label: 'Journal', path: '/journal' },
  ]

  if (normalizedRoles.includes('admin')) {
    menuItems.push({ id: 'users', label: 'Users', path: '/users' })
  }

  if (isAuthenticated) {
    menuItems.push({ id: 'all', label: 'All Academy', path: '/all' })
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                {getDashboardPage()}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <OverviewPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                {normalizedRoles.includes('teacher') ? <TeacherCoursesPage /> : normalizedRoles.includes('student') ? <StudentCoursesPage /> : <MainPage />}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <JournalPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <StudentUsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <ProfessorUsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <AdminUsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all"
          element={
            <ProtectedRoute>
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <OverviewPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute requiredRole="teacher">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <TeacherCoursesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/:courseId"
          element={
            <ProtectedRoute requiredRole="teacher">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <TeacherCourseDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/assignments/:assignmentId"
          element={
            <ProtectedRoute requiredRole="teacher">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <TeacherAssignmentSubmissionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute requiredRole="student">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <StudentCoursesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses/:courseId"
          element={
            <ProtectedRoute requiredRole="student">
              <Layout menuItems={menuItems} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}>
                <StudentCourseDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

