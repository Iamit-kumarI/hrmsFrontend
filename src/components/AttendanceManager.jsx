import React, { useState, useEffect } from 'react';
import { Calendar, Check, X, Search, User } from 'lucide-react';

const AttendanceManager = ({ apiUrl }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quickMarkMode, setQuickMarkMode] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeAttendance(selectedEmployee);
    }
  }, [selectedEmployee]);

  const fetchEmployees = async () => {
    try {
      console.log('📥 Fetching employees from:', `${apiUrl}/employees`);
      
      const response = await fetch(`${apiUrl}/employees`);
      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Employees fetched:', data.length, 'employees');
      
      setEmployees(data);
    } catch (error) {
      console.error('❌ Error fetching employees:', error);
      alert(`Error fetching employees.\n\nError: ${error.message}\n\nMake sure backend is running.`);
    }
  };

  const fetchEmployeeAttendance = async (employeeId) => {
    try {
      setLoading(true);
      console.log('📥 Fetching attendance for employee:', employeeId);
      console.log('📍 URL:', `${apiUrl}/attendance/summary/${employeeId}`);
      
      const response = await fetch(`${apiUrl}/attendance/summary/${employeeId}`);
      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Attendance data:', data);
      console.log('📄 Records:', data.records);
      
      setAttendanceRecords(data.records || []);
    } catch (error) {
      console.error('❌ Error fetching attendance:', error);
      alert(`Error fetching attendance records.\n\nError: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (employeeId, date, present) => {
    try {
      console.log('📝 Marking attendance:', { employeeId, date, present });
      console.log('📍 URL:', `${apiUrl}/attendance`);
      
      const payload = { employeeId, date, present };
      console.log('📤 Payload:', payload);
      
      const response = await fetch(`${apiUrl}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      console.log('📊 Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Attendance marked:', result);
        alert(`Attendance marked as ${present ? 'Present' : 'Absent'}`);
        
        if (selectedEmployee === employeeId) {
          fetchEmployeeAttendance(employeeId);
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(errorText || 'Failed to mark attendance');
      }
    } catch (error) {
      console.error('❌ Error marking attendance:', error);
      alert(`Failed to mark attendance.\n\nError: ${error.message}`);
    }
  };

  const getTodayAttendanceStatus = (employeeId) => {
    const today = new Date().toISOString().split('T')[0];
    if (selectedEmployee !== employeeId) return null;
    
    const record = attendanceRecords.find(r => r.date === today);
    return record?.present;
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Attendance Management</h2>

      {/* Mode Selector */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setQuickMarkMode(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            quickMarkMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Quick Mark Today
        </button>
        <button
          onClick={() => setQuickMarkMode(false)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            !quickMarkMode
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          View History
        </button>
      </div>

      {quickMarkMode ? (
        /* Quick Mark Mode */
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar size={24} className="text-blue-600" />
            Mark Attendance for Today
          </h3>
          
          <div className="mb-4 text-gray-600">
            Date: <span className="font-semibold">{new Date().toLocaleDateString()}</span>
          </div>

          <div className="space-y-3">
            {employees.map((employee) => {
              const status = getTodayAttendanceStatus(employee.id);
              
              return (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee.id);
                        markAttendance(employee.id, new Date().toISOString().split('T')[0], true);
                      }}
                      disabled={status === true}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        status === true
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <Check size={18} />
                      Present
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee.id);
                        markAttendance(employee.id, new Date().toISOString().split('T')[0], false);
                      }}
                      disabled={status === false}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        status === false
                          ? 'bg-red-100 text-red-700 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <X size={18} />
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* History Mode */
        <div className="space-y-6">
          {/* Employee Selector */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-gray-700 mb-2 font-medium">Select Employee</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Select an employee --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.department})
                </option>
              ))}
            </select>
          </div>

          {/* Attendance Records */}
          {selectedEmployee && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Attendance History for {employees.find(e => e.id === selectedEmployee)?.name}
              </h3>
              
              {loading ? (
                <div className="text-center py-12 text-gray-600">Loading attendance records...</div>
              ) : attendanceRecords.length > 0 ? (
                <div className="space-y-2">
                  {attendanceRecords
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((record, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          record.present
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={20} className="text-gray-500" />
                          <span className="font-medium">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {record.present ? (
                            <>
                              <Check size={20} className="text-green-600" />
                              <span className="font-semibold text-green-700">Present</span>
                            </>
                          ) : (
                            <>
                              <X size={20} className="text-red-600" />
                              <span className="font-semibold text-red-700">Absent</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No attendance records found
                </div>
              )}

              {/* Summary Stats */}
              {attendanceRecords.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {attendanceRecords.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {attendanceRecords.filter(r => r.present).length}
                      </div>
                      <div className="text-sm text-gray-600">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {attendanceRecords.filter(r => !r.present).length}
                      </div>
                      <div className="text-sm text-gray-600">Absent</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceManager;
