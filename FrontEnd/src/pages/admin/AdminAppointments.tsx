  import { useState } from 'react';
  import { Search, Calendar, X, Clock, User, ClipboardList } from 'lucide-react';

  interface Appointment {
    id: number;
    counselorName: string;
    issue: string;
    date: string;
    time: string;
    status: 'Today' | 'Upcoming' | 'Completed' | 'All';
  }

  export default function AdminAppointments() {
    const [activeTab, setActiveTab] = useState<'Today' | 'Upcoming' | 'Completed' | 'All'>('Today');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    const appointments: Appointment[] = [
      { id: 1, counselorName: 'Hanna Gweneth', issue: 'Having Existential Crisis', date: 'Feb 20, 2026', time: '10:00 AM - 11:00 AM', status: 'Today' },
      { id: 2, counselorName: 'Hanna Gweneth', issue: 'Career Stress', date: 'Feb 21, 2026', time: '01:00 PM - 02:00 PM', status: 'Upcoming' },
      { id: 3, counselorName: 'Hanna Gweneth', issue: 'Relationship Issues', date: 'Feb 18, 2026', time: '09:00 AM - 10:00 AM', status: 'Completed' },
      { id: 4, counselorName: 'Mark Ethan', issue: 'Academic Pressure', date: 'Feb 20, 2026', time: '03:00 PM - 04:00 PM', status: 'Today' },
    ];

    const stats = [
      { label: 'Today', count: 3 },
      { label: 'Upcoming', count: 5 },
      { label: 'Completed', count: 1 },
      { label: 'All Appointments', count: 10 },
    ];

    const filteredAppointments = appointments.filter(apt => 
      (activeTab === 'All' || apt.status === activeTab) &&
      apt.counselorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="p-8 bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Calendar size={32} className="text-[#2d3748]" />
           <h1 className="text-2xl font-bold text-[#2d3748]">Appointments</h1>
        </div>

        {/* Summary Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-5xl">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-[2rem] p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-[#2d3748]">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Navigation & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 max-w-5xl">
          <div className="flex gap-4">
            {['Today', 'Upcoming', 'Completed', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-[11px] font-black uppercase pb-1 border-b-2 transition-all ${
                  activeTab === tab ? 'border-[#2d3748] text-[#2d3748]' : 'border-transparent text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            <input
              type="text"
              placeholder="Search Appointments"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold outline-none border border-gray-100 focus:ring-2 ring-teal-500/10"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Appointment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-[2.5rem] p-8 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col items-center text-center group transition-transform hover:scale-[1.02]">
              <div className="w-16 h-16 rounded-full bg-gray-100 mb-4 overflow-hidden border-2 border-white shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=${apt.id}`} alt="counselor" />
              </div>
              <h3 className="text-lg font-black text-[#2d3748]">{apt.counselorName}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-6">{apt.issue}</p>
              
              <div className="w-full space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-500">
                  <Calendar size={14} />
                  <span className="text-[10px] font-bold">{apt.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold">{apt.time}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedAppointment(apt)}
                className="w-full py-2.5 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2d3748] hover:text-white transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>

        {/* Appointment Info Modal (Matching Figma) */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="p-6 flex items-center gap-3 border-b border-gray-50">
                <div className="p-1 bg-gray-100 rounded-full"><X size={12} className="text-gray-400" /></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Information</span>
              </div>

              <div className="p-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=hanna" alt="profile" />
                </div>
                <h2 className="text-2xl font-black text-[#2d3748] mb-8">{selectedAppointment.counselorName}</h2>

                <div className="flex w-full gap-4 mb-10">
                  <div className="flex-1 p-5 border-2 border-gray-100 rounded-[1.5rem]">
                    <p className="text-[10px] font-black text-gray-300 uppercase mb-2">Notes:</p>
                    <p className="text-[11px] font-bold text-gray-600 leading-relaxed italic">
                      {selectedAppointment.issue}
                    </p>
                  </div>
                  <div className="flex-1 p-5 bg-gray-50 rounded-[1.5rem] flex flex-col justify-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Scheduled:</p>
                    <p className="text-[10px] font-bold text-gray-600 mb-1">{selectedAppointment.date}</p>
                    <p className="text-[10px] font-bold text-gray-600">{selectedAppointment.time}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="px-8 py-2 bg-gray-300 text-white rounded-lg text-[10px] font-black uppercase tracking-widest"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }