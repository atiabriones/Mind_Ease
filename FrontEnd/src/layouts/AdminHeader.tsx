import { useState } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any auth cleanup logic here (e.g., localStorage.clear())
    navigate('/admin/login'); 
  };

  return (
    <>
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40 w-full shadow-sm">
        {/* Brand Title */}
        <div className="flex items-center">
          <h1 className="text-2xl font-black text-[#2d3748] tracking-tight">
            MindEase
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors group">
            <Bell size={20} className="text-gray-500 group-hover:text-gray-700" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
          
          {/* Profile - Click triggers modal */}
          <div 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 cursor-pointer group pl-4 border-l border-gray-100"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] leading-none mb-1">
                Welcome back, Admin.
              </p>
            </div>
            
            <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=b6e3f4" 
                alt="admin" 
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-y-0.5" />
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal (Matches image_eac61e.png) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl text-center border border-gray-50 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                <LogOut size={32} className="text-[#2d3748] translate-x-1" />
              </div>
            </div>
            
            <h2 className="text-xl font-black text-[#2d3748] mb-2">
              Are you sure you want to log out?
            </h2>
            <p className="text-xs font-bold text-gray-400 mb-10">
              You will need to log in again to access your dashboard.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 border-2 border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-3.5 bg-[#b91c1c] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}