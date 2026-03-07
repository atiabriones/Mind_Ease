import { useState } from 'react';
import { Search, Filter, Ban, Eye } from 'lucide-react';

interface ReportedUser {
  id: number;
  userName: string;
  email: string;
  reportCount: number;
  lastReportDate: string;
  status: 'Active' | 'Suspended' | 'Under Review';
  severity: 'Low' | 'Medium' | 'High';
}

export default function ReportedUsers() {
  const [searchQuery, setSearchQuery] = useState('');

  const reportedUsers: ReportedUser[] = [
    { id: 1, userName: 'UserABC', email: 'userabc@example.com', reportCount: 5, lastReportDate: '2024-03-01', status: 'Under Review', severity: 'High' },
    { id: 2, userName: 'UserXYZ', email: 'userxyz@example.com', reportCount: 2, lastReportDate: '2024-03-02', status: 'Active', severity: 'Low' },
    { id: 3, userName: 'UserDEF', email: 'userdef@example.com', reportCount: 8, lastReportDate: '2024-03-03', status: 'Suspended', severity: 'High' },
    { id: 4, userName: 'UserGHI', email: 'userghi@example.com', reportCount: 3, lastReportDate: '2024-03-04', status: 'Under Review', severity: 'Medium' },
    { id: 5, userName: 'UserJKL', email: 'userjkl@example.com', reportCount: 1, lastReportDate: '2024-03-05', status: 'Active', severity: 'Low' },
  ];

  const filteredUsers = reportedUsers.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
         <h1 className="text-2xl font-bold text-[#2d3748]">User Monitoring</h1>
        <p className="text-gray-600">Monitor and manage users with multiple reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reported users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                        {user.userName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{user.reportCount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(user.severity)}`}>
                      {user.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastReportDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      {user.status !== 'Suspended' && (
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Suspend User">
                          <Ban size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
