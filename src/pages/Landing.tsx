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
    tagStyle: { background: '#FFF2E5', color: '#CC6200' }, // Orange tint
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
  },
  {
    title: "WhatsApp Monetization Mastery",
    desc: "Turn your WhatsApp status, channels, and broadcast lists into a consistent cash machine.",
    modules: 6, lessons: 18,
    tag: "Trending",
    tagStyle: { background: '#E8F8EE', color: '#169445' }, // Green tint
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop",
  },
  {
    title: "Affiliate Marketing from Scratch",
    desc: "Pick the right niches, set up your funnels, and close commissions every single day.",
    modules: 5, lessons: 15,
    tag: "Beginner Friendly",
    tagStyle: { background: '#F0F4F8', color: '#0F2942' }, // Blue tint
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Digital Products Reselling",
    desc: "Build a passive income engine by creating and reselling e-books, templates, and digital tools.",
    modules: 6, lessons: 20,
    tag: "High Earning",
    tagStyle: { background: '#FFF2E5', color: '#FF7A00' }, // Orange tint
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Simple Arbitrage Strategies",
    desc: "Profit from price differences across platforms and markets. Low risk, fast returns.",
    modules: 4, lessons: 12,
    tag: "New",
    tagStyle: { background: '#E8F8EE', color: '#1CB957' }, // Green tint
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
    avatarBg: '#F0F4F8',
    avatarColor: '#0F2942',
  },
  {
    name: "Grace O.",
    location: "Port Harcourt",
    role: "Fresh graduate",
    msg: "The free modules alone are packed with value. I upgraded to premium 3 days ago and I've already gotten 2 referrals. My Level 2 commissions just started dropping too! 🚀💚",
    earned: "₦8,000",
    period: "in 3 days",
    avatar: "G",
    avatarBg: '#E8F8EE',
    avatarColor: '#1CB957',
  },
  {
    name: "Emanuel U.",
    location: "Enugu State",
    role: "NYSC Corps Member",
    msg: "Best 5k I've spent this year. The platform is smooth, courses are practical, and the 6-level earning is no joke. My Level 2 guys are working hard for me. 😂",
    earned: "₦61,750",
    period: "in 6 weeks",
    avatar: "E",
    avatarBg: '#FFF2E5',
    avatarColor: '#FF7A00',
  },
];

