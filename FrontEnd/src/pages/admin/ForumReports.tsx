import { useState } from 'react';
import { Search, Trash2, Eye, Flag, AlertCircle } from 'lucide-react';

interface Report {
  id: number;
  user: string;
  date: string;
  status: 'Active' | 'Suspended' | 'Pending';
  reportCount: number;
  violationDetail?: string;
}

export default function ForumReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [reports, setReports] = useState<Report[]>([
    { id: 1, user: 'Sara Ginto', date: '02/10/2024', status: 'Active', reportCount: 0, violationDetail: 'Saying bad words.' },
    { id: 2, user: 'Sara Ginto', date: '02/10/2024', status: 'Active', reportCount: 0, violationDetail: 'Spamming the discussion board.' },
    { id: 3, user: 'Sara Ginto', date: '02/10/2024', status: 'Active', reportCount: 0 },
    { id: 4, user: 'Mark Ethan', date: '02/10/2024', status: 'Active', reportCount: 0 },
    { id: 5, user: 'Sara Ginto', date: '02/10/2024', status: 'Active', reportCount: 0 },
    { id: 6, user: 'Ethan Park', date: '02/10/2024', status: 'Pending', reportCount: 0 },
    { id: 7, user: 'Sara Ginto', date: '02/10/2024', status: 'Pending', reportCount: 0 },
    { id: 8, user: 'Sara Ginto', date: '02/10/2024', status: 'Suspended', reportCount: 0 },
  ]);

  const filteredReports = reports.filter(r => 
    r.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#f8f9fa] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 text-slate-800">
          <Flag size={28} className="fill-current" />
          <h1 className="text-2xl font-bold text-[#2d3748]">Flag Content</h1>
          
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Review User Report</h2>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="py-4 px-8 text-left text-xs font-black uppercase">User</th>
              <th className="py-4 px-8 text-left text-xs font-black uppercase">Date</th>
              <th className="py-4 px-8 text-left text-xs font-black uppercase">Status</th>
              <th className="py-4 px-8 text-left text-xs font-black uppercase">Report</th>
              <th className="py-4 px-8 text-left text-xs font-black uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-700">{report.user}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{report.date}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${
                    report.status === 'Active' ? 'bg-green-100 text-green-600 border-green-200' :
                    report.status === 'Pending' ? 'bg-green-100 text-green-600 border-green-200' : // Matches Figma Green for Pending
                    'bg-orange-100 text-orange-600 border-orange-200'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 text-sm">{report.reportCount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => { setSelectedReport(report); setShowDeleteModal(true); }}
                      className="p-1.5 border border-red-200 rounded text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      onClick={() => { setSelectedReport(report); setShowViewModal(true); }}
                      className="p-1.5 border border-blue-200 rounded text-blue-500 hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL: VIOLATION DETAIL --- */}
      {showViewModal && selectedReport && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-black text-gray-800 mb-6">Violation Detail</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedReport.user}`} alt="avatar" />
              </div>
              <p className="font-black text-gray-800 text-lg">{selectedReport.user}</p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner min-h-[140px] relative overflow-hidden">
               <p className="text-[10px] font-black text-gray-800 mb-1">Date: {selectedReport.date}</p>
               <p className="text-[11px] text-gray-600 font-bold leading-relaxed italic">
                 "{selectedReport.violationDetail || 'No details provided.'}"
               </p>
               {/* Decorative curved line inside box to match Figma */}
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100"></div>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 py-2 bg-[#d64545] text-white rounded-lg font-black text-[10px] uppercase shadow-md hover:bg-[#b83838]">
                Suspend
              </button>
              <button 
                onClick={() => setShowViewModal(false)}
                className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg font-black text-[10px] uppercase shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: DELETE CONFIRMATION --- */}
      {showDeleteModal && selectedReport && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] p-10 w-full max-w-xs text-center shadow-2xl">
            <div className="flex justify-center items-center gap-2 mb-2 font-black text-gray-800 text-sm uppercase tracking-tighter">
               <AlertCircle size={16} /> Delete User
            </div>
            <p className="text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest">Are you sure you want to remove?</p>
            
            <div className="w-20 h-20 rounded-full border-4 border-gray-50 shadow-sm overflow-hidden mx-auto mb-3">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedReport.user}`} alt="user" />
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-1">{selectedReport.user}</h3>
            <p className="text-[10px] text-gray-400 font-bold mb-10">This action cannot be undone.</p>

            <div className="flex gap-3 px-2">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="flex-1 py-2 bg-gray-200 text-gray-600 rounded-lg font-black text-[10px] uppercase shadow-sm hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setReports(reports.filter(r => r.id !== selectedReport.id));
                  setShowDeleteModal(false);
                }} 
                className="flex-1 py-2 bg-[#d64545] text-white rounded-lg font-black text-[10px] uppercase shadow-md hover:bg-[#b83838]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}