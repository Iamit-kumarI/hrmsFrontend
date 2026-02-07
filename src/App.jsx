import React, { useState } from 'react';
import { Users, Calendar, UserCheck, LayoutDashboard, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import AttendanceManager from './components/AttendanceManager';
import HRManager from './components/HRManager';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'hr', label: 'HR Management', icon: UserCheck },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard apiUrl={API_BASE_URL} />;
      case 'employees':
        return <EmployeeList apiUrl={API_BASE_URL} />;
      case 'attendance':
        return <AttendanceManager apiUrl={API_BASE_URL} />;
      case 'hr':
        return <HRManager apiUrl={API_BASE_URL} />;
      default:
        return <Dashboard apiUrl={API_BASE_URL} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-blue-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-2xl font-bold">HRMS</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-800 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 p-3 mb-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-800'
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
