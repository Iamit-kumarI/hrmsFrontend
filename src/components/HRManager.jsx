import React, { useState } from 'react';
import { UserPlus, Shield, Lock, Mail } from 'lucide-react';

const HRManager = ({ apiUrl }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'HR'
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // POST http://localhost:8080/api/admin/create-hr?username=hr3
      // Body: { "id": "5", "username": "hr2", "password": "hr123", "role": "HR" }
      const response = await fetch(`${apiUrl}/admin/create-hr?username=${formData.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: 'HR'
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(`HR user created successfully! Username: ${result.username}, ID: ${result.id}`);
        setFormData({ username: '', password: '', role: 'HR' });
      } else {
        const error = await response.text();
        throw new Error(error || 'Failed to create HR user');
      }
    } catch (error) {
      console.error('Error creating HR:', error);
      setErrorMessage(error.message || 'Failed to create HR user. Make sure backend is running.');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">HR Management</h2>
        <p className="text-gray-600 mb-8">Create new HR users with administrative access</p>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={32} className="text-blue-600" />
            <h3 className="text-2xl font-semibold">Create HR User</h3>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> HR users have administrative privileges to manage employees,
              attendance records, and other HR-related tasks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  Username
                </div>
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter username (e.g., hr1, hr2)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be used for HR login credentials
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Lock size={18} />
                  Password
                </div>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter a secure password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use a strong password with at least 8 characters
              </p>
            </div>

            {/* Role Field (Fixed to HR) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Shield size={18} />
                  Role
                </div>
              </label>
              <input
                type="text"
                value="HR"
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-sm text-gray-500 mt-1">
                Role is automatically set to HR with administrative privileges
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 flex items-center gap-2">
                  <UserPlus size={18} />
                  {successMessage}
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              Create HR User
            </button>
          </form>
        </div>

        {/* HR Privileges Card */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">HR User Privileges</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="bg-purple-600 text-white rounded-full p-1 mt-0.5">
                <Shield size={12} />
              </div>
              <span className="text-gray-700">Create, update, and delete employee records</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-600 text-white rounded-full p-1 mt-0.5">
                <Shield size={12} />
              </div>
              <span className="text-gray-700">Mark and manage employee attendance</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-600 text-white rounded-full p-1 mt-0.5">
                <Shield size={12} />
              </div>
              <span className="text-gray-700">View attendance summaries and reports</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-600 text-white rounded-full p-1 mt-0.5">
                <Shield size={12} />
              </div>
              <span className="text-gray-700">Create additional HR users</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HRManager;
