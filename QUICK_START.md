# HRMS Frontend - Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd hrms-frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

---

## ✅ What You Get

### 📊 Complete HRMS System with:

1. **Dashboard** - Real-time statistics and attendance overview
2. **Employee Management** - Full CRUD operations
3. **Attendance Tracking** - Mark and view attendance records
4. **HR User Management** - Create administrative users

---

## 🎯 Key Features

### Dashboard
- Total employees count
- Today's present/absent count
- Attendance rate percentage
- Live attendance summary

### Employee Management
- ✅ Create new employees
- ✅ Edit employee details
- ✅ Delete employees
- ✅ Search employees
- ✅ View department and role

### Attendance
- ✅ Quick mark for today (all employees at once)
- ✅ View individual attendance history
- ✅ Visual status indicators
- ✅ Attendance statistics

### HR Management
- ✅ Create HR users with admin privileges
- ✅ Secure password setup
- ✅ Role assignment

---

## 🔧 Configuration

**Backend URL:** The app expects your backend at `http://localhost:8080/api`

To change this, edit `src/App.jsx`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 📱 Modern UI/UX

- **Responsive Design** - Works on all devices
- **Tailwind CSS** - Modern, clean styling
- **Lucide Icons** - Beautiful, consistent icons
- **Color-coded Status** - Green (present), Red (absent)
- **Sidebar Navigation** - Easy switching between modules

---

## 🛠️ Tech Stack

- React 18
- Vite (super fast dev server)
- Tailwind CSS
- Lucide React Icons

---

## 📋 API Endpoints Used

```
GET    /api/employees
POST   /api/employees?requesterRole=HR
PUT    /api/employees/{id}
DELETE /api/admin/employees/{id}?requesterRole=HR

GET    /api/attendance/summary
GET    /api/attendance/summary/{employeeId}
POST   /api/attendance

POST   /api/admin/create-hr?username={username}
```

---

## 🎨 Screenshots Features

✨ **Dashboard**: Real-time stats with colored cards
✨ **Employee List**: Searchable table with edit/delete actions
✨ **Attendance**: Two modes - Quick Mark & History View
✨ **HR Manager**: Clean form with privilege overview

---

## 💡 Pro Tips

1. **Keep backend running** - The frontend needs API connection
2. **Use Quick Mark** - For daily attendance marking
3. **Search is powerful** - Works on name, email, department
4. **Check console** - For debugging API issues
5. **Mobile friendly** - Test on different screen sizes

---

## 🚀 Production Build

```bash
npm run build
npm run preview
```

---

## 📞 Need Help?

Check the full README.md for detailed documentation!

---

**Ready to manage your workforce efficiently! 🎉**
