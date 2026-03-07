import { useState } from 'react';
import { 
  BarChart3, Smile, Meh, Frown, 
  ChevronDown, AlertCircle, MessageSquare, Phone,
  Search, Send, Eye, X, Bell, ArrowLeft
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';

// Types for strict category management
type MoodCategory = 'Normal' | 'Moderate' | 'High Priority';
type ViewState = 'Dashboard' | 'List';

interface UserRecord {
  name: string;
  moodEmoji: string;
  streak: string;
  lastCheck: string;
  type: MoodCategory;
}

export default function AnalysisReports() {
  // --- States ---
  const [currentView, setCurrentView] = useState<ViewState>('Dashboard');
  const [activeCategory, setActiveCategory] = useState<MoodCategory>('High Priority');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);

  // --- Mock Data ---
  const trendData = [
    { day: 'Mon', score: 1 }, { day: 'Tue', score: 1.2 }, { day: 'Wed', score: 1.5 },
    { day: 'Thu', score: 2.2 }, { day: 'Fri', score: 2.5 }, { day: 'Sat', score: 3.2 }, { day: 'Sun', score: 3.5 },
  ];

  const users: UserRecord[] = [
    { name: 'Linda Walker', moodEmoji: '😫', streak: '5 Days', lastCheck: '12 - 25 - 25', type: 'High Priority' },
    { name: 'James Wilson', moodEmoji: '😫', streak: '7 Days', lastCheck: '12 - 25 - 25', type: 'High Priority' },
    { name: 'Sarah Ginto', moodEmoji: '😐', streak: '3 Days', lastCheck: '12 - 25 - 25', type: 'Moderate' },
    { name: 'Mark Ethan', moodEmoji: '😐', streak: '2 Days', lastCheck: '12 - 25 - 25', type: 'Moderate' },
    { name: 'Jennie Kim', moodEmoji: '😊', streak: '14 Days', lastCheck: '12 - 25 - 25', type: 'Normal' },
  ];

  const categories = [
    { label: 'Normal Users', key: 'Normal' as MoodCategory, count: 3, color: 'bg-[#bbf7d0]', textColor: 'text-[#166534]', emoji: <Smile size={32} /> },
    { label: 'Moderate Users', key: 'Moderate' as MoodCategory, count: 3, color: 'bg-[#fef08a]', textColor: 'text-[#854d0e]', emoji: <Meh size={32} /> },
    { label: 'High Priority Users', key: 'High Priority' as MoodCategory, count: 3, color: 'bg-[#fecaca]', textColor: 'text-[#991b1b]', emoji: <Frown size={32} /> },
  ];

  // --- Logic ---
  const handleViewList = (category: MoodCategory) => {
    setActiveCategory(category);
    setCurrentView('List');
  };

  const filteredUsers = users.filter(u => 
    u.type === activeCategory && 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 max-w-6xl">
        <div className="flex items-center gap-3">
          <BarChart3 size={32} className="text-[#2d3748]" />
          <div>
            <h1 className="text-3xl font-black text-[#2d3748] tracking-tight">
              User Monitoring <span className="text-xs font-bold text-gray-400 ml-2 uppercase">Analysis / Reports</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Track user mood trends based on their daily check-ins</p>
          </div>
        </div>
        {currentView === 'List' && (
          <button 
            onClick={() => setCurrentView('Dashboard')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
        )}
      </div>

      {/* 1. Summary Cards (Always visible) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl">
        {categories.map((cat) => (
          <div key={cat.key} className={`${cat.color} rounded-[2rem] p-6 shadow-sm flex flex-col items-center border-4 border-white transition-transform ${activeCategory === cat.key && currentView === 'List' ? 'scale-105 ring-4 ring-teal-500/10' : ''}`}>
            <div className="flex items-center gap-4 mb-4">
              <span className={cat.textColor}>{cat.emoji}</span>
              <div className="text-center">
                <p className={`text-4xl font-black ${cat.textColor}`}>{cat.count}</p>
                <p className={`text-[10px] font-black uppercase opacity-60 ${cat.textColor}`}>Users</p>
              </div>
            </div>
            <h3 className={`font-black text-sm uppercase mb-1 ${cat.textColor}`}>{cat.label}</h3>
            <p className="text-[9px] font-bold opacity-50 mb-4">Based on last 7 days trend</p>
            <button 
              onClick={() => handleViewList(cat.key)}
              className="px-6 py-1.5 bg-white/60 hover:bg-white text-[10px] font-black uppercase rounded-full transition-colors"
            >
              {activeCategory === cat.key && currentView === 'List' ? 'Viewing' : 'View list'}
            </button>
          </div>
        ))}
      </div>

      {/* 2. Conditional View Content */}
      {currentView === 'Dashboard' ? (
        /* DASHBOARD VIEW */
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
          <div className="flex-[2] bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative">
            <h2 className="text-lg font-black text-[#2d3748] mb-8">Emotional Trend</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="50%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#fca5a5" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#ccc'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#ccc'}} domain={[0, 4]} />
                  <Line type="monotone" dataKey="score" stroke="url(#lineGradient)" strokeWidth={4} dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#ccc' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-[320px] bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-8 flex flex-col items-center">
             <div className="bg-[#fff1f1] w-full py-2 flex items-center justify-center gap-2 rounded-t-2xl mb-6">
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">High Priority Alert</span>
             </div>
             <div className="w-20 h-20 rounded-full bg-gray-100 mb-4 overflow-hidden"><img src="https://i.pravatar.cc/150?u=angela" alt="" /></div>
             <h4 className="text-lg font-black text-[#2d3748] mb-4">Angela Dela Cruz</h4>
             <div className="bg-[#f7fee7] rounded-2xl p-4 w-full text-[10px] font-bold text-[#365314] mb-6">
                Reason: 14 days consecutive high-risk mood entries.
             </div>
             <button className="w-full py-3 bg-[#4ade80] text-white rounded-xl text-[10px] font-black uppercase mb-2">Contact</button>
             <button className="w-full py-3 bg-[#fca5a5] text-white rounded-xl text-[10px] font-black uppercase">Send Message</button>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-[#2d3748]">{activeCategory} Users</h2>
            <div className="relative w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input 
                type="text" 
                placeholder="Search Users" 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold outline-none border border-gray-100"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className={`${activeCategory === 'High Priority' ? 'bg-[#fca5a5]' : activeCategory === 'Moderate' ? 'bg-[#fde047]' : 'bg-[#4ade80]'} text-white`}>
                  <th className="py-4 px-8 text-left text-[10px] font-black uppercase">Name</th>
                  <th className="py-4 px-8 text-center text-[10px] font-black uppercase">Latest Mood</th>
                  <th className="py-4 px-8 text-center text-[10px] font-black uppercase">Streak</th>
                  <th className="py-4 px-8 text-center text-[10px] font-black uppercase">Last Check-in</th>
                  <th className="py-4 px-8 text-center text-[10px] font-black uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-4 px-8 text-sm font-bold text-gray-600">{user.name}</td>
                    <td className="py-4 px-8 text-center text-2xl">{user.moodEmoji}</td>
                    <td className="py-4 px-8 text-center text-xs font-bold text-gray-500">{user.streak}</td>
                    <td className="py-4 px-8 text-center text-xs font-bold text-gray-500">{user.lastCheck}</td>
                    <td className="py-4 px-8 text-center">
                      <button 
                        onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <Send size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Send Message Modal (Split Pane) */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl flex overflow-hidden h-[85vh]">
            {/* Form Side */}
            <div className="flex-1 p-12 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#548d8d]">Send Notification / Messages</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-3">Recipient</label>
                  <div className="p-4 border-2 border-[#548d8d] rounded-2xl bg-teal-50/30 flex items-center justify-between">
                    <span className="text-xs font-black">Individual User:</span>
                    <span className="bg-[#548d8d] text-white text-[10px] px-3 py-1 rounded-full uppercase">{selectedUser.name}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-[#2d3748] text-white rounded-2xl font-black text-xs uppercase tracking-widest">Send Now</button>
              </div>
            </div>
            {/* Preview Side */}
            <div className="w-[400px] bg-gray-50 p-12 border-l border-gray-100 flex flex-col items-center">
              <p className="text-[10px] font-black text-gray-300 uppercase mb-12 tracking-widest">Preview (User View)</p>
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 w-full border border-gray-50">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-4"><Bell className="text-[#548d8d]" /></div>
                <h4 className="text-lg font-black text-[#2d3748] mb-2">We Care About You</h4>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed mb-8">Taking care of your mental health is a sign of strength.</p>
                <button className="w-full py-3 bg-[#fca5a5] text-white rounded-xl text-[9px] font-black uppercase mb-2">Talk to a counselor</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}