import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const Dashboard = ({ apiUrl }) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    absentToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [attendanceSummary, setAttendanceSummary] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching dashboard data...');
      console.log('📍 API URL:', apiUrl);
      
      // Fetch employees - GET http://localhost:8080/api/employees
      console.log('📥 Fetching employees from:', `${apiUrl}/employees`);
      const employeesRes = await fetch(`${apiUrl}/employees`);
      console.log('📊 Employees response status:', employeesRes.status);
      
      if (!employeesRes.ok) {
        throw new Error(`Failed to fetch employees: ${employeesRes.status} ${employeesRes.statusText}`);
      }
      
      const employees = await employeesRes.json();
      console.log('✅ Employees fetched:', employees.length, 'employees');
      console.log('📄 Employee data:', employees);
      
      // Fetch attendance summary - GET http://localhost:8080/api/attendance/summary
      console.log('📥 Fetching attendance from:', `${apiUrl}/attendance/summary`);
      const summaryRes = await fetch(`${apiUrl}/attendance/summary`);
      console.log('📊 Attendance response status:', summaryRes.status);
      
      if (!summaryRes.ok) {
        throw new Error(`Failed to fetch attendance: ${summaryRes.status} ${summaryRes.statusText}`);
      }
      
      const summary = await summaryRes.json();
      console.log('✅ Attendance summary fetched:', summary);
      
      setStats({
        totalEmployees: employees.length,
        presentToday: summary.present?.length || 0,
        absentToday: summary.absent?.length || 0,
      });
      
      setAttendanceSummary(summary);
      console.log('✅ Dashboard data loaded successfully!');
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      console.error('Full error details:', error.message);
      alert(`Error loading dashboard data:\n${error.message}\n\nMake sure:\n1. Backend is running on http://localhost:8080\n2. CORS is enabled on backend\n3. Check browser console for details`);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className={`${bgColor} rounded-lg p-6 shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
        </div>
        <div className={`${color} opacity-20`}>
          <Icon size={48} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const attendanceRate = stats.totalEmployees > 0 
    ? ((stats.presentToday / stats.totalEmployees) * 100).toFixed(1)
    : 0;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon={UserCheck}
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          icon={UserX}
          color="text-red-600"
          bgColor="bg-red-50"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={TrendingUp}
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Today's Attendance Summary */}
      {attendanceSummary && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Present Employees */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <UserCheck size={24} />
              Present Today ({stats.presentToday})
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {attendanceSummary.present?.map((empId) => (
                <div
                  key={empId}
                  className="p-3 mb-2 bg-green-50 rounded-lg border border-green-200"
                >
                  <p className="text-sm text-gray-700 font-medium">Employee ID: {empId}</p>
                </div>
              ))}
              {attendanceSummary.present?.length === 0 && (
                <p className="text-gray-500 text-center py-4">No employees marked present yet</p>
              )}
            </div>
          </div>

          {/* Absent Employees */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
              <UserX size={24} />
              Absent Today ({stats.absentToday})
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {attendanceSummary.absent?.map((empId) => (
                <div
                  key={empId}
                  className="p-3 mb-2 bg-red-50 rounded-lg border border-red-200"
                >
                  <p className="text-sm text-gray-700 font-medium">Employee ID: {empId}</p>
                </div>
              ))}
              {attendanceSummary.absent?.length === 0 && (
                <p className="text-gray-500 text-center py-4">All employees are present!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
