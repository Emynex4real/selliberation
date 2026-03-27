import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Award, DollarSign,
  BookOpen, Menu, X, UserPlus, Zap, Shield, TrendingUp,
  Users, Star, Wallet, Target,
  MessageCircle, Share2, Package, Smartphone
} from 'lucide-react';

const COMMISSION_LEVELS = [
  { level: 1, label: 'Direct Referral', rate: '65%', amount: 3250, barWidth: '100%', color: '#FF7A00' },
  { level: 2, label: 'Their Referral', rate: '15%', amount: 750, barWidth: '60%', color: '#E66E00' },
  { level: 3, label: '3rd Generation', rate: '5%', amount: 250, barWidth: '40%', color: '#CC6200' },
  { level: 4, label: '4th Generation', rate: '3%', amount: 150, barWidth: '28%', color: '#B35600' },
  { level: 5, label: '5th Generation', rate: '2%', amount: 100, barWidth: '18%', color: '#994A00' },
  { level: 6, label: '6th Generation', rate: '1%', amount: 50, barWidth: '10%', color: '#803D00' },
];

const FEATURES = [
  { 
    icon: Zap, 
    title: 'Lightning Fast', 
    desc: 'Instant payouts to your Nigerian bank account within 24 hours'
  },
  { 
    icon: Shield, 
    title: 'Bank-Grade Security', 
    desc: '256-bit encryption protecting your earnings and personal data'
  },
  { 
    icon: TrendingUp, 
    title: 'Real-Time Analytics', 
    desc: 'Live dashboard tracking every commission as it happens'
  },
  { 
    icon: Users, 
    title: 'Community Power', 
    desc: 'Join 10,000+ Nigerians already building wealth together'
  },
];

