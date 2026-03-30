import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import StudentPage from './pages/StudentPage'
import TeacherPage from './pages/TeacherPage'
import JournalPage from './pages/JournalPage'
import OverviewPage from './pages/OverviewPage'
import StudentUsersPage from './pages/StudentUsersPage'
import ProfessorUsersPage from './pages/ProfessorUsersPage'
import AdminUsersPage from './pages/AdminUsersPage'
import {
  ROLE,
  USERS,
  COURSES,
  ENROLLMENTS,
  JOURNAL_ENTRIES,
  SEMESTERS,
  getCourseById,
  getUserById,
  calculateFinal,
} from './services/journalService'
import { createFakeJWTPayload } from './utils/auth'

function App() {
  const [activeUserId, setActiveUserId] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const currentUser = useMemo(() => USERS.find((u) => u.id === activeUserId) || null, [activeUserId])
  const jwt = useMemo(() => createFakeJWTPayload(currentUser), [currentUser])

  const userEnrollments = useMemo(() => {
    if (!currentUser || currentUser.role !== ROLE.STUDENT) return []
    return ENROLLMENTS.filter((e) => e.userId === currentUser.id)
  }, [currentUser])

  const userCourses = useMemo(() => {
    if (!currentUser) return []
    if (currentUser.role === ROLE.ADMIN) return COURSES
    if (currentUser.role === ROLE.PROFESSOR) return COURSES.filter((c) => c.professorId === currentUser.id)

    return COURSES.filter((course) => userEnrollments.some((e) => e.courseId === course.id))
  }, [currentUser, userEnrollments])

  const visibleJournal = useMemo(() => {
    if (!currentUser) return []

    if (currentUser.role === ROLE.ADMIN) {
      return JOURNAL_ENTRIES
    }

    if (currentUser.role === ROLE.PROFESSOR) {
      const professorCourseIds = COURSES.filter((c) => c.professorId === currentUser.id).map((c) => c.id)
      return JOURNAL_ENTRIES.filter((entry) => professorCourseIds.includes(entry.courseId))
    }

    const enrolledIds = userEnrollments.map((e) => e.id)
    return JOURNAL_ENTRIES.filter((entry) => enrolledIds.includes(entry.enrollmentId))
  }, [currentUser, userEnrollments])

  const decoratedJournal = useMemo(() => {
    return visibleJournal.map((entry) => {
      const course = getCourseById(entry.courseId)
      const enrollment = ENROLLMENTS.find((e) => e.id === entry.enrollmentId)
      const student = enrollment ? getUserById(enrollment.userId) : null
      return {
        ...entry,
        courseTitle: course?.title || 'N/A',
        studentName: student?.name || 'N/A',
        finalScore: calculateFinal(entry, course),
      }
    })
  }, [visibleJournal])

  const menuItems = [
    { id: 'main', label: 'Home', path: '/' },
    { id: 'overview', label: 'My Overview', path: '/overview' },
    { id: 'courses', label: 'Courses', path: '/courses' },
    { id: 'journal', label: 'Journal', path: '/journal' },
  ]

  if (currentUser?.role === ROLE.ADMIN) {
    menuItems.push({ id: 'users', label: 'Users', path: '/users' })
  }

  if (currentUser) {
    menuItems.push({ id: 'all', label: 'All Academy', path: '/all' })
  }

  const onSignIn = (userId) => {
    setActiveUserId(userId)
  }

  const onLogout = () => {
    setActiveUserId(null)
  }

  return (
    <Router>
      <Layout
        title="E-Journal"
        subtitle="Mock JWT Auth | Arch & Econ Analytics"
        currentUser={currentUser}
        onLogout={onLogout}
        menuItems={menuItems}
        jwt={jwt}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={setSidebarCollapsed}
      >
        <Routes>
          <Route path="/" element={<MainPage currentUser={currentUser} users={USERS} onSignIn={onSignIn} />} />
          <Route path="/overview" element={currentUser ? <OverviewPage userEnrollments={userEnrollments} decoratedJournal={decoratedJournal} /> : <Navigate to="/" />} />
          <Route path="/courses" element={currentUser ? (
            currentUser.role === ROLE.STUDENT ? (
              <StudentPage currentUser={currentUser} courses={userCourses.map((course) => ({
                ...course,
                semester: SEMESTERS.find((s) => s.id === course.semesterId)?.name || 'N/A',
              }))} journal={decoratedJournal} />
            ) : currentUser.role === ROLE.PROFESSOR ? (
              <TeacherPage currentUser={currentUser} courses={userCourses.map((course) => ({
                ...course,
                semester: SEMESTERS.find((s) => s.id === course.semesterId)?.name || 'N/A',
                studentsCount: ENROLLMENTS.filter((e) => e.courseId === course.id).length,
              }))} journal={decoratedJournal} />
            ) : (
              <MainPage currentUser={currentUser} users={USERS} onSignIn={onSignIn} />
            )
          ) : <Navigate to="/" />} />
          <Route path="/journal" element={currentUser ? <JournalPage journal={decoratedJournal} /> : <Navigate to="/" />} />
          <Route path="/users" element={currentUser?.role === ROLE.ADMIN ? <UsersPage users={USERS} /> : <Navigate to="/" />} />
          <Route path="/all" element={currentUser ? (
            <div className="panel">
              <h2>Academy Catalogue</h2>
              <p>All curriculum items in architecture/econ/programming domains.</p>
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Domain</th>
                    <th>Professor</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map((course) => {
                    const professor = USERS.find((u) => u.id === course.professorId)
                    const semester = SEMESTERS.find((s) => s.id === course.semesterId)
                    return (
                      <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.domain}</td>
                        <td>{professor?.name}</td>
                        <td>{semester?.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : <Navigate to="/" />} />
          <Route path="/users/students" element={currentUser?.role === ROLE.ADMIN ? <StudentUsersPage users={USERS} /> : <Navigate to="/" />} />
          <Route path="/users/professors" element={currentUser?.role === ROLE.ADMIN ? <ProfessorUsersPage users={USERS} /> : <Navigate to="/" />} />
          <Route path="/users/admins" element={currentUser?.role === ROLE.ADMIN ? <AdminUsersPage users={USERS} /> : <Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
