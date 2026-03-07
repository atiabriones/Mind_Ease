import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Flag, BookOpen, Calendar, BarChart3, LogOut } from 'lucide-react';
import Header from './AdminHeader'; 

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/user-management', label: 'User Management', icon: Users },
    { path: '/admin/flag-content', label: 'Flag Content', icon: Flag },
    { path: '/admin/counselors-list', label: 'Counselors List', icon: BookOpen },
    { path: '/admin/appointment', label: 'Appointment', icon: Calendar },
    { path: '/admin/analysis-reports', label: 'Analysis Reports', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f9fa]">
      {/* HEADER IS NOW ON TOP OF EVERYTHING */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - Now starts below the header */}
        <aside className="w-64 bg-[#548d8d] text-white flex flex-col shrink-0 h-full">
          <nav className="flex-1 px-4 py-8 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              // Precise matching for active state
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold ${
                    isActive 
                      ? 'bg-white text-[#548d8d] shadow-lg scale-[1.02]' 
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout at bottom */}
          <button
            onClick={() => navigate('/admin/login')}
            className="flex items-center gap-3 px-8 py-8 text-white/90 hover:text-white hover:bg-white/5 transition-colors border-t border-white/10 mt-auto"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Log out</span>
          </button>
        </aside>

        {/* MAIN PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto relative p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}