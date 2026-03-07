import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronDown } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (data.success) {
        // Store user session info
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        // Role-based routing
        if (data.user.role === 'Counselor') {
          navigate('/counselor/dashboard'); 
        } else if (data.user.role === 'Admin') {
          navigate('/admin/dashboard'); 
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-[45%] bg-[#64a1a1] items-center justify-center p-12">
        <h2 className="text-white text-4xl font-bold">MindEase</h2>
      </div>

      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">LOGIN</h1>
          <p className="text-[10px] font-medium text-gray-500 text-center mb-6">
            Please enter your registered credentials to access your account.
          </p>

          {error && <p className="text-red-500 text-xs mb-4 font-bold">{error}</p>}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#64a1a1]/20"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#64a1a1]/20"
              />
            </div>

            <div className="relative group">
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold text-gray-500 appearance-none outline-none"
              >
                <option value="" disabled>Select a Role</option>
                <option value="Admin">Admin</option>
                <option value="Counselor">Counselor</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            </div>

            <button
              type="submit"
              className="w-full bg-[#64a1a1] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#538a8a] transition-all"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}