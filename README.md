# HRMS Frontend - Human Resource Management System

A modern, responsive React frontend for the HRMS application with complete employee and attendance management features.

## 🚀 Features

### 📊 Dashboard
- Real-time statistics (Total Employees, Present Today, Absent Today, Attendance Rate)
- Today's attendance summary with present/absent employee lists
- Visual cards with color-coded metrics

### 👥 Employee Management
- View all employees in a searchable table
- Create new employees with name, email, department, and role
- Edit existing employee information
- Delete employees (with confirmation)
- Filter by name, email, or department
- Role-based badges (HR/Employee)

### 📅 Attendance Management
- **Quick Mark Mode**: Mark attendance for all employees for today
- **History Mode**: View individual employee attendance records
- Visual indicators (green for present, red for absent)
- Attendance statistics (total days, present count, absent count)
- Date-wise attendance history sorted by recent first

### 👨‍💼 HR Management
- Create new HR users with administrative privileges
- Secure password setup
- Role assignment (HR with admin access)
- HR privileges overview

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- HRMS Backend running on `http://localhost:8080`

## 🔧 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
hrms-frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard with statistics
│   │   ├── EmployeeList.jsx       # Employee CRUD operations
│   │   ├── AttendanceManager.jsx  # Attendance tracking
│   │   └── HRManager.jsx          # HR user management
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── postcss.config.js              # PostCSS configuration
```

## 🔗 API Integration

The frontend connects to the following backend endpoints:

### Employee Endpoints
- `GET /api/employees` - Get all employees
- `POST /api/employees?requesterRole=HR` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/admin/employees/{id}?requesterRole=HR` - Delete employee

### Attendance Endpoints
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/summary` - Get overall attendance summary
- `GET /api/attendance/summary/{employeeId}` - Get employee attendance history

### HR Management Endpoints
- `POST /api/admin/create-hr?username={username}` - Create HR user

## 🎨 Features Breakdown

### Dashboard Component
- Fetches real-time employee and attendance data
- Displays 4 key metrics in colored cards
- Shows present/absent employee lists for today
- Auto-calculates attendance rate percentage

### Employee List Component
- Full CRUD operations for employee management
- Search functionality across name, email, and department
- Modal-based forms for create/edit operations
- Responsive table layout
- Role-based visual badges

### Attendance Manager Component
- Two modes: Quick Mark and History View
- Quick Mark: Mark all employees' attendance for today at once
- History View: View detailed attendance records for individual employees
- Visual status indicators (checkmarks, crosses)
- Attendance statistics summary
- Sorted by most recent dates

### HR Manager Component
- Simple form for creating HR users
- Password field with security suggestions
- Success/error message handling
- HR privileges documentation
- Clean, professional UI

## 🎯 Usage Guide

### Managing Employees
1. Click "Employees" in the sidebar
2. Use the search bar to find specific employees
3. Click "+ Add Employee" to create new employees
4. Click the edit icon to modify employee details
5. Click the delete icon to remove employees

### Tracking Attendance
1. Click "Attendance" in the sidebar
2. **Quick Mark Mode:**
   - See all employees listed for today
   - Click "Present" or "Absent" for each employee
   - Status updates immediately
3. **History Mode:**
   - Select an employee from the dropdown
   - View their complete attendance history
   - See statistics (total days, present, absent)

### Creating HR Users
1. Click "HR Management" in the sidebar
2. Enter username and password
3. Click "Create HR User"
4. User is created with HR privileges

## 🎨 Color Scheme

- Primary Blue: `#2563EB` (buttons, active states)
- Success Green: `#16A34A` (present status)
- Error Red: `#DC2626` (absent status)
- Purple: `#9333EA` (HR badges)
- Gray Scale: `#F3F4F6` to `#111827` (backgrounds, text)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Security Considerations

- All API calls should be authenticated in production
- Add JWT token handling for secure endpoints
- Implement role-based access control
- Use HTTPS in production
- Validate user inputs on both client and server

## 🚀 Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Customization

### Changing API URL
Edit the `API_BASE_URL` in `App.jsx`:
```javascript
const API_BASE_URL = 'http://your-backend-url:port/api';
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Edit component-specific styles in respective `.jsx` files
- Global styles in `src/index.css`

## 📝 Future Enhancements

- User authentication and login system
- Advanced reporting and analytics
- Export attendance reports to PDF/Excel
- Email notifications for absent employees
- Leave management system
- Payroll integration
- Department-wise filtering
- Calendar view for attendance
- Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

- Keep your backend server running while using the frontend
- Use Chrome DevTools to debug API calls
- Check console for error messages
- Ensure CORS is configured on the backend
- Test on different screen sizes for responsiveness

---

Built with ❤️ using React, Vite, and Tailwind CSS
# hrmsFrontend
