import { useState } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function CounselorAppointments() {
  const stats = [
    { label: 'Appointments', count: 5, color: 'text-slate-600', icon: <Calendar size={18} />, bg: 'bg-slate-50' },
    { label: 'Pending', count: 5, color: 'text-orange-500', icon: <Clock size={18} />, bg: 'bg-orange-50' },
    { label: 'Confirmed', count: 5, color: 'text-blue-500', icon: <CheckCircle2 size={18} />, bg: 'bg-blue-50' },
    { label: 'Completed', count: 5, color: 'text-green-500', icon: <CheckCircle2 size={18} />, bg: 'bg-green-50' },
    { label: 'Cancelled', count: 5, color: 'text-red-500', icon: <XCircle size={18} />, bg: 'bg-red-50' },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <Calendar className="text-[#548d8d]" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-sm text-slate-500">Manage and track all student appointments.</p>
        </div>
      </div>

      {/* Side-by-Side Status Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-[#548d8d]/30 transition-all">
            {/* Icon Box */}
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} flex-shrink-0`}>
              {stat.icon}
            </div>
            {/* Text and Number Side-by-Side */}
            <div>
              <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stat.count}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">All Appointment</h2>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm w-64 outline-none" 
              />
            </div>
            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Concern</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-slate-50/30 transition-colors">
              <td className="px-6 py-4 text-slate-700 font-semibold">Nancy Lewis</td>
              <td className="px-6 py-4 text-slate-500">26-1111</td>
              <td className="px-6 py-4 text-slate-500">02-20-2024</td>
              <td className="px-6 py-4 text-slate-500">8:00 AM - 9:00 AM</td>
              <td className="px-6 py-4 text-slate-500">Anxiety</td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase bg-orange-50 text-orange-600 border border-orange-100">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="px-4 py-2 bg-[#00e676] text-white rounded-xl font-bold text-[10px]">Confirm</button>
                  <button className="px-4 py-2 bg-[#ff5252] text-white rounded-xl font-bold text-[10px]">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-5 border-t border-slate-50 flex justify-center items-center gap-4">
           <ChevronLeft size={20} className="text-slate-400 cursor-pointer" />
           <button className="w-8 h-8 flex items-center justify-center bg-[#548d8d] text-white rounded-lg text-xs font-bold">1</button>
           <ChevronRight size={20} className="text-slate-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}