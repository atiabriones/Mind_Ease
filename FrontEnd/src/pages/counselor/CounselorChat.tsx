import React from 'react';
import { Search, Filter, Mail, Send, MessageSquare} from 'lucide-react';

const CounselorChat: React.FC = () => {
  const students = [
    { id: 1, name: 'Linda Walker', message: 'I feel overwhelmed with my deadlines...', time: '10mins' },
    { id: 2, name: 'Nancy Lewis', message: 'I feel overwhelmed with my deadlines...', time: '15mins' },
    { id: 3, name: 'Linda Walker', message: 'I feel overwhelmed with my deadlines...', time: '20mins' },
    { id: 4, name: 'Nancy Lewis', message: 'I feel overwhelmed with my deadlines...', time: '25mins' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <MessageSquare className="text-[#548d8d]" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#334155]">Advice Chat & Guidance</h1>
            <p className="text-xs text-gray-400">Students requesting guidance and conversation support</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Chat List */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={18} className="text-gray-800" />
              <span className="font-bold text-gray-800">Chat</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none"
              />
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={14} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {students.map((student) => (
              <div key={student.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt={student.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold text-gray-800 truncate">{student.name}</h3>
                    <span className="text-[10px] text-gray-400">{student.time}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{student.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Empty State / Session Area */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <Mail size={32} className="text-gray-300" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Start Support Session</h2>
          <p className="text-xs text-gray-400 max-w-xs">
            Start a conversation to listen, understand, and provide guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CounselorChat;