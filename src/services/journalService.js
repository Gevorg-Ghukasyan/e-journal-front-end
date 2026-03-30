export const ROLE = {
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
}

export const SEMESTERS = [
  { id: 's1', name: 'Fall 2025' },
  { id: 's2', name: 'Spring 2026' },
]

export const USERS = [
  { id: 'u1', name: 'Ivan Student', role: ROLE.STUDENT },
  { id: 'u2', name: 'Alina Nova', role: ROLE.STUDENT },
  { id: 'u3', name: 'Prof. Anonymus', role: ROLE.PROFESSOR },
  { id: 'u4', name: 'Prof. Black Fate', role: ROLE.PROFESSOR },
  { id: 'u5', name: 'Admin Kairos', role: ROLE.ADMIN },
]

export const COURSES = [
  { id: 'c1', title: 'Dark Theory of Cybersecurity', professorId: 'u3', semesterId: 's1', maxPoints: 100, submissionSurcharge: 10, domain: 'Security Architecture' },
  { id: 'c2', title: 'Strategy and Complexity of Reality', professorId: 'u4', semesterId: 's1', maxPoints: 100, submissionSurcharge: 5, domain: 'Economic Simulation' },
  { id: 'c3', title: 'Threat Analytics and Grim Algorithms', professorId: 'u3', semesterId: 's2', maxPoints: 100, submissionSurcharge: 12, domain: 'Architectural Programming' },
  { id: 'c4', title: 'Architectural Systems and Smart Cities', professorId: 'u4', semesterId: 's2', maxPoints: 100, submissionSurcharge: 8, domain: 'Urban Tech' },
]

export const ENROLLMENTS = [
  { id: 'e1', userId: 'u1', courseId: 'c1', status: 'active', joined: '2025-09-10' },
  { id: 'e2', userId: 'u1', courseId: 'c2', status: 'active', joined: '2025-09-10' },
  { id: 'e3', userId: 'u2', courseId: 'c1', status: 'active', joined: '2025-09-11' },
  { id: 'e4', userId: 'u2', courseId: 'c3', status: 'active', joined: '2026-02-01' },
]

export const JOURNAL_ENTRIES = [
  { id: 'j1', courseId: 'c1', enrollmentId: 'e1', topic: 'Lab #1', date: '2025-10-04', rawScore: 72, bonus: 5, penalty: 3 },
  { id: 'j2', courseId: 'c1', enrollmentId: 'e3', topic: 'Lab #1', date: '2025-10-04', rawScore: 84, bonus: 0, penalty: 0 },
  { id: 'j3', courseId: 'c2', enrollmentId: 'e2', topic: 'Quiz #1', date: '2025-11-01', rawScore: 61, bonus: 2, penalty: 8 },
  { id: 'j4', courseId: 'c3', enrollmentId: 'e4', topic: 'Midterm Exam', date: '2026-04-15', rawScore: 89, bonus: 0, penalty: 0 },
]

export function getCourseById(courseId) {
  return COURSES.find((c) => c.id === courseId)
}

export function getUserById(userId) {
  return USERS.find((u) => u.id === userId)
}

export function calculateFinal(entry, course) {
  if (!course) return 0
  return Math.max(0, Math.min(course.maxPoints, entry.rawScore + entry.bonus - entry.penalty + course.submissionSurcharge))
}
