import { useState } from 'react';
import { Search, Eye, Trash2, X, ClipboardList, User, SlidersHorizontal } from 'lucide-react';

interface Counselor {
  id: number;
  name: string;
  work: string;
  status: 'Active' | 'Deleted';
  remarks: number;
}

export default function CounselorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);

  const counselors: Counselor[] = [
    { id: 1, name: 'Sara Ginto', work: 'Vocational Counselor', status: 'Active', remarks: 0 },
    { id: 2, name: 'Sara Ginto', work: 'Psychologist', status: 'Active', remarks: 0 },
    { id: 3, name: 'Sara Ginto', work: 'School Counselor', status: 'Deleted', remarks: 0 },
    { id: 4, name: 'Mark Ethan', work: 'Psychologist', status: 'Active', remarks: 0 },
    { id: 5, name: 'Sara Ginto', work: 'Psychologist', status: 'Active', remarks: 0 },
    { id: 6, name: 'Talk Therapist', work: 'Vocational Counselor', status: 'Active', remarks: 0 },
    { id: 7, name: 'Sara Ginto', work: 'Psychologist', status: 'Active', remarks: 0 },
    { id: 8, name: 'Sara Ginto', work: 'Deleted', status: 'Deleted', remarks: 0 },
  ];

  const filteredCounselors = counselors.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.work.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header & Search Bar Section */}
      <div className="flex items-center justify-between mb-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <ClipboardList size={32} className="text-[#2d3748]" />
          <h1 className="text-2xl font-bold text-[#2d3748]">Counselor List</h1>
        </div>

        {/* Integrated Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-72 pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#548d8d]"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Total Therapists Card */}
        <div className="mb-8 w-44 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-2 bg-gray-50 rounded-xl">
            <User size={24} className="text-gray-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Total Therapist:</p>
            <p className="text-2xl font-black text-[#2d3748]">24</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                <th className="py-4 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider">Work</th>
                <th className="py-4 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Remarks</th>
                <th className="py-4 px-8 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCounselors.map((counselor) => (
                <tr key={counselor.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-8 text-sm font-medium text-gray-700">{counselor.name}</td>
                  <td className="py-4 px-8 text-sm text-gray-500">{counselor.work}</td>
                  <td className="py-4 px-8">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      counselor.status === 'Active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {counselor.status}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-center text-sm text-gray-600">{counselor.remarks}</td>
                  <td className="py-4 px-8">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => setSelectedCounselor(counselor)}
                        className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
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
      </div>

      {/* Information Modal */}
      {selectedCounselor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => setSelectedCounselor(null)}
                  className="p-1.5 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <X size={14} className="text-gray-500" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Information</span>
              </div>
            </div>

            <div className="p-10">
              {/* Profile Top */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-md">
                    <img src={`https://ui-avatars.com/api/?name=${selectedCounselor.name}&background=random`} alt="profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">{selectedCounselor.name}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{selectedCounselor.work}</p>
                  </div>
                </div>
                <span className="bg-green-500 text-white text-[10px] px-5 py-1.5 rounded-full font-black uppercase">Active</span>
              </div>

              {/* Information Grid */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase mb-4 border-b border-gray-50 pb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-y-3">
                    <p className="text-[11px] font-black text-gray-400">Email:</p>
                    <p className="text-[11px] font-bold text-gray-600">counselor@mindease.com</p>
                    <p className="text-[11px] font-black text-gray-400">Work Phone:</p>
                    <p className="text-[11px] font-bold text-gray-600">0912-345-6789</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase mb-4 border-b border-gray-50 pb-2">Professional Details</h4>
                  <div className="grid grid-cols-2 gap-y-3">
                    <p className="text-[11px] font-black text-gray-400">Employee ID:</p>
                    <p className="text-[11px] font-bold text-gray-600">ME-2024-{selectedCounselor.id}</p>
                    <p className="text-[11px] font-black text-gray-400">Specialization:</p>
                    <p className="text-[11px] font-bold text-gray-600">{selectedCounselor.work}</p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-12">
                <button 
                  onClick={() => setSelectedCounselor(null)}
                  className="w-full py-3.5 bg-red-400 hover:bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-red-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}