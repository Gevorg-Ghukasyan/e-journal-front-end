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
  { id: 'u1', name: 'Ivan Student', role: ROLE.STUDENT, email: 'ivan@e-journal.local', department: 'Urban Informatics' },
  { id: 'u2', name: 'Alina Nova', role: ROLE.STUDENT, email: 'alina@e-journal.local', department: 'Economic Systems' },
  { id: 'u3', name: 'Prof. Anonymus', role: ROLE.PROFESSOR, email: 'anonymus@e-journal.local', department: 'Security Architecture' },
  { id: 'u4', name: 'Prof. Black Fate', role: ROLE.PROFESSOR, email: 'blackfate@e-journal.local', department: 'Urban Tech' },
  { id: 'u5', name: 'Admin Kairos', role: ROLE.ADMIN, email: 'kairos@e-journal.local', department: 'Systems Governance' },
]

export const COURSES = [
  {
    id: 'c1',
    title: 'Dark Theory of Cybersecurity',
    professorId: 'u3',
    semesterId: 's1',
    maxPoints: 100,
    submissionSurcharge: 10,
    domain: 'Security Architecture',
    credits: 4,
    description: 'A deep systems course for architecture-inspired defense frameworks and emergent anomaly detection.',
  },
  {
    id: 'c2',
    title: 'Strategy and Complexity of Reality',
    professorId: 'u4',
    semesterId: 's1',
    maxPoints: 100,
    submissionSurcharge: 5,
    domain: 'Economic Simulation',
    credits: 3,
    description: 'Economic modeling with structural design metaphors to simulate market architecture and adaptive policy.',
  },
  {
    id: 'c3',
    title: 'Threat Analytics and Grim Algorithms',
    professorId: 'u3',
    semesterId: 's2',
    maxPoints: 100,
    submissionSurcharge: 12,
    domain: 'Architectural Programming',
    credits: 4,
    description: 'Data-driven threat intelligence, advanced scoring, and algorithmic reasoning for smart infrastructure.',
  },
  {
    id: 'c4',
    title: 'Architectural Systems and Smart Cities',
    professorId: 'u4',
    semesterId: 's2',
    maxPoints: 100,
    submissionSurcharge: 8,
    domain: 'Urban Tech',
    credits: 3,
    description: 'Applied urban systems design, planning intelligence and adaptive city service orchestration.',
  },
]

export const ENROLLMENTS = [
  { id: 'e1', userId: 'u1', courseId: 'c1', status: 'active', joined: '2025-09-10', completion: 72 },
  { id: 'e2', userId: 'u1', courseId: 'c2', status: 'active', joined: '2025-09-10', completion: 64 },
  { id: 'e3', userId: 'u2', courseId: 'c1', status: 'active', joined: '2025-09-11', completion: 81 },
  { id: 'e4', userId: 'u2', courseId: 'c3', status: 'active', joined: '2026-02-01', completion: 56 },
]

export const JOURNAL_ENTRIES = [
  {
    id: 'j1',
    courseId: 'c1',
    enrollmentId: 'e1',
    topic: 'Lab #1',
    date: '2025-10-04',
    rawScore: 72,
    bonus: 5,
    penalty: 3,
    source: 'sensor-analytics',
    status: 'reviewed',
    recordedAt: '2025-10-04T09:20:00Z',
    notes: 'Initial computation passed signature validation and schema checks.',
  },
  {
    id: 'j2',
    courseId: 'c1',
    enrollmentId: 'e3',
    topic: 'Lab #1',
    date: '2025-10-04',
    rawScore: 84,
    bonus: 0,
    penalty: 0,
    source: 'manual-entry',
    status: 'confirmed',
    recordedAt: '2025-10-04T09:14:00Z',
    notes: 'High fidelity entry from instructor review pipeline.',
  },
  {
    id: 'j3',
    courseId: 'c2',
    enrollmentId: 'e2',
    topic: 'Quiz #1',
    date: '2025-11-01',
    rawScore: 61,
    bonus: 2,
    penalty: 8,
    source: 'adaptive-quiz',
    status: 'pending',
    recordedAt: '2025-11-01T14:35:00Z',
    notes: 'Subject to revision by economic model calibrator.',
  },
  {
    id: 'j4',
    courseId: 'c3',
    enrollmentId: 'e4',
    topic: 'Midterm Exam',
    date: '2026-04-15',
    rawScore: 89,
    bonus: 0,
    penalty: 0,
    source: 'exam-module',
    status: 'approved',
    recordedAt: '2026-04-15T11:10:00Z',
    notes: 'Scored with architecture-aware rubric and integrity audit.',
  },
  {
    id: 'j5',
    courseId: 'c4',
    enrollmentId: 'e1',
    topic: 'Design Walkthrough',
    date: '2026-03-21',
    rawScore: 77,
    bonus: 3,
    penalty: 1,
    source: 'review-dashboard',
    status: 'reviewed',
    recordedAt: '2026-03-21T16:30:00Z',
    notes: 'Design metrics indicate strong sustainability and system coherence.',
  },
  {
    id: 'j6',
    courseId: 'c2',
    enrollmentId: 'e1',
    topic: 'Forecast Model',
    date: '2026-03-28',
    rawScore: 68,
    bonus: 4,
    penalty: 5,
    source: 'analytics-engine',
    status: 'pending',
    recordedAt: '2026-03-28T10:20:00Z',
    notes: 'Economic forecast module indicates moderate risk with stable recovery.',
  },
  {
    id: 'j7',
    courseId: 'c3',
    enrollmentId: 'e4',
    topic: 'System Trace',
    date: '2026-04-02',
    rawScore: 90,
    bonus: 2,
    penalty: 0,
    source: 'security-suite',
    status: 'approved',
    recordedAt: '2026-04-02T13:45:00Z',
    notes: 'Trace summary confirms resilience profiles and anomaly prediction.',
  },
]

export const API_EVENTS = [
  { id: 'a1', type: 'INFO', message: 'Schema synchronization completed', timestamp: '2026-03-31 08:12', status: 'stable' },
  { id: 'a2', type: 'WARN', message: 'Mock auth token renewed', timestamp: '2026-03-31 08:17', status: 'warning' },
  { id: 'a3', type: 'SUCCESS', message: 'Journal payload processed', timestamp: '2026-03-31 08:23', status: 'success' },
  { id: 'a4', type: 'INFO', message: 'Backend simulation running in local mode', timestamp: '2026-03-31 08:29', status: 'stable' },
  { id: 'a5', type: 'ERROR', message: 'Audit pipeline deferred for review', timestamp: '2026-03-31 08:34', status: 'error' },
]

export function fetchJournalEntries(delay = 420) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JOURNAL_ENTRIES), delay)
  })
}

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
