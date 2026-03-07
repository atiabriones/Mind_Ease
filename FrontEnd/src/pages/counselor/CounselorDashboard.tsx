import { Calendar as CalendarIcon, Clock, MessageSquare, Headset, ChevronRight } from 'lucide-react';

export default function CounselorDashboard() {
  // Brand color for MindEase
  const brandTeal = "#548d8d";

  const stats = [
    { label: 'Appointments', count: 5, icon: <CalendarIcon size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Advice Chat', count: 5, icon: <MessageSquare size={20} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Listen-Only', count: 5, icon: <Headset size={20} />, color: 'text-pink-500', bg: 'bg-pink-50' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="p-2 bg-white rounded-lg shadow-sm">📊</span>
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 ml-12">Manage today's appointments and activity</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tables */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Advice Chat Table */}
          <DashboardTable 
            title="Active Advice Chat" 
            subtitle="Students currently seeking guidance"
          />

          {/* Listener Only Table */}
          <DashboardTable 
            title="Listener Only" 
            subtitle="Recent student-shared venting chats"
          />
        </div>

        {/* Right Column: Calendar & Sessions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Calendar</h3>
              <span className="text-xs text-gray-400 font-medium">February 20, 2024</span>
            </div>
            {/* Minimalist Calendar Placeholder */}
            <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 border border-dashed border-gray-200">
              Interactive Calendar Component
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Upcoming Sessions</h3>
              <button className="text-xs text-teal-600 font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-gray-800">Linda Walker</p>
                    <p className="text-[10px] text-gray-500">9:00 AM - 10:00 AM</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardTable({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-[10px] text-gray-400">{subtitle}</p>
        </div>
        <button className="text-[10px] font-bold text-blue-500 hover:underline">View All</button>
      </div>
      <table className="w-full text-left text-[11px]">
        <thead className="bg-gray-50 text-gray-400 font-bold uppercase">
          <tr>
            <th className="px-5 py-3">Student Name</th>
            <th className="px-5 py-3">Concern</th>
            <th className="px-5 py-3 text-center">Status</th>
            <th className="px-5 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {[1, 2].map((row) => (
            <tr key={row} className="hover:bg-gray-50/50">
              <td className="px-5 py-3 font-medium text-gray-700">Linda Walker</td>
              <td className="px-5 py-3 text-gray-500">Anxiety</td>
              <td className="px-5 py-3 text-center">
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-bold text-[9px]">ACTIVE</span>
              </td>
              <td className="px-5 py-3 text-center">
                <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-[9px] font-bold hover:bg-teal-600 transition-colors">Open Chat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}