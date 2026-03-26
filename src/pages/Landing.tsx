import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, TrendingUp, Check, Play, Award, DollarSign, 
  BookOpen, MessageCircle, Zap, Target, Globe, ChevronRight, 
  Menu, X, Star, ShieldCheck, Users, Smartphone, BarChart3
} from 'lucide-react';

export default function SelliberationLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom colors based on your system
  const colors = {
    primary: '#1E1B4B',
    accent: '#10B981',
    amber: '#F59E0B',
    bg: '#F9FAFB',
    text: '#111827'
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#10B981] selection:text-white" style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif" }}>
      
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span style={{ color: colors.primary }}>Sell</span><span style={{ color: colors.accent }}>iberation</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-[#10B981] transition-colors">How it Works</a>
            <a href="#courses" className="hover:text-[#10B981] transition-colors">Courses</a>
            <a href="#affiliate" className="hover:text-[#10B981] transition-colors">Earn</a>
            <a href="#pricing" className="hover:text-[#10B981] transition-colors">Pricing</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-5">
            <Link to="/login" className="font-semibold text-gray-600 hover:text-[#1E1B4B]">Log in</Link>
            <Link to="/register" className="text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5" style={{ backgroundColor: colors.accent }}>
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Soft Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-[#1E1B4B]/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border bg-emerald-50 border-emerald-200 text-emerald-700 font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Over 10,000+ Nigerians Earning Daily
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.primary }}>
              Learn to Earn Online <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669]">While You Learn.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Master high-income digital skills and build wealth instantly through our 6-level affiliate program. Designed specifically for the Nigerian market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/register" className="text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: colors.accent }}>
                Start 7-Day Free Trial <ArrowRight size={20} />
              </Link>
              <a href="#courses" className="bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-bold px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-all">
                <Play size={20} className="text-[#F59E0B]" /> Explore Courses
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1"><Check size={16} color={colors.accent} /> No credit card required</span>
              <span className="flex items-center gap-1"><Check size={16} color={colors.accent} /> Cancel anytime</span>
            </div>
          </div>

          {/* Hero UI Mockup */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none z-10 perspective-1000">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
                  <h3 className="text-3xl font-bold text-gray-900">₦145,250.00</h3>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <TrendingUp size={14} /> +32%
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Chuks D.", level: "Level 1", amount: "+₦3,250", time: "2 mins ago" },
                  { name: "Aisha M.", level: "Level 2", amount: "+₦750", time: "1 hour ago" },
                  { name: "Tobi O.", level: "Level 1", amount: "+₦3,250", time: "3 hours ago" }
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        {tx.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{tx.name}</p>
                        <p className="text-xs text-gray-500">Commission • {tx.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">{tx.amount}</p>
                      <p className="text-xs text-gray-400">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full bg-[#1E1B4B] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  Withdraw to Bank <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF */}
      <section className="border-y border-gray-200 bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-[#1E1B4B]">10,000+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Active Nigerians</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          <div>
            <div className="text-3xl font-extrabold text-[#10B981]">₦50M+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Commissions Paid</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="flex -space-x-3 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
              ))}
            </div>
            <div className="text-sm font-medium text-gray-500">Rated 4.9/5 by our members</div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-4 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.primary }}>
              Path to Financial Freedom
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We've simplified the process of learning digital skills and earning a stable income into three actionable steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-200 z-0"></div>

            {[
              { step: 1, title: "Sign Up Free", desc: "Create your account in 60 seconds. Get instant access to your dashboard and Module 1 of all courses for free.", icon: <Smartphone size={32} className="text-white" />, color: "bg-[#1E1B4B]" },
              { step: 2, title: "Learn High-Income Skills", desc: "Watch premium video courses on WhatsApp monetization, affiliate marketing, and digital reselling.", icon: <BookOpen size={32} className="text-white" />, color: "bg-[#F59E0B]" },
              { step: 3, title: "Earn 6-Level Commissions", desc: "Share your unique link. Earn massive commissions when your network upgrades, up to 6 generations deep.", icon: <DollarSign size={32} className="text-white" />, color: "bg-[#10B981]" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative z-10 hover:shadow-xl transition-shadow duration-300">
                <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -rotate-3`}>
                  {item.icon}
                </div>
                <div className="text-sm font-bold tracking-widest mb-2" style={{ color: colors.accent }}>STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COURSES SECTION */}
      <section id="courses" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.primary }}>
                High-Income Skills Library
              </h2>
              <p className="text-gray-600 text-lg">
                Practical, step-by-step video courses tailored for the Nigerian digital economy. 
              </p>
            </div>
            <Link to="/courses" className="text-[#10B981] font-bold flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
              View All Courses <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "First ₦50k Blueprint", desc: "The ultimate beginner's guide to earning money online in Nigeria without capital.", tag: "Beginner Friendly", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop" },
              { title: "WhatsApp Monetization", desc: "Turn your WhatsApp status and broadcast lists into a cash-printing machine.", tag: "Hot Skill", image: "https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop" },
              { title: "Affiliate Marketing Pro", desc: "Master the art of selling other people's products for massive commissions.", tag: "High Income", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
            ].map((course, i) => (
              <div key={i} className="bg-[#F9FAFB] rounded-2xl border border-gray-200 overflow-hidden hover:border-[#10B981] transition-all group flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {course.tag}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                    <span className="flex items-center gap-1"><BookOpen size={16} /> 6 Modules</span>
                    <span className="flex items-center gap-1"><Play size={16} /> 18 Lessons</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#1E1B4B]">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{course.desc}</p>
                  <button className="w-full bg-white border border-gray-300 text-gray-800 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                    Start Learning Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EARNING SYSTEM / CALCULATOR */}
      <section id="affiliate" className="py-24 px-4 bg-[#1E1B4B] text-white overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold text-sm tracking-wide">
              <Award size={16} /> THE SELLIBERATION ADVANTAGE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Our Unbeatable <span className="text-[#10B981]">6-Level</span> Affiliate Structure
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Why settle for one-time commissions? Build a network. When your referrals bring in users, you continue to earn passively down to the 6th generation.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-amber-400 font-bold text-sm uppercase">Level 1 (Direct)</div>
                  <div className="text-white text-sm">When you invite someone</div>
                </div>
                <div className="text-3xl font-bold text-[#10B981]">65%</div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { l: 'L2', p: '15%' }, { l: 'L3', p: '5%' }, { l: 'L4', p: '3%' }, { l: 'L5', p: '2%' }, { l: 'L6', p: '1%' }
                ].map((lvl, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                    <div className="text-gray-400 text-xs font-bold">{lvl.l}</div>
                    <div className="text-white font-semibold">{lvl.p}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Calculator Mockup */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900 relative">
            <div className="absolute -top-4 -right-4 bg-[#F59E0B] text-white font-bold px-4 py-2 rounded-lg shadow-lg rotate-3">
              Calculate Potential
            </div>
            <h3 className="text-2xl font-bold mb-6 text-[#1E1B4B]">Earnings Calculator</h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex justify-between text-sm font-semibold mb-2">
                  <span>Direct Referrals (Level 1)</span>
                  <span className="text-[#10B981]">10 Users</span>
                </label>
                <input type="range" className="w-full accent-[#10B981]" min="1" max="50" defaultValue="10" />
                <p className="text-xs text-gray-500 mt-1">They pay ₦5,000/mo. You earn ₦3,250 each.</p>
              </div>
              
              <div>
                <label className="flex justify-between text-sm font-semibold mb-2">
                  <span>If each of them invites...</span>
                  <span className="text-[#1E1B4B]">5 Users</span>
                </label>
                <input type="range" className="w-full accent-[#1E1B4B]" min="1" max="20" defaultValue="5" />
                <p className="text-xs text-gray-500 mt-1">This builds your Level 2 network (50 users).</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-gray-600 font-medium">Estimated Monthly Income</span>
                  <span className="text-4xl font-extrabold text-[#10B981]">₦70,000</span>
                </div>
                <p className="text-sm text-center bg-emerald-50 text-emerald-700 py-2 rounded-lg font-medium">
                  And this is just from Level 1 & 2!
                </p>
              </div>

              <button className="w-full bg-[#1E1B4B] hover:bg-indigo-900 text-white font-bold py-4 rounded-xl transition-colors">
                Start Building Wealth Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (WhatsApp Style) */}
      <section className="py-24 px-4 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.primary }}>
              Real Nigerians, Real Results
            </h2>
            <p className="text-gray-600 text-lg">Don't just take our word for it. See what our community is saying.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* WhatsApp Style Chat Bubbles */}
            {[
              { name: "Olamide B.", msg: "Omo, Selliberation is legit! Just withdrew my first ₦35k commission this morning. The WhatsApp class really opened my eyes. 🙏🏾", time: "10:42 AM" },
              { name: "Grace O.", msg: "The free modules alone are packed with value. I upgraded to premium 3 days ago and I've already gotten 2 referrals! 🚀💚", time: "2:15 PM" },
              { name: "Emanuel U.", msg: "Best 5k I've spent this year. The platform is so smooth and the 6-level earning is crazy. My Level 2 guys are working hard for me 😂", time: "Yesterday" }
            ].map((chat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1E1B4B] text-white rounded-full flex items-center justify-center font-bold">
                      {chat.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{chat.name}</p>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#DCF8C6]/40 p-4 rounded-2xl rounded-tl-none relative border border-[#DCF8C6]">
                    <p className="text-gray-800 text-sm leading-relaxed">{chat.msg}</p>
                    <div className="text-right text-[10px] text-gray-500 mt-2 flex justify-end items-center gap-1">
                      {chat.time} <Check size={12} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.primary }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Start risk-free. Upgrade when you are ready to unlock your full earning potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            {/* Free Plan */}
            <div className="bg-[#F9FAFB] rounded-3xl border border-gray-200 p-8 sm:p-10">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Basic Access</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">₦0</span>
                <span className="text-gray-500 font-medium">/ 7 days</span>
              </div>
              <p className="text-gray-600 mb-8 h-12">Perfect to test the waters and view course introductions.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span>Access Module 1 of all courses</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span>Dashboard access</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <X className="flex-shrink-0 mt-0.5" size={20} />
                  <span>No Affiliate Commissions</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full text-center border-2 border-[#1E1B4B] text-[#1E1B4B] hover:bg-gray-50 font-bold py-4 rounded-xl transition-colors">
                Start Free Trial
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#1E1B4B] rounded-3xl p-8 sm:p-10 shadow-2xl relative transform md:-translate-y-4 border border-indigo-900">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Premium Member</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-white">₦5,000</span>
                <span className="text-gray-400 font-medium">/ month</span>
              </div>
              <p className="text-gray-300 mb-8 h-12">Unlock everything. Learn, earn, and build a passive income network.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white">
                  <ShieldCheck className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span className="font-semibold">Unlimited Access to All Courses</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <BarChart3 className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span className="font-semibold">Unlock 6-Level Affiliate Program</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <DollarSign className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span>Earn up to 65% Direct Commission</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <Users className="text-[#10B981] flex-shrink-0 mt-0.5" size={20} />
                  <span>Premium Community Support</span>
                </li>
              </ul>
              <Link to="/register" className="block w-full text-center bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
                Upgrade & Start Earning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F59E0B]/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-amber-100">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1E1B4B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Your Smartphone is a <span className="text-[#F59E0B]">Wealth Asset.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Stop scrolling for free. Join Selliberation today, learn high-demand skills, and let your network pay you.
          </p>
          <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-[#1E1B4B] hover:bg-indigo-900 text-white font-bold px-10 py-5 rounded-xl text-lg shadow-2xl transition-all transform hover:-translate-y-1 w-full sm:w-auto">
            Create Your Free Account Now <ChevronRight size={24} />
          </Link>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center group">
        <MessageCircle size={28} />
        <span className="absolute right-16 bg-white text-gray-900 text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Support
        </span>
      </a>

      {/* FOOTER */}
      <footer className="bg-[#111827] pt-16 pb-8 px-4 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-extrabold tracking-tight mb-4 inline-block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-white">Sell</span><span style={{ color: colors.accent }}>iberation</span>
              </Link>
              <p className="text-gray-400 max-w-sm">
                Empowering Nigerians through premium digital education and a revolutionary wealth-sharing affiliate network.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="#affiliate" className="hover:text-white transition-colors">Affiliate Program</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} Selliberation. All rights reserved.</p>
            <p className="text-gray-500">Built for the Nigerian Creator Economy 🇳🇬</p>
          </div>
        </div>
      </footer>
    </div>
  );
}