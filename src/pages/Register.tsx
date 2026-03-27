import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, Link as LinkIcon, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || '';
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(refCode);
  const [showPassword, setShowPassword] = useState(false);
  
  // Multi-step State
  const [step, setStep] = useState(1);

  // const { register } = useAuth(); // Assuming Context
  const navigate = useNavigate();

  // Core Brand Colors
  const colors = {
    primary: '#0F2942', // Deep Navy Background
    accent: '#FF7A00',  // Orange
    cardBg: '#FFFFFF',
  };

  const handleNext = () => {
    // Basic validation before moving next
    if (step === 1 && (!name || !email)) return;
    if (step === 2 && (!phone || !password)) return;
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== 3) return;
    
    // await register(name, email, phone, password, referralCode || undefined);
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
          Join 10,000+ Nigerians earning daily
        </p>
      </div>

      {/* Main Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-2xl sm:rounded-3xl sm:px-10">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {step === 1 ? "Personal Details" : step === 2 ? "Account Security" : "Final Step"}
              </h2>
              <span className="text-xs font-bold text-gray-400">Step {step} of 3</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${(step / 3) * 100}%`, 
                  backgroundColor: colors.accent 
                }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ── STEP 1: Basic Info ── */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors sm:text-sm font-medium"
                      style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

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
              </div>
            )}

            {/* ── STEP 2: Security ── */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors sm:text-sm font-medium"
                      style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                      placeholder="0801 234 5678"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
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
                      placeholder="Create a strong password"
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
              </div>
            )}

            {/* ── STEP 3: Referral & Finish ── */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">
                    Referral Code <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LinkIcon size={18} className={referralCode ? "text-[#1CB957]" : "text-gray-400"} />
                    </div>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="block w-full pl-11 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors sm:text-sm font-medium uppercase"
                      style={{ '--tw-ring-color': colors.accent } as React.CSSProperties}
                      placeholder="Enter code if you have one"
                    />
                  </div>
                  {referralCode && (
                    <p className="mt-2 text-xs font-bold flex items-center gap-1.5 text-[#1CB957]">
                      <CheckCircle2 size={14} /> Referral code applied
                    </p>
                  )}
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-4">
                  <p className="text-xs text-orange-800 leading-relaxed font-medium">
                    By creating an account, you will start your <strong className="font-bold">7-Day Free Trial</strong>. You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="pt-4 flex gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center justify-center py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: colors.accent }}
                >
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: colors.accent }}
                >
                  Create Free Account
                </button>
              )}
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="font-bold hover:underline transition-all" style={{ color: colors.primary }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}