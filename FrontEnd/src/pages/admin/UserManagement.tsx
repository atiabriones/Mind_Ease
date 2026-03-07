import { useState } from 'react';
import { 
  Search, Trash2, Eye, UserPlus, Users, 
  AlertCircle, Ban 
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateCreated: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  reportCount: number;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for user list
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Sara Ginto', username: 'sarag', email: 'sara@school.edu', phone: '0912-345-6789', dateCreated: '02-03-2026', status: 'Active', reportCount: 0 },
    { id: 2, name: 'Hanna Gweneth', username: 'hgweneth', email: 'hgweneth@school.edu', phone: '0912-345-6789', dateCreated: '02-03-2026', status: 'Active', reportCount: 0 },
    { id: 3, name: 'Sara Ginto', username: 'sarag2', email: 'sara2@school.edu', phone: '0912-345-6789', dateCreated: '02-03-2026', status: 'Suspended', reportCount: 0 },
    { id: 4, name: 'Sara Ginto', username: 'sarag3', email: 'sara3@school.edu', phone: '0912-345-6789', dateCreated: '02-03-2026', status: 'Active', reportCount: 0 },
    { id: 5, name: 'Sara Ginto', username: 'sarag4', email: 'sara4@school.edu', phone: '0912-345-6789', dateCreated: '02-03-2026', status: 'Inactive', reportCount: 0 },
  ]);

  // Modal States
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="flex-1 p-8 bg-[#f8f9fa] min-h-screen">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#2d3748] p-2 rounded-lg text-white">
            <Users size={24} />
          </div>
          
           <h1 className="text-2xl font-bold text-[#2d3748]">User Management</h1>
        </div>
        
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Users:" value="125" icon={<Users size={22}/>} />
        <StatCard label="Needs Review:" value="3" icon={<AlertCircle size={22}/>} />
        <StatCard label="Suspended:" value="3" icon={<Ban size={22}/>} />
        <StatCard label="Created:" value="125" icon={<UserPlus size={22}/>} />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Date Created</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Report</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-700 font-semibold">{user.name}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{user.dateCreated}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${
                    user.status === 'Active' ? 'bg-green-100 text-green-600 border-green-200' :
                    user.status === 'Suspended' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                    'bg-red-100 text-red-600 border-red-200'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 text-sm">{user.reportCount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                      className="p-1 border border-red-200 rounded text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      onClick={() => { setSelectedUser(user); setShowViewModal(true); }}
                      className="p-1 border border-blue-200 rounded text-blue-500 hover:bg-blue-50 transition-colors"
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

      {/* INFORMATION MODAL */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#e2e2e2] rounded-[32px] p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                <div className="bg-gray-800 text-white rounded-full p-0.5"><AlertCircle size={12}/></div>
                Information
              </div>
              <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">Active</span>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`} alt="avatar" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-800 leading-tight">{selectedUser.name}</h3>
                <p className="text-gray-500 text-xs font-bold">@{selectedUser.username}</p>
              </div>
            </div>

            <div className="bg-white/50 p-5 rounded-2xl border border-white/60 space-y-3 shadow-inner">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-300 pb-1 mb-2">Personal Information</h4>
              <InfoRow label="Full Name" value={selectedUser.name} />
              <InfoRow label="Username" value={selectedUser.username} />
              <InfoRow label="Email" value={selectedUser.email} />
              <InfoRow label="Phone Number" value={selectedUser.phone} />
            </div>

            <button 
              onClick={() => setShowViewModal(false)}
              className="w-full mt-8 bg-[#cc7a5c] text-white py-3 rounded-2xl font-black shadow-lg hover:brightness-105 transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#e2e2e2] rounded-[32px] p-10 w-full max-w-xs text-center shadow-2xl border border-white/20">
            <div className="flex justify-center items-center gap-2 mb-2 font-black text-gray-700 uppercase text-xs tracking-widest">
              <AlertCircle size={16} /> Delete User
            </div>
            <p className="text-xs font-bold text-gray-500 mb-8">Are you sure you want to remove?</p>
            
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto mb-3">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`} alt="user" />
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-1">{selectedUser.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold mb-10 px-4">This action cannot be undone.</p>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="flex-1 py-3 bg-gray-400 text-white rounded-2xl font-black hover:bg-gray-500 shadow-md transition-all active:scale-95 text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="flex-1 py-3 bg-[#d64545] text-white rounded-2xl font-black hover:bg-[#b83838] shadow-md transition-all active:scale-95 text-xs"
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

// Internal Helper Components
function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-2xl text-slate-300 border border-gray-100 group-hover:text-slate-500 transition-colors">
        {icon}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px] font-bold">
      <span className="text-gray-400">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}