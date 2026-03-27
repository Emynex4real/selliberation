import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, Link as LinkIcon, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || '';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(refCode);
  const [showPassword, setShowPassword] = useState(false);
  // const { register } = useAuth(); // Assuming Context
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
    // await register(name, email, phone, password, referralCode || undefined);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ backgroundColor: colors.bg }}>
      
      {/* Left Side - Value Proposition (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden" style={{ backgroundColor: colors.blue }}>
        {/* Decorative Background Elements mapped to new brand colors */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1CB957]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#FF7A00]/15 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/" className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="text-white">Sell</span><span style={{ color: colors.orange }}>iberation</span>
          </Link>
          
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border border-[#FF7A00]/30 bg-[#FF7A00]/10 text-[#FF7A00] font-bold text-sm tracking-wide">
              7-DAY FREE TRIAL
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Start learning. <br/>
              Start earning.
            </h1>
            <p className="text-lg text-blue-100/80 mb-8 max-w-md leading-relaxed">
              Join thousands of Nigerians mastering high-income digital skills and building a passive income network.
            </p>

            <ul className="space-y-5">
              {[
                "Access to Module 1 of all premium courses",
                "Instant access to your affiliate dashboard",
                "Basic WhatsApp monetization training",
                "No credit card required to start"
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} style={{ color: colors.green }} />
                  <span className="font-medium text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-12 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex -space-x-2">
               <img className="w-8 h-8 rounded-full border-2 border-[#0F2942]" src="https://i.pravatar.cc/100?img=12" alt="User" />
               <img className="w-8 h-8 rounded-full border-2 border-[#0F2942]" src="https://i.pravatar.cc/100?img=32" alt="User" />
               <div className="w-8 h-8 rounded-full border-2 border-[#0F2942] flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: colors.green }}>+10k</div>
            </div>
          </div>
          <p className="text-sm text-blue-100/70 font-medium leading-relaxed">Over 10,000 active members are already earning daily commissions.</p>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10">
        
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span style={{ color: colors.blue }}>Sell</span><span style={{ color: colors.orange }}>iberation</span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Create your account
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              It takes less than a minute to get started.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium"
                    placeholder="0801 234 5678"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium"
                  placeholder="Create a strong password"
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

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Icon turns green if a code is entered to validate action */}
                  <LinkIcon size={18} className={referralCode ? "text-[#1CB957]" : "text-gray-400"} />
                </div>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/20 focus:border-[#FF7A00] transition-colors sm:text-sm font-medium uppercase"
                  placeholder="Enter code if you have one"
                />
              </div>
              {referralCode && (
                 <p className="mt-1.5 text-xs font-medium flex items-center gap-1" style={{ color: colors.green }}>
                   <CheckCircle2 size={12} /> Referral code applied
                 </p>
              )}
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#FF7A00] hover:bg-[#CC6200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7A00] transition-all hover:-translate-y-0.5"
              >
                Create Account <ArrowRight size={16} />
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              By creating an account, you agree to our <a href="#" className="font-semibold hover:underline" style={{ color: colors.blue }}>Terms of Service</a> and <a href="#" className="font-semibold hover:underline" style={{ color: colors.blue }}>Privacy Policy</a>.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold hover:opacity-80 transition-opacity" style={{ color: colors.orange }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}