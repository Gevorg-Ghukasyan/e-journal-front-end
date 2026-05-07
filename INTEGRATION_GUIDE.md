# E-Journal Frontend Integration Guide

## Overview
The frontend has been fully integrated with the ElectronicJournal backend API. All mock data has been removed and replaced with real API calls.

## Architecture Changes

### 1. Authentication System
- **Location**: `src/contexts/AuthContext.jsx`
- **Service**: `src/services/authService.js`
- **API Client**: `src/services/api.js`

#### Features:
- User registration (Student/Teacher role selection required)
- User login with JWT token storage
- Automatic token refresh on requests
- Token expiration handling
- Logout with cleanup

#### Usage:
```javascript
import { useAuth } from '../contexts/AuthContext'

const { currentUser, login, register, logout, isAuthenticated } = useAuth()
```

### 2. API Integration

#### Base URL
```
http://localhost:5244/api/
```

#### Auth Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

#### Student Endpoints
- `GET /students/courses` - Get enrolled courses
- `POST /students/courses/{courseId}/join` - Enroll in course
- `GET /students/courses/{courseId}/assignments` - Get assignments
- `GET /students/assignments/{assignmentId}` - Get assignment detail
- `POST /students/assignments/{assignmentId}/submissions` - Submit assignment
- `GET /students/submissions` - Get all submissions

#### Teacher Endpoints
- `GET /teachers/courses` - Get teacher's courses
- `GET /teachers/courses/{courseId}/students` - Get course students
- `GET /teachers/courses/{courseId}/assignments` - Get assignments
- `POST /teachers/courses/{courseId}/assignments` - Create assignment
- `GET /teachers/assignments/{assignmentId}/submissions` - Get submissions
- `POST /teachers/submissions/{submissionId}/grades` - Grade submission

### 3. Pages Updated

#### Login/Register Pages
- **LoginPage.jsx** - User login form
- **RegisterPage.jsx** - User registration with role selection
- **AuthPages.css** - Styling for auth pages

#### Dashboard Pages
- **TeacherPage.jsx** - Teacher dashboard with courses and submissions
- **StudentPage.jsx** - Student dashboard with enrolled courses and submissions
- **MainPage.jsx** - Welcome page

#### Protected Components
- **ProtectedRoute.jsx** - Route protection by authentication status and role

### 4. Component Updates

#### Header.jsx
- Updated to use AuthContext
- Shows current user info
- Logout functionality

#### Sidebar.jsx
- Updated to show session info from context
- Displays current user roles

#### Layout.jsx
- Simplified props (removed mock data)
- Works with authentication

## Setup Instructions

### 1. Environment Setup
Ensure the backend is running at `http://localhost:5244/api/`

### 2. Install Dependencies
```bash
npm install
```

### 3. Running the Application
```bash
npm run dev
```

### 4. Testing

#### Registration
1. Go to `/register`
2. Fill in user details
3. **Select role: Student or Teacher** (required)
4. Submit form
5. User is automatically logged in

#### Login
1. Go to `/login`
2. Enter username/email and password
3. Submit form
4. Redirected to appropriate dashboard

#### Role-Based Access
- **Students** see: Courses, Assignments, Submissions
- **Teachers** see: Courses, Student Submissions, Grading Interface
- **Admins** see: Full system management

## API Request/Response Examples

### Registration Request
```javascript
POST /auth/register
{
  "userName": "jdoe",
  "email": "j@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "P@ssw0rd",
  "role": "Student"
}
```

### Login Request
```javascript
POST /auth/login
{
  "userNameOrEmail": "jdoe",
  "password": "P@ssw0rd"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires": "2026-05-07T..."
}
```

## Token Management

### JWT Claims
The JWT token includes:
- `sub` - User ID
- `preferred_username` - Username
- `realm_access.roles` - User roles (array)
- `roleType` - Primary role type (Student/Teacher/User)
- `email` - User email

### Automatic Authorization
All API requests automatically include:
```
Authorization: Bearer <token>
```

### Token Storage
- Stored in `localStorage` as `authToken`
- User info stored as `user` JSON
- Cleared on logout
- Validated on app startup

## Error Handling

### 401 Unauthorized
- Triggered when token is invalid or expired
- Automatically redirects to login page
- Token and user data are cleared

### 403 Forbidden
- User doesn't have required role
- Shown as "Unauthorized" page

### API Errors
- Caught and displayed to user
- Check console for detailed error messages

## Services

### authService
```javascript
import authService from '../services/authService'

authService.register(userData)        // Register new user
authService.login(username, password) // Login
authService.logout()                  // Logout
authService.parseJWT(token)          // Parse JWT payload
authService.isTokenValid(token)      // Check token validity
```

### studentService
```javascript
import studentService from '../services/studentService'

studentService.getCourses()               // Get enrolled courses
studentService.joinCourse(courseId)       // Join course
studentService.getCourseAssignments(courseId)
studentService.getAssignment(assignmentId)
studentService.submitAssignment(assignmentId, content)
studentService.getSubmissions()           // Get all submissions
```

### teacherService
```javascript
import teacherService from '../services/teacherService'

teacherService.getCourses()              // Get teacher's courses
teacherService.getCourseStudents(courseId)
teacherService.getCourseAssignments(courseId)
teacherService.getAssignmentSubmissions(assignmentId)
teacherService.gradeSubmission(submissionId, gradeValue)
```

## File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication context
├── services/
│   ├── api.js                   # Axios client
│   ├── authService.js           # Auth API calls
│   ├── studentService.js        # Student API calls
│   ├── teacherService.js        # Teacher API calls
│   └── journalService.js        # (Legacy - kept for reference)
├── pages/
│   ├── LoginPage.jsx            # Login page
│   ├── RegisterPage.jsx         # Registration page
│   ├── TeacherPage.jsx          # Teacher dashboard
│   ├── StudentPage.jsx          # Student dashboard
│   └── ...                      # Other pages
├── components/
│   ├── ProtectedRoute.jsx       # Route protection
│   ├── Header.jsx               # Updated with auth
│   ├── Sidebar.jsx              # Updated with auth
│   └── ...                      # Other components
└── App.jsx                      # Main app with auth routing
```

## Common Issues

### 1. Token Expired
- User is automatically redirected to login
- Clear `localStorage` and refresh if stuck

### 2. CORS Errors
- Ensure backend is running
- Check backend CORS configuration
- Verify API base URL: `http://localhost:5244/api/`

### 3. 404 Not Found
- Check endpoint naming conventions
- Verify resource IDs in URLs
- Check backend API documentation

### 4. Role-Based Access Issues
- Verify role claims in JWT token (check browser DevTools)
- Ensure correct role is assigned during registration
- Check `currentUser.roles` array in AuthContext

## Development Tips

### Debug Auth State
```javascript
const { currentUser, isAuthenticated, authToken } = useAuth()
console.log({ currentUser, isAuthenticated, authToken })
```

### Check JWT Payload
```javascript
import authService from '../services/authService'
const token = localStorage.getItem('authToken')
console.log(authService.parseJWT(token))
```

### Monitor API Calls
- Check browser Network tab
- Look for Authorization header in requests
- Verify response status codes

## Next Steps

1. Implement remaining API endpoints for user management
2. Add form validation and better error messages
3. Implement course creation and assignment submission UI
4. Add grading interface for teachers
5. Implement real-time notifications
6. Add loading states and skeleton screens
7. Implement pagination for large data sets
8. Add data caching and offline support

## Support

For issues or questions:
1. Check backend API documentation
2. Review browser console for errors
3. Check network requests in DevTools
4. Verify backend is running and accessible
