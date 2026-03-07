import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageCircle, 
  Headphones, 
  Calendar, 
  User, 
  LogOut, 
  ChevronDown,
  ChevronUp 
} from 'lucide-react';
import Header from './AdminHeader'; // Ensure this matches your actual file structure

export default function CounselorLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State to manage Booking sub-menu toggle
  const [isBookingOpen, setIsBookingOpen] = useState(true);

  const menuItems = [
    { path: '/counselor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      label: 'Booking', 
      icon: Calendar, 
      isHeader: true,
      children: [
        { path: '/counselor/chat', label: 'Chat', icon: MessageCircle },
        { path: '/counselor/listen-only', label: 'Listen-only', icon: Headphones },
      ]
    },
    { path: '/counselor/appointments', label: 'Appointment', icon: User },
    { path: '/counselor/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      {/* Top Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Container [#548d8d] */}
        <aside className="w-64 bg-[#548d8d] text-white flex flex-col shrink-0">
          <nav className="flex-1 px-4 py-8 space-y-2">
            {menuItems.map((item) => {
              // Handle Collapsible Booking Section
              if (item.isHeader) {
                return (
                  <div key={item.label} className="space-y-1">
                    <button 
                      onClick={() => setIsBookingOpen(!isBookingOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:bg-white/10 rounded-xl transition-all font-bold"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {isBookingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {/* Collapsible Children */}
                    {isBookingOpen && (
                      <div className="pl-4 space-y-1">
                        {item.children?.map((child) => {
                          const isChildActive = location.pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold ${
                                isChildActive 
                                  ? 'bg-white text-[#548d8d] shadow-lg' 
                                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <child.icon size={18} />
                              <span className="text-sm">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Menu Items (Dashboard, Profile)
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold ${
                    isActive 
                      ? 'bg-white text-[#548d8d] shadow-lg' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-3 px-8 py-8 text-white/90 hover:text-white hover:bg-white/5 transition-colors border-t border-white/10 mt-auto"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Log out</span>
          </button>
        </aside>

        {/* Dynamic content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}