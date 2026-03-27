import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // const { login } = useAuth(); // Assuming this is your context
  const navigate = useNavigate();

  // Core Brand Colors
  const colors = {
    primary: '#0F2942', // Deep Navy Background
    accent: '#FF7A00',  // Orange
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans" style={{ backgroundColor: colors.primary }}>
      
      {/* Background Decor - Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20" style={{ backgroundColor: colors.accent }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] pointer-events-none opacity-10"></div>

      {/* Header Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mb-8">
        <Link to="/" className="text-3xl font-extrabold text-center block tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <span className="text-white">Sell</span><span style={{ color: colors.accent }}>iberation</span>
        </Link>
        <p className="text-center text-blue-100/60 mt-2 font-medium text-sm">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-10">
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sign in
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Enter your details to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors sm:text-sm font-medium"
                  style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold transition-colors hover:underline" style={{ color: colors.primary }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors sm:text-sm font-medium"
                  style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-xl shadow-md text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent }}
              >
                Sign In Securely <ArrowRight size={18} />
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              New to Selliberation?{' '}
              <Link to="/register" className="font-bold hover:underline transition-all" style={{ color: colors.primary }}>
                Create a free account
              </Link>
            </p>
          </div>
        </div>
        
        {/* Trust Indicator */}
        <div className="mt-8 text-center">
          <p className="text-xs text-blue-100/40 font-medium flex items-center justify-center gap-1.5">
            <Lock size={12} /> Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}