const COMMISSION_LEVELS = [
  { level: 1, label: 'Direct Referral', rate: '65%', amount: 3250, barWidth: '100%', color: '#FF7A00' },
  { level: 2, label: 'Their Referral', rate: '15%', amount: 750, barWidth: '60%', color: '#1CB957' },
  { level: 3, label: '3rd Generation', rate: '5%', amount: 250, barWidth: '40%', color: '#0F2942' },
  { level: 4, label: '4th Generation', rate: '3%', amount: 150, barWidth: '28%', color: '#4B6B8A' },
  { level: 5, label: '5th Generation', rate: '2%', amount: 100, barWidth: '18%', color: '#829AB1' },
  { level: 6, label: '6th Generation', rate: '1%', amount: 50, barWidth: '10%', color: '#BCCCDC' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(5);

  const monthly = l1 * 3250 + l1 * l2 * 750;
  const yearly = monthly * 12;

  // LOGO COLORS
  const colors = {
    blue: '#0F2942',
    green: '#1CB957',
    orange: '#FF7A00'
  };

  return (
    <div className="min-h-screen selection:bg-[#FF7A00] selection:text-white" style={{ backgroundColor: '#F9FAFB', color: '#111827', fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-2xl font-extrabold tracking-tight">
            <span style={{ color: colors.blue }}>Sell</span><span style={{ color: colors.orange }}>iberation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-[#FF7A00] transition-colors">How It Works</a>
            <a href="#courses" className="hover:text-[#FF7A00] transition-colors">Courses</a>
            <a href="#affiliate" className="hover:text-[#FF7A00] transition-colors">Earn</a>
            <a href="#pricing" className="hover:text-[#FF7A00] transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-[#0F2942] transition-colors">Log in</Link>
            <Link
              to="/register"
              className="text-sm font-bold text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-px transition-all"
              style={{ background: colors.orange }}
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
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors hover:text-[#FF7A00]">
                {label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-lg text-sm font-semibold border border-gray-200 text-gray-700">Log in</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-center py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: colors.orange }}>
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden bg-white">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.orange} 0%, transparent 65%)` }} />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${colors.blue} 0%, transparent 65%)` }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6 border" style={{ background: '#E8F8EE', borderColor: '#BBF7D0', color: colors.green }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full opacity-75" style={{ backgroundColor: colors.green }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.green }} />
              </span>
              10,000+ Nigerians already earning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>
              Learn Skills.{' '}
              <span className="block mt-1" style={{ color: colors.orange }}>
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
                style={{ background: colors.orange, boxShadow: '0 8px 28px rgba(255,122,0,0.25)' }}
              >
                Start 7-Day Free Trial <ArrowRight size={18} />
              </Link>
              <a
                href="#courses"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-[15px] bg-white border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: colors.blue, color: colors.blue }}
              >
                <Play size={17} fill="currentColor" /> Explore Courses
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {['No credit card required', 'Cancel anytime', 'Instant access'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={14} strokeWidth={3} style={{ color: colors.green }} /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative">
            <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white">
              <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-2.5 border-b border-gray-100 bg-gray-50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 bg-white border border-gray-200 rounded-md h-5 text-[10px] text-gray-400 flex items-center px-2">app.selliberation.com/dashboard</span>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Good morning, Chiamaka 👋</p>
                    <p className="text-sm font-bold text-gray-800">Your Earnings Overview</p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-100" style={{ color: colors.orange }}>Premium</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'This Month', value: '₦87,400', icon: '💰', accent: colors.orange },
                    { label: 'Referrals', value: '24', icon: '👥', accent: colors.green },
                    { label: 'Courses', value: '4 / 5', icon: '📚', accent: colors.blue },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3 text-center border border-gray-100 bg-gray-50">
                      <div className="text-lg mb-1">{s.icon}</div>
                      <div className="text-sm font-extrabold" style={{ color: s.accent }}>{s.value}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-gray-500">Commission History</span>
                    <span className="text-[11px] font-bold" style={{ color: colors.green }}>+34% this month</span>
                  </div>
                  <div className="flex items-end gap-1 h-14 px-1">
                    {[30, 48, 38, 62, 55, 70, 58, 80, 74, 90, 82, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i === 11 ? colors.orange : 'rgba(255,122,0,0.15)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {[
                    { name: 'Emeka joined via you', time: '2 min ago', amount: '+₦3,250', lvl: 'L1', color: colors.orange },
                    { name: 'Fatimah joined via Emeka', time: '1 hr ago', amount: '+₦750', lvl: 'L2', color: colors.green },
                    { name: 'Bayo joined via Fatimah', time: '3 hrs ago', amount: '+₦250', lvl: 'L3', color: colors.blue },
                  ].map(c => (
                    <div key={c.name} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: c.color }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-gray-700">{c.name}</p>
                          <p className="text-[10px] text-gray-400">{c.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold" style={{ color: c.color }}>{c.amount}</p>
                        <p className="text-[10px] text-gray-400">{c.lvl} Commission</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-3.5 py-2.5 shadow-xl border border-gray-100 animate-float">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">New Commission!</p>
                  <p className="text-[11px] font-semibold" style={{ color: colors.green }}>+₦3,250 just earned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-white border-y border-gray-100 py-10 px-4">
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
                <div className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.orange }}>Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>
              From Zero to Earning in 3 Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No technical skills. No upfront investment. Just sign up, learn at your own pace, and watch your income grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* The Logo's gradient line representing the 3 colors */}
            <div className="hidden md:block absolute h-1 rounded-full left-[20%] right-[20%] z-0" style={{ top: '3.25rem', background: `linear-gradient(to right, ${colors.blue}, ${colors.green}, ${colors.orange})` }} />

            {[
              { num: '01', Icon: UserPlus, title: 'Create Free Account', desc: 'Register in 60 seconds. Get instant access to Module 1 of all courses — no card needed.', bg: '#F0F4F8', accent: colors.blue },
              { num: '02', Icon: BookOpen, title: 'Learn Practical Skills', desc: 'Watch expert-led video lessons on WhatsApp monetization, affiliate marketing, and more.', bg: '#E8F8EE', accent: colors.green },
              { num: '03', Icon: DollarSign, title: 'Earn Commissions', desc: 'Share your referral link. Earn up to 65% on every subscriber, cascading 6 levels deep.', bg: '#FFF2E5', accent: colors.orange },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative z-10 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: s.bg }}>
                  <s.Icon size={26} style={{ color: s.accent }} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: s.accent }}>Step {s.num}</div>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>{s.title}</h3>
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
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.green }}>Our Curriculum</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>
                5 Courses. Real Skills. Real Income.
              </h2>
              <p className="text-gray-500 max-w-lg">
                Built around what's actually working for Nigerians right now. Try Module 1 of every course free — upgrade when you're ready.
              </p>
            </div>
            <Link to="/register" className="whitespace-nowrap flex items-center gap-1.5 text-sm font-bold hover:gap-2.5 transition-all" style={{ color: colors.orange }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm" style={course.tagStyle}>{course.tag}</span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-white/90 font-medium">
                    <Lock size={10} /> <span>Module 1 free</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {course.modules} Modules</span>
                    <span className="text-gray-200">|</span>
                    <span className="flex items-center gap-1"><Play size={12} /> {course.lessons} Lessons</span>
                  </div>
                  <h3 className="font-bold mb-2 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1 leading-relaxed">{course.desc}</p>
                  <Link
                    to="/register"
                    className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                    style={{ color: colors.orange }}
                  >
                    Start Learning <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE / EARNING SYSTEM ── */}
      <section id="affiliate" className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: colors.blue }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(${colors.green} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-sm font-bold" style={{ background: 'rgba(255,122,0,0.15)', borderColor: 'rgba(255,122,0,0.3)', color: colors.orange }}>
              <Award size={15} /> THE SELLIBERATION ADVANTAGE
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Earn Up to 65% Commission —{' '}
              <span style={{ color: colors.green }}>6 Levels Deep</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              When your referrals subscribe, you earn. When their referrals subscribe, you still earn — all the way to the 6th generation. Your network keeps paying you.
            </p>

            <div className="space-y-3 mb-10">
              {COMMISSION_LEVELS.map(lvl => (
                <div key={lvl.level} className="flex items-center gap-4">
                  <div className="text-xs font-semibold text-gray-400 w-5 shrink-0">{lvl.level}</div>
                  <div className="flex-1 rounded-full h-8 overflow-hidden bg-white/5">
                    <div
                      className="h-full rounded-full flex items-center px-3 transition-all"
                      style={{ width: lvl.barWidth, background: lvl.color }}
                    >
                      <span className="text-xs font-bold text-white">{lvl.rate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-white">₦{lvl.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400">/sub</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 text-white shadow-lg"
              style={{ background: colors.orange }}
            >
              Start Building Your Network <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-2xl p-7 border bg-white/5 backdrop-blur-md border-white/10">
            <h3 className="text-white font-bold text-lg mb-6">Realistic Earning Scenario</h3>
            <div className="space-y-3 mb-6">
              {[
                { icon: '🧑‍💼', label: 'You refer 5 people', sub: '5 × ₦3,250 (65%)', value: '₦16,250', indent: 0 },
                { icon: '👥', label: 'They each refer 3 friends', sub: '15 × ₦750 (15%)', value: '₦11,250', indent: 1 },
                { icon: '🌐', label: 'Their network grows', sub: '30 × ₦250 (5%)', value: '₦7,500', indent: 2 },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5" style={{ marginLeft: `${row.indent * 18}px` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{row.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{row.label}</p>
                      <p className="text-xs text-gray-400">{row.sub}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: colors.green }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Total Monthly</p>
                <p className="text-[11px] text-gray-500">From just 3 levels</p>
              </div>
              <span className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.green }}>₦35,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.orange }}>Calculator</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>
              How Much Could You Earn?
            </h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Your Direct Referrals (Level 1)</p>
                    <p className="text-xs text-gray-400 mt-0.5">Each earns you ₦3,250/month</p>
                  </div>
                  <span className="text-2xl font-extrabold ml-4" style={{ color: colors.blue }}>{l1}</span>
                </div>
                <input type="range" min="1" max="50" value={l1} onChange={e => setL1(Number(e.target.value))} className="w-full h-2.5 rounded-full cursor-pointer appearance-none bg-gray-200" style={{ accentColor: colors.blue }} />
              </div>

              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">People Each Referral Invites</p>
                    <p className="text-xs text-gray-400 mt-0.5">Their subscribers earn you ₦750 each (Level 2)</p>
                  </div>
                  <span className="text-2xl font-extrabold ml-4" style={{ color: colors.green }}>{l2}</span>
                </div>
                <input type="range" min="1" max="20" value={l2} onChange={e => setL2(Number(e.target.value))} className="w-full h-2.5 rounded-full cursor-pointer appearance-none bg-gray-200" style={{ accentColor: colors.green }} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-8 text-center shadow-xl border border-gray-100 bg-[#F9FAFB]">
            <p className="text-gray-500 text-sm font-medium mb-1">Estimated Monthly Earnings</p>
            <div className="text-5xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.green }}>
              ₦{monthly.toLocaleString()}
            </div>
            
            <div className="space-y-3 mb-6 text-left bg-white p-5 rounded-xl border border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Level 1 (Direct) × {l1}</span>
                <span className="font-bold" style={{ color: colors.blue }}>₦{(l1 * 3250).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Level 2 (Network) × {l1 * l2}</span>
                <span className="font-bold" style={{ color: colors.green }}>₦{(l1 * l2 * 750).toLocaleString()}</span>
              </div>
            </div>

            <Link to="/register" className="block w-full py-4 rounded-xl font-bold text-white shadow-lg" style={{ background: colors.orange }}>
              Start Earning Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.green }}>Pricing</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.blue }}>
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Free */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Free Trial</h3>
              <div className="flex items-end gap-1 mt-3 mb-1">
                <span className="text-4xl font-extrabold text-gray-900">₦0</span>
                <span className="text-gray-400 pb-1">/ 7 days</span>
              </div>
              <p className="text-sm text-gray-400 mb-7">No card required. Cancel anytime.</p>
              <ul className="space-y-3.5 mb-8">
                {['Module 1 of all 5 courses', 'Intro video lessons', 'Affiliate program access'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600"><Check size={15} className="mt-0.5 shrink-0" style={{ color: colors.green }} strokeWidth={2.5} /> {f}</li>
                ))}
              </ul>
              <Link to="/register" className="block w-full text-center py-3.5 rounded-xl font-bold border-2" style={{ borderColor: colors.blue, color: colors.blue }}>
                Start Free Trial
              </Link>
            </div>

            {/* Premium */}
            <div className="rounded-3xl p-8 relative shadow-xl text-white md:-translate-y-4" style={{ backgroundColor: colors.blue }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-extrabold text-white" style={{ background: colors.orange }}>
                MOST POPULAR
              </div>
              <h3 className="text-lg font-extrabold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Premium</h3>
              <div className="flex items-end gap-1 mt-3 mb-1">
                <span className="text-4xl font-extrabold">₦5,000</span>
                <span className="text-white/50 pb-1">/ month</span>
              </div>
              <p className="text-sm text-white/50 mb-7">Unlock everything. Learn, earn, and scale.</p>
              <ul className="space-y-3.5 mb-8">
                {['All 5 courses — every module', 'Full 6-level affiliate program', '65% direct commission', 'Priority support'].map(text => (
                  <li key={text} className="flex items-start gap-2.5 text-sm text-white/90">
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: colors.green }} strokeWidth={2.5} /> {text}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full text-center py-3.5 rounded-xl font-bold text-white transition-all shadow-lg hover:-translate-y-0.5" style={{ background: colors.orange }}>
                Upgrade & Start Earning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-16 pb-8 px-4 text-gray-400" style={{ backgroundColor: '#0A1829' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="inline-block mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-2xl font-extrabold">
                  <span className="text-white">Sell</span><span style={{ color: colors.orange }}>iberation</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Empowering Nigerians through premium digital education and a revolutionary wealth-sharing affiliate network.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</p>
              <ul className="space-y-2.5 text-sm">
                {[['#courses', 'Courses'], ['#affiliate', 'Affiliate Program'], ['#pricing', 'Pricing']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</p>
              <ul className="space-y-2.5 text-sm">
                {[['#', 'About Us'], ['#', 'Contact'], ['#', 'Terms']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Selliberation.</p>
            <p>Built for the Nigerian Creator Economy 🇳🇬</p>
          </div>
        </div>
      </footer>
    </div>
  );
}