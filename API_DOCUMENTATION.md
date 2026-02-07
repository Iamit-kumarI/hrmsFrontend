# HRMS API Documentation

## Base URL
```
http://localhost:8080/api
```

---

## 📋 Employee Endpoints

### 1. Get All Employees
**Endpoint:** `GET /employees`

**Example:**
```
http://localhost:8080/api/employees
```

**Response:**
```json
[
  {
    "id": "6986e8fb3255276e628daf77",
    "name": "Test Employee 5",
    "email": "emp5@example.com",
    "department": "Account",
    "role": "EMPLOYEE"
  }
]
```

---

### 2. Create Employee
**Endpoint:** `POST /employees?requesterRole=HR`

**Example:**
```
http://localhost:8080/api/employees?requesterRole=HR
```

**Request Body:**
```json
{
  "name": "Test Employee 7",
  "email": "emp6@example.com",
  "department": "Account",
  "role": "EMPLOYEE"
}
```

**Response:**
```json
{
  "id": "6987285b491bf55be7574edb",
  "name": "Test Employee 7",
  "email": "emp6@example.com",
  "department": "Account",
  "role": "EMPLOYEE"
}
```

---

### 3. Update Employee
**Endpoint:** `PUT /employees/{id}`

**Example:**
```
http://localhost:8080/api/employees/6986e8fb3255276e628daf77
```

**Request Body:**
```json
{
  "name": "Updated Employee Name",
  "email": "newemail@example.com",
  "department": "IT",
  "role": "EMPLOYEE"
}
```

---

### 4. Delete Employee
**Endpoint:** `DELETE /admin/employees/{id}?requesterRole=HR`

**Example:**
```
http://localhost:8080/api/admin/employees/6986e86b3255276e628daf73?requesterRole=HR
```

**Response:**
```
Employee deleted successfully
```

---

## 📅 Attendance Endpoints

### 1. Mark Attendance
**Endpoint:** `POST /attendance`

**Example:**
```
http://localhost:8080/api/attendance
```

**Request Body:**
```json
{
  "employeeId": "6986e8f03255276e628daf76",
  "date": "2026-02-06",
  "present": false
}
```

**Response:**
```json
{
  "id": "69872829491bf55be7574eda",
  "employeeId": "6986e8f03255276e628daf76",
  "date": "2026-02-06",
  "present": false
}
```

---

### 2. Get Overall Attendance Summary
**Endpoint:** `GET /attendance/summary`

**Example:**
```
http://localhost:8080/api/attendance/summary
```

**Response:**
```json
{
  "absent": [
    "6986e8fb3255276e628daf77",
    "6986e8fb3255276e628daf77",
    "6986e8f03255276e628daf76",
    "6986e8f03255276e628daf76"
  ],
  "present": [
    "6986e908325527e628daf78",
    "6986e8b2325527e628daf74",
    "6986e8cd325527e628daf75",
    "6986e8f03255276e628daf76",
    "6986e8fb3255276e628daf77"
  ]
}
```

---

### 3. Get Employee Attendance Summary
**Endpoint:** `GET /attendance/summary/{employeeId}`

**Example:**
```
http://localhost:8080/api/attendance/summary/6986e8fb3255276e628daf77
```

**Response:**
```json
{
  "totalDays": 5,
  "presentDays": 3,
  "records": [
    {
      "id": "6986eacb3255276e628daf7e",
      "employeeId": "6986e8fb3255276e628daf77",
      "date": "2026-02-07",
      "present": true
    },
    {
      "id": "6986ed04f4b746a321e3b33d",
      "employeeId": "6986e8fb3255276e628daf77",
      "date": "2026-02-06",
      "present": false
    }
  ]
}
```

---

## 👨‍💼 HR Management Endpoints

### 1. Create HR User
**Endpoint:** `POST /admin/create-hr?username={username}`

**Example:**
```
http://localhost:8080/api/admin/create-hr?username=hr3
```

**Request Body:**
```json
{
  "id": "5",
  "username": "hr2",
  "password": "hr123",
  "role": "HR"
}
```

**Response:**
```json
{
  "id": "69872875491bf55be7574edc",
  "username": "hr3",
  "password": "hr123",
  "role": "HR"
}
```

---

## 🔑 Query Parameters

### requesterRole
Used for authorization in certain endpoints.

**Values:** `HR` | `EMPLOYEE`

**Usage:**
- Required for creating employees
- Required for deleting employees

**Example:**
```
?requesterRole=HR
```

---

## 📊 Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success - Request completed successfully |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request body or parameters |
| 401 | Unauthorized - Missing or invalid credentials |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## 🎯 Frontend Integration Notes

### API Base URL Configuration
In `src/App.jsx`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Error Handling
All API calls include try-catch blocks with user-friendly error messages.

### CORS Configuration
Make sure your backend has CORS enabled for `http://localhost:3000` (frontend dev server).

---

## 🧪 Testing with Postman

All these endpoints are tested and working in Postman as shown in your screenshots. The frontend implements the exact same structure.

**Collection Structure:**
```
HRMS/
├── ListOfEmployees
├── createHR
├── createEmployee
├── deleteEmployee+HR
├── updateAttendance
├── checkAttendanceSummary
└── checkAttendanceSummaryForOneEmployee
```

---

## 💡 Tips

1. **Always check backend is running** on port 8080 before starting frontend
2. **Employee IDs are MongoDB ObjectIDs** - long alphanumeric strings
3. **Dates format:** `YYYY-MM-DD` (e.g., "2026-02-06")
4. **requesterRole=HR** is needed for admin operations
5. **Check browser console** for detailed error messages
