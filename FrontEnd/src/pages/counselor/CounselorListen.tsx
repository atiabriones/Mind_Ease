import React from 'react';
import { Search, Filter, Headphones, MoreHorizontal } from 'lucide-react';

const CounselorListen: React.FC = () => {
  const messages = [
    { id: 1, name: 'Linda Walker', text: 'I feel overwhelmed with my deadlines...', time: '10mins' },
    { id: 2, name: 'Nancy Lewis', text: 'I feel overwhelmed with my deadlines...', time: '15mins' },
    { id: 3, name: 'Linda Walker', text: 'I feel overwhelmed with my deadlines...', time: '20mins' },
    { id: 4, name: 'Nancy Lewis', text: 'I feel overwhelmed with my deadlines...', time: '25mins' },
  ];

  const reactions = [
    { label: "We're here for you", icon: "❤️" },
    { label: "Proud of you", icon: "⭐" },
    { label: "You showed courage", icon: "💎" },
    { label: "You are heard", icon: "👂" },
    { label: "Take a break", icon: "☕" },
    { label: "Rest if you need to", icon: "🛌" },
    { label: "Your feelings matter", icon: "🌟" },
    { label: "It's okay to pause", icon: "🌙" },
    { label: "Healing takes time", icon: "🌱" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Page Header */}
      <div className="p-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-2xl">
            <Headphones className="text-[#334155]" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#334155]">Listen-only</h1>
            <p className="text-xs text-gray-400">Students who have sent you their thoughts anonymously. Provide emotional support through reactions only.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Message List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Listen-Only Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs focus:bg-white focus:border-gray-200 outline-none"
              />
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={16} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${m.name}&background=random`} alt="avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-gray-800">{m.name}</span>
                    <span className="text-[10px] text-gray-400">{m.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Chat Detail */}
        <div className="flex-1 bg-[#fcfcfc] flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Linda+Walker" alt="avatar" />
             </div>
             <span className="text-xs font-bold text-gray-800">Linda Walker</span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {/* Student Message Bubble */}
            <div className="max-w-md bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-600 leading-relaxed">I feel overwhelmed with my deadlines...</p>
              <span className="text-[9px] text-gray-400 mt-2 block">10:00 AM</span>
            </div>

            {/* Counselor Reaction Bubble */}
            <div className="flex justify-end">
              <div className="max-w-md bg-[#4dd0e1] p-3 rounded-2xl rounded-tr-none text-white shadow-sm">
                 <p className="text-[10px] font-medium flex items-center gap-2">
                   ❤️ We're here for you
                 </p>
                 <span className="text-[9px] text-white/80 mt-1 block text-right">10:02 AM</span>
              </div>
            </div>

            <div className="max-w-md bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-600 leading-relaxed">I think it's the fear that I won't meet expectations. My professors, my parents... even myself.</p>
              <span className="text-[9px] text-gray-400 mt-2 block">10:05 AM</span>
            </div>
          </div>

          {/* Reaction Selector Footer */}
          <div className="p-6 bg-white border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Send Reaction <span className="normal-case font-normal">(Select only 1 reaction)</span></p>
            <div className="grid grid-cols-3 gap-3">
              {reactions.map((r) => (
                <button 
                  key={r.label}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg hover:border-[#4dd0e1] hover:bg-cyan-50 transition-all text-left"
                >
                  <span className="text-xs">{r.icon}</span>
                  <span className="text-[10px] font-medium text-gray-600">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorListen;