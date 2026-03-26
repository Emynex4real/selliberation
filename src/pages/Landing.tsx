import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Play, Award, DollarSign,
  BookOpen, MessageCircle, Globe, ChevronRight,
  Menu, X, Star, ShieldCheck, Users, Smartphone,
  BarChart3, TrendingUp, Zap, Target, Quote,
  UserPlus, Clock, Lock
} from 'lucide-react';

const COURSES = [
  {
    title: "Make Your First ₦10k–₦50k Online",
    desc: "The proven beginner playbook. No hype — just systems that actually work in Nigeria today.",
    modules: 8, lessons: 24,
    tag: "Most Popular",
    tagStyle: { background: '#FEF3C7', color: '#92400E' },
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
  },
  {
    title: "WhatsApp Monetization Mastery",
    desc: "Turn your WhatsApp status, channels, and broadcast lists into a consistent cash machine.",
    modules: 6, lessons: 18,
    tag: "Trending",
    tagStyle: { background: '#D1FAE5', color: '#065F46' },
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop",
  },
  {
    title: "Affiliate Marketing from Scratch",
    desc: "Pick the right niches, set up your funnels, and close commissions every single day.",
    modules: 5, lessons: 15,
    tag: "Beginner Friendly",
    tagStyle: { background: '#DBEAFE', color: '#1E40AF' },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Digital Products Reselling",
    desc: "Build a passive income engine by creating and reselling e-books, templates, and digital tools.",
    modules: 6, lessons: 20,
    tag: "High Earning",
    tagStyle: { background: '#EDE9FE', color: '#5B21B6' },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Simple Arbitrage Strategies",
    desc: "Profit from price differences across platforms and markets. Low risk, fast returns.",
    modules: 4, lessons: 12,
    tag: "New",
    tagStyle: { background: '#FFE4E6', color: '#9F1239' },
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    name: "Olamide B.",
    location: "Ibadan, Oyo",
    role: "Stay-at-home mum",
    msg: "Omo, Selliberation is legit! Just withdrew my first ₦35k commission this morning. I only started 3 weeks ago. The WhatsApp class really opened my eyes. 🙏🏾",
    earned: "₦35,000",
    period: "first 3 weeks",
    avatar: "O",
    avatarBg: '#DBEAFE',
    avatarColor: '#1E40AF',
  },
  {
    name: "Grace O.",
    location: "Port Harcourt",
    role: "Fresh graduate",
    msg: "The free modules alone are packed with value. I upgraded to premium 3 days ago and I've already gotten 2 referrals. My Level 2 commissions just started dropping too! 🚀💚",
    earned: "₦8,000",
    period: "in 3 days",
    avatar: "G",
    avatarBg: '#D1FAE5',
    avatarColor: '#065F46',
  },
  {
    name: "Emanuel U.",
    location: "Enugu State",
    role: "NYSC Corps Member",
    msg: "Best 5k I've spent this year. The platform is smooth, courses are practical, and the 6-level earning is no joke. My Level 2 guys are working hard for me. 😂",
    earned: "₦61,750",
    period: "in 6 weeks",
    avatar: "E",
    avatarBg: '#EDE9FE',
    avatarColor: '#5B21B6',
  },
];

const COMMISSION_LEVELS = [
  { level: 1, label: 'Direct Referral', rate: '65%', amount: 3250, barWidth: '100%', color: '#1E1B4B' },
  { level: 2, label: 'Their Referral', rate: '15%', amount: 750, barWidth: '60%', color: '#10B981' },
  { level: 3, label: '3rd Generation', rate: '5%', amount: 250, barWidth: '40%', color: '#F59E0B' },
  { level: 4, label: '4th Generation', rate: '3%', amount: 150, barWidth: '28%', color: '#3B82F6' },
  { level: 5, label: '5th Generation', rate: '2%', amount: 100, barWidth: '18%', color: '#8B5CF6' },
  { level: 6, label: '6th Generation', rate: '1%', amount: 50, barWidth: '10%', color: '#EC4899' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(5);

  const monthly = l1 * 3250 + l1 * l2 * 750;
  const yearly = monthly * 12;

  return (
    <div className="min-h-screen selection:bg-emerald-500 selection:text-white" style={{ backgroundColor: '#F9FAFB', color: '#111827', fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-2xl font-extrabold tracking-tight">
            <span style={{ color: '#0D2847' }}>Sell</span><span style={{ color: '#1CB957' }}>iberation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-[#1CB957] transition-colors">How It Works</a>
            <a href="#courses" className="hover:text-[#1CB957] transition-colors">Courses</a>
            <a href="#affiliate" className="hover:text-[#1CB957] transition-colors">Earn</a>
            <a href="#pricing" className="hover:text-[#1CB957] transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-[#0D2847] transition-colors">Log in</Link>
            <Link
              to="/register"
              className="text-sm font-bold text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-px transition-all"
              style={{ background: 'linear-gradient(135deg, #0D2847 0%, #1CB957 100%)' }}
            >
              Start Free Trial
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            {[['#how-it-works', 'How It Works'], ['#courses', 'Courses'], ['#affiliate', 'Earn'], ['#pricing', 'Pricing']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700">Log in</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #1E1B4B, #10B981)' }}>
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(150deg, #EEF2FF 0%, #F0FDF4 55%, #FFFBEB 100%)' }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 65%)' }} />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 65%)' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6 border" style={{ background: 'rgba(16,185,129,0.09)', borderColor: 'rgba(16,185,129,0.3)', color: '#059669' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              10,000+ Nigerians already earning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#111827' }}>
              Learn Skills.{' '}
              <span className="block mt-1" style={{ background: 'linear-gradient(135deg, #1E1B4B 20%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Earn Real Money.
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
              Nigeria's only platform where mastering digital skills and building a passive income happen at the same time. Powered by our 6-level affiliate program.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-bold text-[15px] transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #1E1B4B, #10B981)', boxShadow: '0 8px 28px rgba(30,27,75,0.28)' }}
              >
                Start 7-Day Free Trial <ArrowRight size={18} />
              </Link>
              <a
                href="#courses"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[15px] bg-white border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: '#1E1B4B', color: '#1E1B4B' }}
              >
                <Play size={17} fill="currentColor" /> Explore Courses
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {['No credit card required', 'Cancel anytime', 'Instant access'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-500" strokeWidth={3} /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative">
            <div className="rounded-2xl shadow-2xl overflow-hidden border border-white/80" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)' }}>
              {/* Mockup Top Bar */}
              <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-2.5 border-b border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 bg-gray-100 rounded-md h-5 text-[10px] text-gray-400 flex items-center px-2">app.selliberation.com/dashboard</span>
              </div>

              <div className="p-5 space-y-4">
                {/* Greeting */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Good morning, Chiamaka 👋</p>
                    <p className="text-sm font-bold text-gray-800">Your Earnings Overview</p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: '#D1FAE5', color: '#065F46' }}>Premium</span>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'This Month', value: '₦87,400', icon: '💰', accent: '#1E1B4B' },
                    { label: 'Referrals', value: '24', icon: '👥', accent: '#10B981' },
                    { label: 'Courses', value: '4 / 5', icon: '📚', accent: '#F59E0B' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: '#F8FAFC' }}>
                      <div className="text-lg mb-1">{s.icon}</div>
                      <div className="text-sm font-extrabold" style={{ color: s.accent }}>{s.value}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-gray-500">Commission History</span>
                    <span className="text-[11px] font-bold text-emerald-600">+34% this month</span>
                  </div>
                  <div className="flex items-end gap-1 h-14 px-1">
                    {[30, 48, 38, 62, 55, 70, 58, 80, 74, 90, 82, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i === 11
                            ? 'linear-gradient(to top, #1E1B4B, #10B981)'
                            : i >= 9 ? 'rgba(30,27,75,0.25)' : 'rgba(30,27,75,0.08)',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-300 mt-1 px-1">
                    <span>Apr</span><span>Jun</span><span>Aug</span><span>Dec</span><span>Mar</span>
                  </div>
                </div>

                {/* Recent commissions */}
                <div className="space-y-1.5">
                  {[
                    { name: 'Emeka joined via you', time: '2 min ago', amount: '+₦3,250', lvl: 'L1' },
                    { name: 'Fatimah joined via Emeka', time: '1 hr ago', amount: '+₦750', lvl: 'L2' },
                    { name: 'Bayo joined via Fatimah', time: '3 hrs ago', amount: '+₦250', lvl: 'L3' },
                  ].map(c => (
                    <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#EEF2FF', color: '#1E1B4B' }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-gray-700">{c.name}</p>
                          <p className="text-[10px] text-gray-400">{c.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-emerald-600">{c.amount}</p>
                        <p className="text-[10px] text-gray-400">{c.lvl} Commission</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-gray-100 animate-float">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">New Commission!</p>
                  <p className="text-[11px] font-semibold text-emerald-600">+₦3,250 just earned</p>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#FEF3C7' }}>
                  <Star size={13} style={{ color: '#F59E0B' }} fill="#F59E0B" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">Module Complete!</p>
                  <p className="text-[10px] text-gray-400">WhatsApp Mastery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-white border-y border-gray-200 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
            {[
              { value: '10,000+', label: 'Active Learners', icon: '🇳🇬' },
              { value: '₦50M+', label: 'Commissions Paid', icon: '💸' },
              { value: '5', label: 'Expert Courses', icon: '🎓' },
              { value: '4.9 / 5', label: 'Member Rating', icon: '⭐' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {['#1E1B4B', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#3B82F6', '#EC4899'].map((bg, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: bg }}>
                  {['C', 'E', 'F', 'A', 'M', 'K', 'O'][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">1,200+ Nigerians</span> joined in the last 7 days
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #F9FAFB 0%, #EEF2FF 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>
              From Zero to Earning in 3 Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No technical skills. No upfront investment. Just sign up, learn at your own pace, and watch your income grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute h-0.5 left-[20%] right-[20%] bg-gradient-to-r from-indigo-200 via-emerald-200 to-amber-200" style={{ top: '3.25rem' }} />

            {[
              { num: '01', Icon: UserPlus, title: 'Create Free Account', desc: 'Register in 60 seconds with your name, email, and phone. Get instant access to Module 1 of all courses — no card needed.', bg: '#EEF2FF', accent: '#1E1B4B' },
              { num: '02', Icon: BookOpen, title: 'Learn Practical Skills', desc: 'Watch expert-led video lessons on WhatsApp monetization, affiliate marketing, digital reselling, and more.', bg: '#F0FDF4', accent: '#10B981' },
              { num: '03', Icon: DollarSign, title: 'Earn Commissions', desc: 'Share your referral link. Earn up to 65% on every subscriber, cascading 6 levels deep through your growing network.', bg: '#FFFBEB', accent: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} className="card-hover rounded-2xl p-8 border relative overflow-hidden" style={{ background: s.bg, borderColor: `${s.accent}22` }}>
                <div className="absolute -top-2 -right-2 text-7xl font-black opacity-[0.07] select-none" style={{ color: s.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.num}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md" style={{ background: `${s.accent}18` }}>
                  <s.Icon size={26} style={{ color: s.accent }} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: s.accent }}>Step {s.num}</div>
                <h3 className="text-lg font-bold mb-3 text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Our Curriculum</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>
                5 Courses. Real Skills. Real Income.
              </h2>
              <p className="text-gray-500 max-w-lg">
                Built around what's actually working for Nigerians right now. Try Module 1 of every course free — upgrade when you're ready.
              </p>
            </div>
            <Link to="/register" className="whitespace-nowrap flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all" style={{ color: '#10B981' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="card-hover group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-100 flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full" style={course.tagStyle}>{course.tag}</span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-white/80 font-medium">
                    <Lock size={10} />
                    <span>Module 1 free</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {course.modules} Modules</span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1"><Play size={12} /> {course.lessons} Lessons</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{course.desc}</p>
                  <Link
                    to="/register"
                    className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                    style={{ color: '#1E1B4B' }}
                  >
                    Start Learning <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}

            {/* Waitlist card */}
            <div className="card-hover rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center gap-3 hover:border-emerald-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#EEF2FF' }}>
                <Globe size={22} style={{ color: '#1E1B4B' }} />
              </div>
              <p className="font-semibold text-gray-700">More courses arriving soon</p>
              <p className="text-sm text-gray-400">Join the waitlist and get notified first</p>
              <Link to="/register" className="text-sm font-bold" style={{ color: '#10B981' }}>Join Waitlist →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFFILIATE / EARNING SYSTEM ── */}
      <section id="affiliate" className="py-24 px-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-sm font-bold" style={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.35)', color: '#FCD34D' }}>
              <Award size={15} /> THE SELLIBERATION ADVANTAGE
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Earn Up to 65% Commission —{' '}
              <span style={{ color: '#10B981' }}>6 Levels Deep</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              When your referrals subscribe, you earn. When their referrals subscribe, you still earn — all the way to the 6th generation. Your network keeps paying you.
            </p>

            <div className="space-y-3 mb-10">
              {COMMISSION_LEVELS.map(lvl => (
                <div key={lvl.level} className="flex items-center gap-4">
                  <div className="text-xs font-semibold text-gray-500 w-5 shrink-0">{lvl.level}</div>
                  <div className="flex-1 rounded-full h-8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full rounded-full flex items-center px-3 transition-all"
                      style={{ width: lvl.barWidth, background: lvl.color }}
                    >
                      <span className="text-xs font-bold text-white">{lvl.rate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-white">₦{lvl.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500">/sub</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <ShieldCheck size={15} style={{ color: '#10B981' }} />
              Based on Premium subscription at ₦5,000/month
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #10B981, #F59E0B)', color: '#111827' }}
            >
              Start Building Your Network <ArrowRight size={17} />
            </Link>
          </div>

          {/* Right — Live Scenario */}
          <div className="rounded-2xl p-7 border" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h3 className="text-white font-bold text-lg mb-6">Realistic Earning Scenario</h3>

            <div className="space-y-3 mb-6">
              {[
                { icon: '🧑‍💼', label: 'You refer 5 people', sub: '5 × ₦3,250 (65%)', value: '₦16,250/mo', indent: 0 },
                { icon: '👥', label: 'They each refer 3 friends', sub: '15 × ₦750 (15%)', value: '₦11,250/mo', indent: 1 },
                { icon: '🌐', label: 'Their network grows', sub: '30 × ₦250 (5%)', value: '₦7,500/mo', indent: 2 },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-xl"
                  style={{ marginLeft: `${row.indent * 18}px`, background: `rgba(255,255,255,${0.12 - i * 0.03})` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{row.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{row.label}</p>
                      <p className="text-xs text-gray-400">{row.sub}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#10B981' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-5 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <div>
                <p className="text-sm text-gray-400">Total Monthly</p>
                <p className="text-[11px] text-gray-500">From just 3 levels of your network</p>
              </div>
              <span className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#10B981' }}>₦35,000</span>
            </div>

            <Link
              to="/register"
              className="mt-5 block w-full text-center py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1E1B4B', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              See My Full Potential →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Real Stories</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>
              Nigerians Winning with Selliberation
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Not actors. Not stock photos. Real people, real naira, from right across Nigeria.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #1E1B4B, #10B981)' }} />
                <div className="p-6 flex flex-col flex-1">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={13} style={{ color: '#F59E0B' }} fill="#F59E0B" />)}
                  </div>

                  {/* WhatsApp-style bubble */}
                  <div className="rounded-2xl rounded-tl-none p-4 mb-5 flex-1 relative" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <Quote size={20} className="absolute top-2 right-2 opacity-20" style={{ color: '#10B981' }} />
                    <p className="text-gray-700 text-sm leading-relaxed">{t.msg}</p>
                    <div className="flex justify-end items-center gap-1 mt-2 text-[10px] text-gray-400">
                      <Check size={11} className="text-blue-400" /> Verified member
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: t.avatarBg, color: t.avatarColor }}>
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.role} · {t.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold" style={{ color: '#10B981' }}>{t.earned}</p>
                      <p className="text-[10px] text-gray-400">{t.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARNINGS CALCULATOR ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Calculator</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>
              How Much Could You Earn?
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">Drag the sliders to model your potential monthly income from the affiliate program.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-8">
              {[
                { label: 'Your Direct Referrals (Level 1)', sub: 'Each earns you ₦3,250/month', value: l1, setter: setL1, min: 1, max: 50, accent: '#1E1B4B' },
                { label: 'People Each Referral Invites', sub: 'Their subscribers earn you ₦750 each (Level 2)', value: l2, setter: setL2, min: 1, max: 20, accent: '#10B981' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                    </div>
                    <span className="text-2xl font-extrabold ml-4 shrink-0" style={{ color: s.accent, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {s.value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    value={s.value}
                    onChange={e => s.setter(Number(e.target.value))}
                    className="w-full h-2.5 rounded-full cursor-pointer appearance-none"
                    style={{ accentColor: s.accent }}
                  />
                  <div className="flex justify-between text-xs text-gray-300 mt-1.5">
                    <span>{s.min}</span><span>{s.max}</span>
                  </div>
                </div>
              ))}

              <div className="rounded-xl p-4 border" style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-0.5">Level 1 ({l1} subs)</p>
                    <p className="font-bold" style={{ color: '#1E1B4B' }}>₦{(l1 * 3250).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Level 2 ({l1 * l2} subs)</p>
                    <p className="font-bold" style={{ color: '#10B981' }}>₦{(l1 * l2 * 750).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="rounded-2xl p-8 text-white text-center shadow-2xl" style={{ background: 'linear-gradient(145deg, #1E1B4B 0%, #10B981 100%)' }}>
              <Zap size={28} className="mx-auto mb-3 opacity-80" />
              <p className="text-white/70 text-sm font-medium mb-1">Estimated Monthly Earnings</p>
              <div className="text-5xl font-extrabold mb-1 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                ₦{monthly.toLocaleString()}
              </div>
              <p className="text-white/50 text-sm mb-7">from only 2 levels of your network</p>

              <div className="rounded-xl p-4 mb-6 text-left space-y-2" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Direct (L1) × {l1}</span>
                  <span className="font-semibold">₦{(l1 * 3250).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Network (L2) × {l1 * l2}</span>
                  <span className="font-semibold">₦{(l1 * l2 * 750).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-sm font-bold" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                  <span>Yearly Potential</span>
                  <span style={{ color: '#FCD34D' }}>₦{yearly.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/register"
                className="block w-full py-3.5 rounded-xl font-bold transition-all hover:opacity-90"
                style={{ background: '#F59E0B', color: '#111827' }}
              >
                Start Earning Now →
              </Link>

              <p className="text-xs text-white/40 mt-3">Levels 3–6 add even more passive income</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4" style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #F9FAFB 100%)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#10B981' }}>Pricing</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1E1B4B' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">Start completely free for 7 days. Upgrade to Premium when you're ready to unlock everything.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Free */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Free Trial</h3>
              <div className="flex items-end gap-1 mt-3 mb-1">
                <span className="text-4xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₦0</span>
                <span className="text-gray-400 pb-1">/ 7 days</span>
              </div>
              <p className="text-sm text-gray-400 mb-7">No card required. Cancel anytime.</p>

              <ul className="space-y-3.5 mb-8">
                {['Module 1 of all 5 courses', 'Intro video lessons', 'Basic WhatsApp content', 'Affiliate program access', 'Community forum'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check size={15} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={2.5} /> {f}
                  </li>
                ))}
                {['Full course access', 'Advanced strategies', 'Priority support', 'Certificates'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <X size={15} className="mt-0.5 shrink-0 text-gray-300" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className="block w-full text-center py-3.5 rounded-xl font-bold border-2 transition-all hover:bg-indigo-50"
                style={{ borderColor: '#1E1B4B', color: '#1E1B4B' }}
              >
                Start Free Trial
              </Link>
            </div>

            {/* Premium */}
            <div className="rounded-3xl p-8 relative shadow-2xl text-white md:-translate-y-4" style={{ background: 'linear-gradient(150deg, #1E1B4B 0%, #0F172A 100%)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-extrabold text-indigo-900" style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }}>
                MOST POPULAR
              </div>

              <h3 className="text-lg font-extrabold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Premium</h3>
              <div className="flex items-end gap-1 mt-3 mb-1">
                <span className="text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₦5,000</span>
                <span className="text-white/50 pb-1">/ month</span>
              </div>
              <p className="text-sm text-white/50 mb-7">Unlock everything. Learn, earn, and scale.</p>

              <ul className="space-y-3.5 mb-8">
                {[
                  { icon: ShieldCheck, text: 'All 5 courses — every module & lesson' },
                  { icon: BarChart3, text: 'Full 6-level affiliate program' },
                  { icon: DollarSign, text: '65% direct commission (₦3,250/sub)' },
                  { icon: Users, text: 'Priority WhatsApp support' },
                  { icon: Target, text: 'Certificate of completion' },
                  { icon: TrendingUp, text: 'New courses as they launch' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5 text-sm text-white/90">
                    <Icon size={15} className="mt-0.5 shrink-0" style={{ color: '#10B981' }} /> {text}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className="block w-full text-center py-3.5 rounded-xl font-bold transition-all hover:opacity-90"
                style={{ background: '#10B981', color: 'white' }}
              >
                Upgrade & Start Earning
              </Link>
              <p className="text-center text-xs text-white/30 mt-3">Joined by 8,000+ premium members</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(150deg, #F0FDF4 0%, #EEF2FF 100%)' }}>
        <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-10 md:p-16 shadow-xl border border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #1E1B4B, #10B981)' }}>
            <Award size={28} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#111827' }}>
            Your Financial Future{' '}
            <span style={{ background: 'linear-gradient(135deg, #1E1B4B, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Starts Right Now
            </span>
          </h2>
          <p className="text-gray-500 text-lg mb-9 max-w-lg mx-auto leading-relaxed">
            Thousands of Nigerians have already taken the first step. The free trial costs nothing. Waiting costs everything.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1E1B4B, #10B981)', boxShadow: '0 8px 28px rgba(30,27,75,0.25)' }}
            >
              Start 7-Day Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#1E1B4B', color: '#1E1B4B' }}
            >
              Already a Member? Login
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-400">
            {[
              { Icon: ShieldCheck, text: 'Secure & trusted' },
              { Icon: Clock, text: '7-day free trial' },
              { Icon: Smartphone, text: 'Works on any device' },
            ].map(({ Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} className="text-emerald-500" /> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 pt-16 pb-8 px-4 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="inline-block mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-2xl font-extrabold">
                  <span className="text-white">Sell</span><span style={{ color: '#10B981' }}>iberation</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Empowering Nigerians through premium digital education and a revolutionary wealth-sharing affiliate network.
              </p>
              <p className="text-xs text-gray-600 mt-3">Part of Digital World Tech Academy</p>
            </div>

            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</p>
              <ul className="space-y-2.5 text-sm">
                {[['#courses', 'Courses'], ['#affiliate', 'Affiliate Program'], ['#pricing', 'Pricing'], ['/register', 'Get Started']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</p>
              <ul className="space-y-2.5 text-sm">
                {[['#', 'About Us'], ['#', 'Contact'], ['#', 'Terms of Service'], ['#', 'Privacy Policy']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Selliberation. All rights reserved.</p>
            <p>Built for the Nigerian Creator Economy 🇳🇬</p>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://wa.me/2349000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn group"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
        <span className="absolute right-16 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Support
        </span>
      </a>
    </div>
  );
}
