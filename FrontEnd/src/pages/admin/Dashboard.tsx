import { LayoutDashboard, Users, Calendar, Flag, ClipboardList } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', Normal: 1, Moderate: 1.5, HighPriority: 0.5 },
  { name: 'Tue', Normal: 1.5, Moderate: 2, HighPriority: 1 },
  { name: 'Wed', Normal: 1.2, Moderate: 1.8, HighPriority: 1.5 },
  { name: 'Thu', Normal: 1.8, Moderate: 2.5, HighPriority: 2.2 },
  { name: 'Fri', Normal: 2.2, Moderate: 2.8, HighPriority: 2.8 },
  { name: 'Sat', Normal: 2.5, Moderate: 3.2, HighPriority: 3.5 },
  { name: 'Sun', Normal: 3, Moderate: 3.8, HighPriority: 4 },
];

export default function Dashboard() {
  const stats = [
    { label: 'Total Users:', value: '125', icon: Users },
    { label: 'Appointment:', value: '50', icon: Calendar },
    { label: 'Flag Contents:', value: '30', icon: Flag },
    { label: 'Counselor List:', value: '28', icon: ClipboardList },
  ];

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      {/* Header Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#2d3748] rounded-lg">
          <LayoutDashboard className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#2d3748]">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-[#2d3748]">{stat.value}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <stat.icon size={24} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts and Tables */}
        <div className="lg:col-span-2 space-y-8">
          {/* Emotional Trend Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-[#2d3748]">Emotional Trend</h2>
              <select className="text-[10px] font-bold bg-gray-50 border border-gray-100 rounded px-2 py-1 text-gray-500">
                <option>All Users</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Normal" stroke="#4ade80" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="Moderate" stroke="#facc15" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="HighPriority" stroke="#f87171" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Review Report */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#2d3748]">Review Report</h2>
              <button className="text-[#548d8d] text-xs font-bold">View All</button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase font-black text-gray-400 border-b border-gray-50">
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">Remarks</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="py-4 font-bold">Linda Walker</td>
                  <td className="py-4 text-gray-500">Inappropriate Content</td>
                  <td className="py-4 text-right">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-black text-[9px] uppercase">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Sidebars */}
        <div className="space-y-8">
          {/* High Priority List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-[#2d3748] mb-4">High-Priority List</h2>
            <div className="space-y-4">
              {[
                { name: 'Linda Walker', streak: '7 days', emoji: '😫' },
                { name: 'Linda Walker', streak: '14 days', emoji: '😩' },
                { name: 'Linda Walker', streak: '20 days', emoji: '😭' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100" />
                    <div>
                      <p className="text-xs font-bold">{item.name}</p>
                      <p className="text-[10px] text-gray-400">{item.streak}</p>
                    </div>
                  </div>
                  <span className="text-lg">{item.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Appointments */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-[#2d3748] mb-4">Scheduled Appointments</h2>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl flex items-center gap-4">
                <div className="bg-white px-2 py-1 rounded-lg text-center shadow-sm">
                  <p className="text-[8px] font-black text-gray-400 uppercase">Wed</p>
                  <p className="text-sm font-black text-[#2d3748]">20</p>
                </div>
                <div>
                  <p className="text-xs font-black">Jennie Kim</p>
                  <p className="text-[10px] text-gray-400">11:00PM - 12:00PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}