const COURSES = [
  {
    title: 'WhatsApp Monetization',
    students: '3,200+',
    rating: 4.9,
    icon: MessageCircle
  },
  {
    title: 'Affiliate Marketing Mastery',
    students: '2,800+',
    rating: 4.8,
    icon: Share2
  },
  {
    title: 'Digital Product Creation',
    students: '1,500+',
    rating: 4.9,
    icon: Package
  },
  {
    title: 'Social Media Growth',
    students: '4,100+',
    rating: 4.7,
    icon: Smartphone
  }
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(5);
  const [scrolled, setScrolled] = useState(false);

  const monthly = l1 * 3250 + l1 * l2 * 750;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F2942] text-white font-sans selection:bg-[#FF7A00] selection:text-white overflow-x-hidden">
      
      {/* Clean Background with strict Brand Glows (No grid lines) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FF7A00] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FF7A00] rounded-full blur-[150px] opacity-5" />
      </div>

      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F2942]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="text-white">Sell</span><span className="text-[#FF7A00]">iberation</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {['How It Works', 'Courses', 'Earnings', 'Success Stories'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/login" className="text-sm font-bold text-white/90 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-xl bg-[#FF7A00] text-sm font-bold text-white shadow-[0_4px_14px_rgba(255,122,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,122,0,0.6)] transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full inset-x-0 bg-[#0F2942]/95 backdrop-blur-xl border-b border-white/10 p-6 space-y-4">
            {['How It Works', 'Courses', 'Earnings', 'Success Stories'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-xl text-base font-bold text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link to="/login" className="block w-full py-3 text-center rounded-xl border border-white/20 text-white font-bold">
                Sign In
              </Link>
              <Link to="/register" className="block w-full py-3 text-center rounded-xl bg-[#FF7A00] text-white font-bold shadow-lg">
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#FF7A00]" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                  Over ₦50 Million Paid
                </span>
              </div>

              <h1 className="text-5xl lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Master Skills.<br />
                <span className="text-[#FF7A00]">Build Wealth.</span>
              </h1>

              <p className="text-lg text-white/70 max-w-lg leading-relaxed mb-10">
                Nigeria's premier platform combining world-class digital education with a revolutionary 6-level affiliate system. Turn your network into net worth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-xl bg-[#FF7A00] text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_25px_-5px_rgba(255,122,0,0.5)] transition-all hover:-translate-y-1"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                
                <button className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 fill-white" /> Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/60 font-medium">
                <div className="flex -space-x-3">
                  {['A', 'K', 'M', 'O'].map((initial, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F2942] bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
                      {initial}
                    </div>
                  ))}
                </div>
                <p>Trusted by <span className="text-white font-bold">10,000+</span> Nigerians</p>
              </div>
            </div>

            {/* Right Content - Clean Dashboard Mockup */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-white/5 bg-black/20">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>

                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-2">Total Earnings</p>
                      <p className="text-3xl font-extrabold text-white">₦145,250</p>
                      <div className="flex items-center gap-1 mt-2 text-xs font-bold text-[#FF7A00]">
                        <TrendingUp className="w-3 h-3" /> +32% this week
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-2">Network Size</p>
                      <p className="text-3xl font-extrabold text-white">1,247</p>
                      <div className="flex items-center gap-1 mt-2 text-xs font-bold text-white">
                        <Users className="w-3 h-3" /> 12 new today
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Recent Commissions</p>
                    {[
                      { name: 'Emeka O.', time: '2 min ago', amount: '+₦3,250', level: 'L1' },
                      { name: 'Fatimah A.', time: '15 min ago', amount: '+₦750', level: 'L2' },
                      { name: 'Bayo K.', time: '1 hr ago', amount: '+₦250', level: 'L3' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF7A00]/20 flex items-center justify-center text-sm font-bold text-[#FF7A00]">
                            {item.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{item.name}</p>
                            <p className="text-xs font-medium text-white/40">{item.time} • {item.level}</p>
                          </div>
                        </div>
                        <span className="text-sm font-extrabold text-white">{item.amount}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-4 rounded-xl bg-[#FF7A00] text-white font-bold shadow-[0_4px_14px_rgba(255,122,0,0.3)] transition-all">
                    Withdraw to Bank →
                  </button>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-[#0F2942] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Just Paid Out</p>
                    <p className="text-sm font-extrabold text-white">₦35,000 → GTBank</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '₦50M+', label: 'Paid Out', sub: 'To members' },
              { value: '10K+', label: 'Active Learners', sub: 'Nationwide' },
              { value: '65%', label: 'Commission', sub: 'Highest rate' },
              { value: '4.9/5', label: 'Rating', sub: 'From 2,000+ reviews' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
                <div className="text-sm font-bold text-[#FF7A00] uppercase tracking-wider">{stat.label}</div>
                <div className="text-xs font-medium text-white/40 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF7A00] border border-[#FF7A00]/30 px-4 py-2 rounded-full">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-6 mb-6 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              From Zero to <span className="text-[#FF7A00]">Earning</span>
            </h2>
            <p className="text-lg text-white/70">
              No technical skills required. Our proven system guides you from your first lesson to your first commission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: UserPlus, title: 'Create Account', desc: 'Sign up in 60 seconds. Get instant access to your dashboard and all course materials.' },
              { step: '02', icon: BookOpen, title: 'Learn & Apply', desc: 'Watch expert-led video lessons on WhatsApp monetization, affiliate marketing, and digital products.' },
              { step: '03', icon: DollarSign, title: 'Earn Commissions', desc: 'Share your unique link. Earn up to 65% on every referral, cascading 6 levels deep.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF7A00] flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-4xl font-extrabold text-white/10">{item.step}</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Everything you need to <span className="text-[#FF7A00]">succeed</span>
              </h2>
              <p className="text-lg text-white/70 mb-12">
                Built specifically for the Nigerian market, with local payment integrations, Naira payouts, and community support.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {FEATURES.map((feature, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[#FF7A00]" />
                    </div>
                    <h3 className="font-extrabold text-lg mb-2 text-white">{feature.title}</h3>
                    <p className="text-sm font-medium text-white/50">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Feature Visual */}
            <div className="relative w-full aspect-square rounded-[3rem] bg-white/5 border border-white/10 p-8 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[#FF7A00]/5" />
               <div className="relative w-48 h-48 rounded-full border border-[#FF7A00]/30 flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full border border-[#FF7A00]/50 flex items-center justify-center">
                   <div className="w-20 h-20 rounded-full bg-[#FF7A00] flex items-center justify-center shadow-[0_0_40px_rgba(255,122,0,0.4)]">
                     <Target className="w-10 h-10 text-white" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Bento Grid */}
      <section id="courses" className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Premium <span className="text-[#FF7A00]">Courses</span>
              </h2>
              <p className="text-lg text-white/70 max-w-xl">
                Industry-leading curriculum designed by experts who've generated millions in online revenue.
              </p>
            </div>
            <Link to="/register" className="flex items-center gap-2 text-[#FF7A00] font-bold hover:gap-3 transition-all">
              View all courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col">
                <div className="h-40 bg-white/5 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <course.icon className="w-16 h-16 text-[#FF7A00] opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" />
                    <span className="text-sm font-bold text-white">{course.rating}</span>
                    <span className="text-sm font-medium text-white/40">({course.students})</span>
                  </div>
                  <h3 className="font-extrabold text-lg mb-4 text-white flex-1">{course.title}</h3>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-bold text-white/40 uppercase">Included</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate System */}
      <section id="earnings" className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/20 mb-8">
                <Award className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF7A00]">6-Level Deep Network</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Earn Up to 65% <br />
                <span className="text-[#FF7A00]">Six Levels Deep</span>
              </h2>
              
              <p className="text-lg text-white/70 mb-10">
                Unlike typical affiliate programs, we reward you for building a network. When your referrals bring others, you continue earning.
              </p>

              <div className="space-y-4">
                {COMMISSION_LEVELS.map((lvl) => (
                  <div key={lvl.level} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                      L{lvl.level}
                    </div>
                    <div className="flex-1 h-12 bg-white/5 rounded-xl overflow-hidden relative">
                      <div 
                        className="h-full flex items-center px-4"
                        style={{ width: lvl.barWidth, backgroundColor: lvl.color }}
                      >
                        <span className="text-sm font-extrabold text-white">
                          {lvl.rate}
                        </span>
                      </div>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/40">
                        {lvl.label}
                      </span>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-sm font-extrabold text-white">₦{lvl.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Calculator Card */}
            <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-8 lg:p-12 shadow-2xl">
              <h3 className="text-2xl font-extrabold mb-8 flex items-center gap-3 text-white">
                <div className="w-12 h-12 rounded-xl bg-[#FF7A00]/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
                </div>
                Earnings Calculator
              </h3>

              <div className="space-y-8 mb-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold text-white">Direct Referrals (L1)</p>
                      <p className="text-sm font-medium text-white/40 mt-1">₦3,250 per referral</p>
                    </div>
                    <span className="text-3xl font-extrabold text-[#FF7A00]">{l1}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={l1} 
                    onChange={(e) => setL1(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF7A00]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold text-white">Each refers (L2)</p>
                      <p className="text-sm font-medium text-white/40 mt-1">₦750 per referral</p>
                    </div>
                    <span className="text-3xl font-extrabold text-[#FF7A00]">{l2}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={l2} 
                    onChange={(e) => setL2(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF7A00]"
                  />
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#0F2942] border border-white/5 text-center">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Estimated Monthly Income</p>
                <div className="text-5xl font-extrabold text-[#FF7A00] mb-6">
                  ₦{monthly.toLocaleString()}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-left">
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-white/40 font-bold mb-1">Level 1</p>
                    <p className="font-extrabold text-white text-lg">₦{(l1 * 3250).toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-white/40 font-bold mb-1">Level 2</p>
                    <p className="font-extrabold text-white text-lg">₦{(l1 * l2 * 750).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-6 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Trusted by <span className="text-[#FF7A00]">Thousands</span>
            </h2>
            <p className="text-lg text-white/70">Real results from real Nigerians.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Chioma N.', role: 'Student, Lagos', quote: 'Made ₦180,000 in my first month while learning digital marketing. The courses are top-notch!', earnings: '₦450K+ total' },
              { name: 'Emmanuel K.', role: 'Trader, Abuja', quote: 'Finally a platform that pays instantly to my Nigerian bank. No more withdrawal headaches.', earnings: '₦1.2M+ total' },
              { name: 'Aisha B.', role: 'Entrepreneur, Kano', quote: 'The WhatsApp monetization course changed my business. Now I have 3 steady income streams.', earnings: '₦890K+ total' },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" />
                  ))}
                </div>
                <p className="text-white/90 mb-8 leading-relaxed font-medium">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF7A00] flex items-center justify-center font-bold text-white">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-xs font-medium text-white/40">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white/40 uppercase mb-1">Earned</p>
                    <p className="text-sm font-extrabold text-[#FF7A00]">{testimonial.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-[3rem] bg-[#FF7A00] p-12 lg:p-16 text-center shadow-[0_10px_40px_rgba(255,122,0,0.3)]">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              Join 10,000+ Nigerians already earning. Start your 7-day free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register"
                className="px-10 py-5 rounded-2xl bg-[#0F2942] text-white font-extrabold text-lg shadow-xl hover:-translate-y-1 transition-transform"
              >
                Get Started Free
              </Link>
            </div>
            
            <p className="mt-8 text-sm font-bold text-white/70">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 relative z-10 bg-[#0F2942]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link to="/" className="inline-block mb-6 text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-white">Sell</span><span className="text-[#FF7A00]">iberation</span>
              </Link>
              <p className="text-white/60 max-w-sm font-medium leading-relaxed">
                Empowering Nigerians through premium digital education and revolutionary wealth-sharing affiliate networks.
              </p>
            </div>
            
            <div>
              <h4 className="font-extrabold mb-6 text-white uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-4 font-bold text-white/60">
                {['How it Works', 'Courses', 'Affiliate Program', 'Pricing'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-extrabold mb-6 text-white uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 font-bold text-white/60">
                {['About Us', 'Support', 'Terms & Privacy'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-bold text-white/40">
            <p>© {new Date().getFullYear()} Selliberation. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Built for the Nigerian Creator Economy <span className="text-lg">🇳🇬</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}