import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronDown } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (data.success) {
        // Store user session info for the Header to use
        // data.user contains { email, role, name } from the backend
        localStorage.setItem('user', JSON.stringify(data.user));

        // Role-based routing
        if (data.user.role === 'Counselor') {
          navigate('/counselor/dashboard'); 
        } else if (data.user.role === 'Admin') {
          navigate('/admin/dashboard'); 
        }
      } else {
        // Show specific error from backend
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      // Handles cases where the Node.js server is not running
      setError('Connection refused. Is the backend running on port 5000?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Brand Section */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#64a1a1] items-center justify-center p-12">
        <h2 className="text-white text-4xl font-black tracking-tighter">MindEase</h2>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">LOGIN</h1>
          <p className="text-[10px] font-medium text-gray-500 text-center mb-6 uppercase tracking-widest">
            Enter your MindEase credentials
          </p>

          {/* Error Message Display */}
          {error && (
            <div className="w-full bg-red-50 border border-red-100 p-3 rounded-xl mb-4">
              <p className="text-red-500 text-[10px] font-black text-center uppercase">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#64a1a1]/20 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#64a1a1]/20 transition-all"
              />
            </div>

            {/* Role Selection */}
            <div className="relative group">
              <select
                required
                disabled={isLoading}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-4 bg-[#f8fafc] border border-gray-100 rounded-xl text-sm font-semibold text-gray-500 appearance-none outline-none focus:ring-2 focus:ring-[#64a1a1]/20 transition-all"
              >
                <option value="" disabled>Select your Portal</option>
                <option value="Admin">Admin Portal</option>
                <option value="Counselor">Counselor Portal</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={18} />
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#64a1a1] hover:bg-[#538a8a] text-white shadow-[#64a1a1]/20 active:scale-[0.98]'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}