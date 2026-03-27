import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Award, DollarSign,
  BookOpen, Menu, X, UserPlus, Zap, TrendingUp,
  Users, ChevronRight, Star, Clock, MessageCircle, 
  Share2, Package, Smartphone
} from 'lucide-react';

const COMMISSION_LEVELS = [
  { level: 1, label: 'Direct Referral', rate: '65%', amount: 3250, barWidth: '100%', color: '#FF7A00' },
  { level: 2, label: 'Their Referral', rate: '15%', amount: 750, barWidth: '60%', color: '#0F2942' },
  { level: 3, label: '3rd Generation', rate: '5%', amount: 250, barWidth: '40%', color: '#1E476B' },
  { level: 4, label: '4th Generation', rate: '3%', amount: 150, barWidth: '28%', color: '#2D6594' },
  { level: 5, label: '5th Generation', rate: '2%', amount: 100, barWidth: '18%', color: '#4585BD' },
  { level: 6, label: '6th Generation', rate: '1%', amount: 50, barWidth: '10%', color: '#6AA3D6' },
];

const COURSES = [
  { title: 'WhatsApp Monetization', students: '3,200+', rating: 4.9, icon: MessageCircle },
  { title: 'Affiliate Marketing Mastery', students: '2,800+', rating: 4.8, icon: Share2 },
  { title: 'Digital Product Creation', students: '1,500+', rating: 4.9, icon: Package },
  { title: 'Social Media Growth', students: '4,100+', rating: 4.7, icon: Smartphone }
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(5);
  const [scrolled, setScrolled] = useState(false);

  const monthly = l1 * 3250 + l1 * l2 * 750;

  // Exact Brand Colors
  const colors = {
    navy: '#0F2942',
    orange: '#FF7A00',
    bgLight: '#F9FAFB',
    cardBorder: 'rgba(0,0,0,0.06)'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#FF7A00] selection:text-white overflow-x-hidden text-gray-900 bg-white">
      
      {/* ── DYNAMIC NAVBAR ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'}`} style={{ borderColor: scrolled ? colors.cardBorder : 'transparent' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span style={{ color: scrolled ? colors.navy : 'white', transition: 'color 0.3s' }}>Sell</span>
            <span style={{ color: colors.orange }}>iberation</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {['How It Works', 'Courses', 'Earnings', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-bold transition-colors ${scrolled ? 'text-gray-500 hover:text-[#0F2942]' : 'text-white/70 hover:text-white'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link to="/login" className={`text-sm font-bold transition-colors ${scrolled ? 'text-gray-700 hover:text-[#0F2942]' : 'text-white hover:text-white/80'}`}>
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: colors.orange }}
            >
              Get Started Free
            </Link>
          </div>

          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full inset-x-0 bg-white border-b p-6 space-y-4 shadow-2xl" style={{ borderColor: colors.cardBorder }}>
            {['How It Works', 'Courses', 'Earnings', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-xl text-base font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0F2942] transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <Link to="/login" className="block w-full py-3 text-center rounded-xl border-2 font-bold" style={{ borderColor: colors.navy, color: colors.navy }}>
                Sign In
              </Link>
              <Link to="/register" className="block w-full py-3 text-center rounded-xl text-white font-bold shadow-md" style={{ backgroundColor: colors.orange }}>
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION (DARK NAVY) ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 sm:px-6 overflow-hidden" style={{ backgroundColor: colors.navy }}>
        {/* Subtle Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: colors.orange }} />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 bg-white/5 backdrop-blur-sm" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full opacity-75" style={{ backgroundColor: colors.orange }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.orange }} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                10,000+ Nigerians Earning
              </span>
            </div>

            <h1 className="text-5xl lg:text-[4.2rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Learn Skills.<br />
              <span style={{ color: colors.orange }}>Earn Money.</span>
            </h1>

            <p className="text-lg max-w-lg leading-relaxed mb-10 text-blue-100/70 font-medium">
              Nigeria's premier platform combining world-class digital education with a revolutionary 6-level affiliate system. Turn your network into net worth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,122,0,0.3)] transition-transform hover:-translate-y-1"
                style={{ backgroundColor: colors.orange }}
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                <Play className="w-4 h-4 fill-white" /> Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-blue-100/50 font-semibold">
              <div className="flex -space-x-3">
                {['A', 'K', 'M'].map((initial, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F2942] flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ backgroundColor: colors.orange }}>
                    {initial}
                  </div>
                ))}
              </div>
              <p>Join <span className="font-extrabold text-white">10,000+</span> active members</p>
            </div>
          </div>

          {/* Right Content - White Dashboard UI Mockup */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="bg-white rounded-3xl p-6 shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500 relative z-10 border" style={{ borderColor: colors.cardBorder }}>
              
              <div className="rounded-2xl p-4 flex items-center justify-between shadow-sm border mb-6" style={{ background: '#FFF5EB', borderColor: 'rgba(255,122,0,0.2)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FF7A00]/10">
                    <Clock size={18} style={{ color: colors.orange }} />
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm">Trial Active</p>
                    <p className="text-xs text-gray-500 font-medium">Upgrade to withdraw</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: colors.orange }}>
                  <Zap size={14} /> Upgrade
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-2xl p-5 border" style={{ borderColor: colors.cardBorder }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Earned</span>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.navy }}>
                      <DollarSign size={16} color="white" />
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 mb-1">₦145,250</p>
                  <p className="text-xs font-bold" style={{ color: colors.orange }}>+12% this week</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border" style={{ borderColor: colors.cardBorder }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Network</span>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-200">
                      <Users size={16} color={colors.navy} />
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 mb-1">1,247</p>
                  <p className="text-xs font-bold" style={{ color: colors.navy }}>Active referrals</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Activity</p>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#FFF5EB', color: colors.orange }}>
                      L1
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">Emeka joined network</p>
                      <p className="text-xs text-gray-500 font-medium">2 mins ago • Level 1</p>
                    </div>
                  </div>
                  <p className="text-sm font-extrabold" style={{ color: colors.orange }}>+₦3,250</p>
                </div>
              </div>
            </div>

            {/* Floating Notification */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border animate-bounce z-20" style={{ borderColor: colors.cardBorder, animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EAF0F6]">
                  <DollarSign size={20} style={{ color: colors.navy }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Payout Sent</p>
                  <p className="text-sm font-extrabold text-gray-900">₦35,000 to GTBank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION (WHITE) ── */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '₦50M+', label: 'Paid Out' },
              { value: '10K+', label: 'Active Learners' },
              { value: '65%', label: 'Commission' },
              { value: '4.9/5', label: 'Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 border-r last:border-r-0 border-gray-100">
                <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: colors.navy, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.orange }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (LIGHT GRAY) ── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6" style={{ backgroundColor: colors.bgLight }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border shadow-sm bg-white" style={{ color: colors.orange, borderColor: colors.cardBorder }}>
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-6 mb-6 text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              From Zero to <span style={{ color: colors.orange }}>Earning</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              No technical skills required. Our proven system guides you from your first lesson to your first commission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0" />
            
            {[
              { step: '01', icon: UserPlus, title: 'Create Account', desc: 'Sign up in 60 seconds. Get instant access to your dashboard and Module 1 of all courses.' },
              { step: '02', icon: BookOpen, title: 'Learn & Apply', desc: 'Watch expert-led video lessons on WhatsApp monetization, affiliate marketing, and digital products.' },
              { step: '03', icon: DollarSign, title: 'Earn Commissions', desc: 'Share your unique link. Earn up to 65% on every referral, cascading 6 levels deep.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all relative z-10 hover:-translate-y-1" style={{ border: `1px solid ${colors.cardBorder}` }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: colors.navy }}>
                    <item.icon size={28} color="white" />
                  </div>
                  <span className="text-4xl font-extrabold text-gray-100">{item.step}</span>
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES SECTION (DARK NAVY) ── */}
      <section id="courses" className="py-24 px-4 sm:px-6" style={{ backgroundColor: colors.navy }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Premium <span style={{ color: colors.orange }}>Courses</span>
              </h2>
              <p className="text-lg text-blue-100/70 max-w-xl font-medium">
                Industry-leading curriculum designed by experts who've generated millions in online revenue.
              </p>
            </div>
            <Link to="/register" className="flex items-center gap-2 font-bold text-sm bg-white px-6 py-3 rounded-xl transition-all hover:bg-gray-100" style={{ color: colors.navy }}>
              View all courses <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                <div className="px-6 py-8 flex items-center justify-center border-b" style={{ backgroundColor: '#F9FAFB', borderColor: colors.cardBorder }}>
                  <course.icon size={48} style={{ color: colors.navy }} className="opacity-80" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-extrabold text-gray-900 text-lg mb-3 leading-snug flex-1">{course.title}</h4>
                  <div className="flex items-center gap-2 mb-5">
                    <Star size={16} fill={colors.orange} color={colors.orange} />
                    <span className="text-sm font-extrabold text-gray-900">{course.rating}</span>
                    <span className="text-xs font-semibold text-gray-400">({course.students})</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: colors.orange }}>Module 1 Free</span>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <ArrowRight size={14} style={{ color: colors.navy }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE SYSTEM & CALCULATOR (WHITE) ── */}
      <section id="earnings" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border mb-8" style={{ borderColor: colors.cardBorder }}>
              <Award size={16} style={{ color: colors.orange }} />
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-600">6-Level Deep Network</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Earn Up to 65% <br />
              <span style={{ color: colors.orange }}>Six Levels Deep</span>
            </h2>
            
            <p className="text-lg text-gray-500 mb-10 font-medium leading-relaxed">
              Unlike typical affiliate programs, we reward you for building a network. When your referrals bring others, you continue earning.
            </p>

            <div className="bg-[#F9FAFB] rounded-3xl p-8 border" style={{ borderColor: colors.cardBorder }}>
              <h3 className="font-extrabold text-gray-900 mb-6 text-lg">Commission Structure</h3>
              <div className="space-y-4">
                {COMMISSION_LEVELS.map((lvl) => (
                  <div key={lvl.level} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold bg-white border text-gray-500 shrink-0" style={{ borderColor: colors.cardBorder }}>
                      L{lvl.level}
                    </div>
                    <div className="flex-1 h-10 bg-white rounded-full overflow-hidden relative border" style={{ borderColor: colors.cardBorder }}>
                      <div 
                        className="h-full flex items-center px-4"
                        style={{ width: lvl.barWidth, backgroundColor: lvl.level === 1 ? colors.orange : colors.navy }}
                      >
                        <span className="text-sm font-extrabold text-white">
                          {lvl.rate}
                        </span>
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-sm font-extrabold text-gray-900">₦{lvl.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* White Calculator Card */}
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border" style={{ borderColor: colors.cardBorder }}>
            <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#FEF3E8]">
                <TrendingUp size={24} style={{ color: colors.orange }} />
              </div>
              Earnings Calculator
            </h3>

            <div className="space-y-10 mb-10">
              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-extrabold text-gray-900 text-lg">Direct Referrals (Level 1)</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">₦3,250 per referral</p>
                  </div>
                  <span className="text-3xl font-extrabold" style={{ color: colors.orange }}>{l1}</span>
                </div>
                <input 
                  type="range" min="1" max="50" value={l1} onChange={(e) => setL1(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: colors.orange }}
                />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="font-extrabold text-gray-900 text-lg">Each refers (Level 2)</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">₦750 per referral</p>
                  </div>
                  <span className="text-3xl font-extrabold" style={{ color: colors.navy }}>{l2}</span>
                </div>
                <input 
                  type="range" min="1" max="20" value={l2} onChange={(e) => setL2(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: colors.navy }}
                />
              </div>
            </div>

            <div className="p-8 rounded-3xl text-center shadow-inner border" style={{ background: '#F9FAFB', borderColor: colors.cardBorder }}>
              <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Estimated Monthly Income</p>
              <div className="text-5xl font-extrabold mb-6" style={{ color: colors.orange, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ₦{monthly.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-left">
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                  <p className="text-gray-400 font-bold text-xs mb-1">L1 Earnings</p>
                  <p className="font-extrabold text-gray-900 text-lg">₦{(l1 * 3250).toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                  <p className="text-gray-400 font-bold text-xs mb-1">L2 Earnings</p>
                  <p className="font-extrabold text-gray-900 text-lg">₦{(l1 * l2 * 750).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA & FOOTER (DARK NAVY) ── */}
      <section className="pt-24 px-4 sm:px-6" style={{ backgroundColor: colors.navy }}>
        <div className="max-w-5xl mx-auto mb-24">
          <div className="rounded-[3rem] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden" style={{ backgroundColor: colors.orange }}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 font-medium mb-10 max-w-2xl mx-auto">
              Join 10,000+ Nigerians already earning. Start your 7-day free trial today.
            </p>
            
            <div className="flex justify-center">
              <Link 
                to="/register"
                className="px-10 py-5 rounded-2xl text-white font-extrabold text-lg shadow-xl hover:-translate-y-1 transition-transform flex items-center gap-2"
                style={{ backgroundColor: colors.navy }}
              >
                <Zap size={20} /> Get Started Free
              </Link>
            </div>
            <p className="mt-6 text-sm font-bold text-white/70">No credit card required • Cancel anytime</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-16 pb-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-3xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-white">Sell</span><span style={{ color: colors.orange }}>iberation</span>
              </div>
              <p className="text-blue-100/60 max-w-sm font-medium leading-relaxed">
                Empowering Nigerians through premium digital education and a revolutionary wealth-sharing affiliate network.
              </p>
            </div>
            
            <div>
              <h4 className="font-extrabold mb-6 text-white uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-4 font-bold text-blue-100/60">
                {['How it Works', 'Courses', 'Affiliate Program', 'Pricing'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-extrabold mb-6 text-white uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 font-bold text-blue-100/60">
                {['About Us', 'Support', 'Terms & Privacy'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-bold text-blue-100/40">
            <p>© {new Date().getFullYear()} Selliberation. All rights reserved.</p>
            <p className="flex items-center gap-2">Built for the Nigerian Creator Economy <span className="text-lg">🇳🇬</span></p>
          </div>
        </div>
      </section>

    </div>
  );
}