import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Play, Award, DollarSign,
  BookOpen, ChevronRight, Menu, X, UserPlus, Lock
} from 'lucide-react';

const COURSES = [
  {
    title: "Make Your First ₦10k–₦50k Online",
    desc: "The proven beginner playbook. No hype — just systems that actually work in Nigeria today.",
    modules: 8, lessons: 24,
    tag: "Most Popular",
    tagStyle: { background: '#FFF0E5', color: '#FF7A00' },
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
  },
  {
    title: "WhatsApp Monetization Mastery",
    desc: "Turn your WhatsApp status, channels, and broadcast lists into a consistent cash machine.",
    modules: 6, lessons: 18,
    tag: "Trending",
    tagStyle: { background: '#EAF0F6', color: '#0F2942' },
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop",
  },
  {
    title: "Affiliate Marketing from Scratch",
    desc: "Pick the right niches, set up your funnels, and close commissions every single day.",
    modules: 5, lessons: 15,
    tag: "Beginner Friendly",
    tagStyle: { background: '#FFF0E5', color: '#FF7A00' },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

const COMMISSION_LEVELS = [
  { level: 1, label: 'Direct Referral', rate: '65%', amount: 3250, barWidth: '100%', color: '#FF7A00' },
  { level: 2, label: 'Their Referral', rate: '15%', amount: 750, barWidth: '60%', color: '#EAF0F6' },
  { level: 3, label: '3rd Generation', rate: '5%', amount: 250, barWidth: '40%', color: '#B8CADA' },
  { level: 4, label: '4th Generation', rate: '3%', amount: 150, barWidth: '28%', color: '#88A3BD' },
  { level: 5, label: '5th Generation', rate: '2%', amount: 100, barWidth: '18%', color: '#5B7C9D' },
  { level: 6, label: '6th Generation', rate: '1%', amount: 50, barWidth: '10%', color: '#325475' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [l1, setL1] = useState(10);
  const [l2, setL2] = useState(5);

  const monthly = l1 * 3250 + l1 * l2 * 750;

  // STRICT COLOR HIERARCHY (Dark Mode Default)
  const colors = {
    primary: '#0F2942',      // Background Navy Blue
    accent: '#FF7A00',       // Orange CTAs & Accents
    cardBg: '#FFFDFB',       // Warm White for floating cards
    cardText: '#0F2942',     // Dark text inside white cards
    mutedText: '#829AB1'     // Light gray/blue text for dark backgrounds
  };

  return (
    <div className="min-h-screen selection:bg-[#FF7A00] selection:text-white font-sans text-white relative" style={{ backgroundColor: colors.primary }}>

      {/* Global Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.15] pointer-events-none blur-[120px]" style={{ background: colors.accent }} />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.15] pointer-events-none blur-[120px]" style={{ background: '#3B82F6' }} />

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0F2942]/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">Sell</span><span style={{ color: colors.accent }}>iberation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-blue-100/70">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#courses" className="hover:text-white transition-colors">Courses</a>
            <a href="#affiliate" className="hover:text-white transition-colors">Earn</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-sm font-bold text-white hover:opacity-70 transition-colors">Log in</Link>
            <Link
              to="/register"
              className="text-sm font-bold text-white px-6 py-3 rounded-xl shadow-[0_4px_20px_-4px_rgba(255,122,0,0.5)] hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: colors.accent }}
            >
              Start Free Trial
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1 shadow-2xl absolute w-full" style={{ backgroundColor: colors.primary }}>
            {[['#how-it-works', 'How It Works'], ['#courses', 'Courses'], ['#affiliate', 'Earn'], ['#pricing', 'Pricing']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-lg text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                {label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-center py-3 rounded-xl text-sm font-bold border border-white/20 text-white">Log in</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-center py-3 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: colors.accent }}>
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase mb-8 border border-[#FF7A00]/30 bg-[#FF7A00]/10" style={{ color: colors.accent }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full opacity-75" style={{ backgroundColor: colors.accent }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: colors.accent }} />
              </span>
              10,000+ Nigerians already earning
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold leading-[1.1] mb-6 tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Learn Skills.<br/>
              <span style={{ color: colors.accent }}>Earn Money.</span>
            </h1>

            <p className="text-lg mb-10 leading-relaxed max-w-lg text-blue-100/70">
              Nigeria's premier platform where mastering digital skills and building a passive income network happen simultaneously. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-base transition-all hover:-translate-y-1 shadow-[0_8px_25px_-5px_rgba(255,122,0,0.5)]"
                style={{ backgroundColor: colors.accent }}
              >
                Start 7-Day Free Trial <ArrowRight size={20} />
              </Link>
              <a
                href="#courses"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border border-[#FF7A00] transition-all hover:bg-[#FF7A00]/10"
                style={{ color: colors.accent }}
              >
                <Play size={18} fill="currentColor" /> Explore Courses
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-blue-100/60">
              {['No credit card required', 'Cancel anytime', 'Instant access'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={18} strokeWidth={3} className="text-white" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Mockup (White Card) */}
          <div className="relative mx-auto w-full max-w-[450px]">
            <div className="rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform md:rotate-2 hover:rotate-0 transition-transform duration-500" style={{ backgroundColor: colors.cardBg }}>
              {/* Fake Browser header */}
              <div className="flex items-center gap-2 px-5 pt-5 pb-3 border-b border-gray-100 bg-[#F9FAFB]">
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="w-3 h-3 rounded-full bg-gray-300" />
              </div>

              <div className="p-8 space-y-6 text-[#111827]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Earnings</p>
                    <p className="text-4xl font-extrabold tracking-tight" style={{ color: colors.cardText }}>₦145,250</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#FFF0E5]" style={{ color: colors.accent }}>
                    +32% this week
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Commissions</p>
                  {[
                    { name: 'Emeka joined via you', time: '2 min ago', amount: '+₦3,250', lvl: 'Level 1' },
                    { name: 'Fatimah joined via Emeka', time: '1 hr ago', amount: '+₦750', lvl: 'Level 2' },
                    { name: 'Bayo joined via Fatimah', time: '3 hrs ago', amount: '+₦250', lvl: 'Level 3' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: i === 0 ? colors.accent : colors.primary }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{c.time} · <span style={{ color: colors.accent }}>{c.lvl}</span></p>
                        </div>
                      </div>
                      <p className="text-sm font-extrabold" style={{ color: colors.cardText }}>{c.amount}</p>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-4 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 mt-4 shadow-lg" style={{ backgroundColor: colors.primary }}>
                  Withdraw to Bank
                </button>
              </div>
            </div>

            {/* Floating Notification */}
            <div className="absolute -bottom-6 -left-8 rounded-2xl p-4 shadow-xl border border-gray-100 animate-bounce" style={{ backgroundColor: colors.cardBg, animationDuration: '3s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FFF0E5]">
                  <DollarSign size={24} style={{ color: colors.accent }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payout Sent</p>
                  <p className="text-sm font-extrabold" style={{ color: colors.cardText }}>₦35,000 to GTBank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR (White Cards) ── */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Active Learners' },
              { value: '₦50M+', label: 'Commissions Paid' },
              { value: '5', label: 'Premium Courses' },
              { value: '4.9 / 5', label: 'Member Rating' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-8 text-center shadow-lg transform hover:-translate-y-1 transition-all" style={{ backgroundColor: colors.cardBg }}>
                <div className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.accent }}>{s.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (White Cards) ── */}
      <section id="how-it-works" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 text-white">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-8 mb-4 tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              From Zero to Earning in 3 Steps
            </h2>
            <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
              No technical skills needed. Follow our proven system to learn high-demand skills and monetize your network immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', Icon: UserPlus, title: 'Create Free Account', desc: 'Sign up in 60 seconds. Get immediate access to your dashboard and Module 1 of all courses.' },
              { num: '2', Icon: BookOpen, title: 'Learn Practical Skills', desc: 'Watch expert-led video lessons on WhatsApp monetization, affiliate marketing, and more.' },
              { num: '3', Icon: DollarSign, title: 'Earn Commissions', desc: 'Share your referral link. Earn up to 65% on every subscriber, cascading 6 levels deep.' },
            ].map((s, i) => (
              <div key={i} className="rounded-3xl p-8 shadow-xl transition-all group hover:-translate-y-2" style={{ backgroundColor: colors.cardBg }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110" style={{ backgroundColor: colors.primary }}>
                  <s.Icon size={36} className="text-white" />
                </div>
                <div className="text-xs font-extrabold mb-3 uppercase tracking-widest" style={{ color: colors.accent }}>Step 0{s.num}</div>
                <h3 className="text-2xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.cardText }}>{s.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE / EARNING SYSTEM ── */}
      <section id="affiliate" className="py-24 px-4 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-extrabold uppercase tracking-widest border border-[#FF7A00]/30 bg-[#FF7A00]/10" style={{ color: colors.accent }}>
              <Award size={16} /> Deep Affiliate Structure
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Earn Up to 65% Commission — <br/>
              <span style={{ color: colors.accent }}>6 Levels Deep.</span>
            </h2>
            <p className="text-blue-100/70 text-lg mb-10 leading-relaxed max-w-xl">
              Don't just sell once. Build a network. When your referrals subscribe, you earn. When they bring people in, you still earn.
            </p>

            <div className="space-y-4 mb-10 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
              {COMMISSION_LEVELS.map(lvl => (
                <div key={lvl.level} className="flex items-center gap-4">
                  <div className="text-sm font-bold text-white/50 w-6 shrink-0">L{lvl.level}</div>
                  <div className="flex-1 rounded-full h-10 overflow-hidden bg-white/10">
                    <div
                      className="h-full rounded-full flex items-center px-4 relative overflow-hidden"
                      style={{ width: lvl.barWidth, backgroundColor: lvl.level === 1 ? colors.accent : 'rgba(255,255,255,0.8)' }}
                    >
                      <span className="text-xs font-extrabold relative z-10" style={{ color: lvl.level === 1 ? '#FFFFFF' : colors.primary }}>{lvl.rate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 w-20">
                    <div className="text-sm font-extrabold text-white">₦{lvl.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-xl font-bold transition-all hover:-translate-y-1 text-white shadow-lg"
              style={{ backgroundColor: colors.accent }}
            >
              Start Building Your Network <ArrowRight size={18} />
            </Link>
          </div>

          {/* Scenario White Card */}
          <div className="rounded-3xl p-8 lg:p-12 shadow-2xl relative" style={{ backgroundColor: colors.cardBg }}>
            <h3 className="font-extrabold text-2xl mb-8" style={{ color: colors.cardText }}>Realistic Earning Scenario</h3>
            <div className="space-y-4 mb-8">
              {[
                { icon: '🚀', label: 'You refer 5 people', sub: '5 × ₦3,250 (65%)', value: '₦16,250', indent: 0 },
                { icon: '👥', label: 'They each refer 3 friends', sub: '15 × ₦750 (15%)', value: '₦11,250', indent: 1 },
                { icon: '🌐', label: 'Their network grows', sub: '30 × ₦250 (5%)', value: '₦7,500', indent: 2 },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-[#F9FAFB]" style={{ marginLeft: `${row.indent * 20}px` }}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-sm border border-gray-100">{row.icon}</span>
                    <div>
                      <p className="font-bold" style={{ color: colors.cardText }}>{row.label}</p>
                      <p className="text-xs font-medium text-gray-500">{row.sub}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-lg" style={{ color: colors.cardText }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-extrabold text-gray-500 uppercase tracking-widest mb-1">Total Monthly</p>
                <p className="text-xs font-medium text-gray-400">From just 3 levels</p>
              </div>
              <span className="text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.accent }}>₦35,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR (White Card Layout) ── */}
      <section className="py-24 px-4 relative z-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Calculate Your Potential
            </h2>
            <p className="text-blue-100/70 text-lg mb-10">Use the sliders below to see how quickly your income can compound using our network system.</p>
            
            <div className="space-y-10">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-white">Your Direct Referrals (L1)</p>
                    <p className="text-sm font-medium text-blue-100/50 mt-1">Each earns you ₦3,250/month</p>
                  </div>
                  <span className="text-3xl font-extrabold bg-white/10 px-5 py-2 rounded-xl text-white border border-white/20">{l1}</span>
                </div>
                <input type="range" min="1" max="50" value={l1} onChange={e => setL1(Number(e.target.value))} className="w-full h-3 rounded-full cursor-pointer appearance-none bg-white/20" style={{ accentColor: colors.accent }} />
              </div>

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-white">Referrals per person (L2)</p>
                    <p className="text-sm font-medium text-blue-100/50 mt-1">Each earns you ₦750/month</p>
                  </div>
                  <span className="text-3xl font-extrabold bg-white/10 px-5 py-2 rounded-xl text-white border border-white/20">{l2}</span>
                </div>
                <input type="range" min="1" max="20" value={l2} onChange={e => setL2(Number(e.target.value))} className="w-full h-3 rounded-full cursor-pointer appearance-none bg-white/20" style={{ accentColor: colors.accent }} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-10 lg:p-12 text-center shadow-2xl" style={{ backgroundColor: colors.cardBg }}>
            <p className="text-gray-400 font-extrabold uppercase tracking-widest mb-3">Estimated Monthly Income</p>
            <div className="text-6xl font-extrabold mb-8 tracking-tighter" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: colors.accent }}>
              ₦{monthly.toLocaleString()}
            </div>
            
            <div className="space-y-3 mb-10 text-left bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 text-[#0F2942]">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">Level 1 (Direct)</span>
                <span className="font-extrabold text-lg">₦{(l1 * 3250).toLocaleString()}</span>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">Level 2 (Network)</span>
                <span className="font-extrabold text-lg">₦{(l1 * l2 * 750).toLocaleString()}</span>
              </div>
            </div>

            <Link to="/register" className="block w-full py-5 rounded-xl font-bold text-white shadow-xl transition-transform hover:-translate-y-1" style={{ backgroundColor: colors.primary }}>
              Start Earning Today →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-20 pb-10 px-4 border-t border-white/10 relative z-10" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link to="/" className="inline-block mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="text-3xl font-extrabold tracking-tight">
                  <span className="text-white">Sell</span><span style={{ color: colors.accent }}>iberation</span>
                </span>
              </Link>
              <p className="text-blue-100/60 max-w-sm leading-relaxed text-lg font-medium">
                Empowering Nigerians through premium digital education and a revolutionary wealth-sharing affiliate network.
              </p>
            </div>
            <div>
              <p className="text-white font-extrabold mb-6 tracking-widest uppercase text-xs">Platform</p>
              <ul className="space-y-4 text-blue-100/60 font-bold">
                {[['#how-it-works', 'How it Works'], ['#affiliate', 'Affiliate Program'], ['#pricing', 'Pricing']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-extrabold mb-6 tracking-widest uppercase text-xs">Company</p>
              <ul className="space-y-4 text-blue-100/60 font-bold">
                {[['#', 'About Us'], ['#', 'Contact Support'], ['#', 'Terms & Privacy']].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-100/40 font-bold text-sm">
            <p>© {new Date().getFullYear()} Selliberation.</p>
            <p className="flex items-center gap-2">Built for the Nigerian Creator Economy <span className="text-lg">🇳🇬</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}