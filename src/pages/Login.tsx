import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Mail, Lock, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState<'student' | 'admin'>('student');
  // const { login } = useAuth(); // Assuming this is your context
  const navigate = useNavigate();

  // Updated Logo Color system
  const colors = {
    blue: '#0F2942',
    green: '#1CB957',
    orange: '#FF7A00',
    bg: '#F9FAFB'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await login(email, password, loginAs);
    navigate(loginAs === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans" style={{ backgroundColor: colors.bg }}>
      
      {/* Background Decor mapped to new brand colors */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#0F2942]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link to="/" className="text-3xl font-extrabold text-center block mb-2 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span style={{ color: colors.blue }}>Sell</span><span style={{ color: colors.orange }}>iberation</span>
        </Link>
        <h2 className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">
          Secure Account Access
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          {/* Segmented Control for Role Selection */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setLoginAs('student')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                loginAs === 'student' 
                  ? 'bg-white text-[#FF7A00] shadow-sm ring-1 ring-gray-200/50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} /> Student
            </button>
            <button
              type="button"
              onClick={() => setLoginAs('admin')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                loginAs === 'admin' 
                  ? 'bg-white text-[#0F2942] shadow-sm ring-1 ring-gray-200/50' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={16} /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                {loginAs === 'student' && (
                  <Link to="/forgot-password" className="text-sm font-medium text-[#FF7A00] hover:text-[#CC6200] transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                  loginAs === 'admin' 
                    ? 'bg-[#0F2942] hover:opacity-90 focus:ring-[#0F2942]' 
                    : 'bg-[#FF7A00] hover:bg-[#CC6200] focus:ring-[#FF7A00]'
                }`}
              >
                <Lock size={16} />
                Sign in securely {loginAs === 'admin' && 'as Admin'}
              </button>
            </div>
          </form>

          {loginAs === 'student' && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600 font-medium">
                New to Selliberation?{' '}
                <Link to="/register" className="font-bold text-[#0F2942] hover:text-[#FF7A00] transition-colors">
                  Create a free account
                </Link>
              </p>
            </div>
          )}
        </div>
        
        {/* Footer info for trust */}
        <p className="text-center text-xs text-gray-400 mt-8 font-medium">
          Protected by industry-standard encryption.
        </p>
      </div>
    </div>
  );
}