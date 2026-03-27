import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Copy, TrendingUp, Users, DollarSign, BookOpen,
  ArrowRight, Zap, Clock, CheckCircle,
  Share2, ChevronRight,
} from 'lucide-react';
import {
  mockCommissions, mockReferralNetwork, mockCourses,
  mockDailyEarnings, mockCourseProgress, mockSubscriptions,
} from '../../data/mockData';

const LEVEL_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: '#F0FDF4', text: '#1CB957', label: 'L1' },
  2: { bg: '#FEF3E8', text: '#F5820A', label: 'L2' },
  3: { bg: '#E8F0F8', text: '#0D2847', label: 'L3' },
  4: { bg: '#FFF0F0', text: '#EF4444', label: 'L4' },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function Dashboard() {
  const { user, isTrialActive, trialDaysLeft } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://selliberation.com/register?ref=${user?.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `I'm earning real money learning digital skills on Selliberation! Join me free: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Earnings calculations
  const totalEarned = mockCommissions.reduce((s, c) => s + c.amount, 0);
  const withdrawable = mockCommissions.filter(c => c.status === 'withdrawable').reduce((s, c) => s + c.amount, 0);
  const pending = mockCommissions.filter(c => c.status === 'pending').reduce((s, c) => s + c.amount, 0);

  // Referral counts
  const level1Count = mockReferralNetwork.length;
  const level2Count = mockReferralNetwork.reduce((s, r) => s + (r.children?.length ?? 0), 0);

  // Chart
  const chartMax = Math.max(...mockDailyEarnings.map(d => d.amount), 1);

  // Recent activity (last 5 commissions)
  const recentActivity = [...mockCommissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  // Courses with subscriptions
  const enrolledCourses = mockCourses.filter(c =>
    mockSubscriptions.some(s => s.courseId === c.id && s.status === 'active')
  ).slice(0, 3);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-5">

      {/* ── TRIAL BANNER ── */}
      {isTrialActive && (
        <div className="rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ background: 'linear-gradient(135deg, #0D2847 0%, #1a3d63 100%)', border: '1px solid rgba(245,130,10,0.3)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,130,10,0.2)' }}>
              <Clock size={18} style={{ color: '#F5820A' }} />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Your free trial ends in {trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Upgrade to Premium to keep earning commissions and unlock all courses</p>
            </div>
          </div>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ background: '#F5820A' }}
          >
            <Zap size={14} /> Upgrade Now
          </Link>
        </div>
      )}

      {/* ── GREETING ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {greeting()}, {user?.name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Here's what's happening with your earnings today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ background: '#F0FDF4', color: '#1CB957' }}>
          <CheckCircle size={13} /> Active
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Earned',
            value: `₦${totalEarned.toLocaleString()}`,
            icon: DollarSign,
            iconBg: 'linear-gradient(135deg, #0D2847, #1a3d63)',
            iconColor: 'white',
            trend: '+12% this week',
            trendUp: true,
          },
          {
            label: 'Withdrawable',
            value: `₦${withdrawable.toLocaleString()}`,
            icon: Zap,
            iconBg: 'linear-gradient(135deg, #1CB957, #34D399)',
            iconColor: 'white',
            trend: 'Ready to withdraw',
            trendUp: true,
          },
          {
            label: 'Pending',
            value: `₦${pending.toLocaleString()}`,
            icon: Clock,
            iconBg: 'linear-gradient(135deg, #F5820A, #FFB347)',
            iconColor: 'white',
            trend: 'Processing 24–48h',
            trendUp: null,
          },
          {
            label: 'My Network',
            value: `${level1Count + level2Count}`,
            icon: Users,
            iconBg: 'linear-gradient(135deg, #E8F0F8, #C8D8EC)',
            iconColor: '#0D2847',
            trend: `${level1Count} direct · ${level2Count} L2`,
            trendUp: true,
          },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{card.label}</span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.iconBg }}>
                <card.icon size={17} color={card.iconColor} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {card.value}
            </p>
            <p className="text-xs font-medium" style={{ color: card.trendUp === true ? '#1CB957' : card.trendUp === false ? '#EF4444' : '#F5820A' }}>
              {card.trend}
            </p>
          </div>
        ))}
      </div>

      {/* ── EARNINGS CHART + ACTIVITY FEED ── */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* Earnings bar chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">Earnings — Last 7 Days</h2>
              <p className="text-xs text-gray-400 mt-0.5">Daily commission income</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#1CB957' }}>
              <TrendingUp size={14} /> +34% vs last week
            </div>
          </div>
          <div className="flex items-end gap-2 h-36">
            {mockDailyEarnings.map((d, i) => {
              const pct = (d.amount / chartMax) * 100;
              const isToday = i === mockDailyEarnings.length - 1;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-400">
                    {d.amount > 0 ? `₦${(d.amount / 1000).toFixed(1)}k` : ''}
                  </span>
                  <div className="w-full rounded-t-lg transition-all relative group" style={{
                    height: `${Math.max(pct, 4)}%`,
                    background: isToday
                      ? 'linear-gradient(to top, #0D2847, #1CB957)'
                      : d.amount > 0 ? 'rgba(13,40,71,0.15)' : 'rgba(0,0,0,0.04)',
                    minHeight: '4px',
                  }} />
                  <span className="text-[10px] text-gray-400 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
            <h2 className="font-bold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((c) => {
              const lvl = LEVEL_COLORS[c.level] ?? LEVEL_COLORS[1];
              return (
                <div key={c.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: lvl.bg, color: lvl.text }}>
                    {lvl.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{c.payerName}</p>
                    <p className="text-xs text-gray-400">{timeAgo(c.createdAt)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color: '#1CB957' }}>+₦{c.amount.toLocaleString()}</p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        background: c.status === 'withdrawable' ? '#F0FDF4' : c.status === 'pending' ? '#FEF3E8' : '#F3F4F6',
                        color: c.status === 'withdrawable' ? '#1CB957' : c.status === 'pending' ? '#F5820A' : '#6B7280',
                      }}>
                      {c.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-3" style={{ borderTop: '1px solid #F3F4F6' }}>
            <Link to="/dashboard/earnings" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#0D2847' }}>
              View full history <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── REFERRAL LINK + QUICK ACTIONS ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Referral card */}
        <div className="rounded-2xl p-5 shadow-sm" style={{ background: 'linear-gradient(135deg, #0D2847 0%, #112e52 100%)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-white">Your Referral Link</h2>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(28,185,87,0.2)', color: '#1CB957' }}>
              {user?.referralCode}
            </span>
          </div>
          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Share this link — earn up to 65% on every person who subscribes.
          </p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 rounded-xl px-3 py-2.5 text-xs text-white min-w-0"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0"
              style={{ background: copied ? '#1CB957' : 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#25D366' }}
          >
            <Share2 size={15} /> Share on WhatsApp
          </button>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/dashboard/courses', icon: BookOpen, label: 'My Courses', sub: `${mockSubscriptions.length} active`, bg: '#E8F0F8', color: '#0D2847' },
              { to: '/dashboard/referrals', icon: Users, label: 'Referral Hub', sub: `${level1Count + level2Count} in network`, bg: '#F0FDF4', color: '#1CB957' },
              { to: '/dashboard/earnings', icon: TrendingUp, label: 'Earnings', sub: `₦${totalEarned.toLocaleString()} total`, bg: '#FEF3E8', color: '#F5820A' },
              { to: '/dashboard/withdraw', icon: DollarSign, label: 'Withdraw', sub: `₦${withdrawable.toLocaleString()} ready`, bg: '#FFF0F0', color: '#EF4444' },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-sm"
                style={{ background: a.bg }}
              >
                <a.icon size={18} style={{ color: a.color, flexShrink: 0 }} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{a.label}</p>
                  <p className="text-xs truncate" style={{ color: a.color }}>{a.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── COURSE PROGRESS ── */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h2 className="font-bold text-gray-900">Continue Learning</h2>
          <Link to="/dashboard/courses" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#0D2847' }}>
            All courses <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {enrolledCourses.map((course) => {
            const progress = mockCourseProgress[course.id] ?? 0;
            return (
              <Link key={course.id} to={`/dashboard/courses/${course.slug}`} className="flex gap-4 p-5 hover:bg-gray-50 transition-colors">
                <img src={course.thumbnail} alt={course.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{progress}% complete</span>
                    <span className="text-xs font-semibold" style={{ color: progress > 50 ? '#1CB957' : '#F5820A' }}>{progress > 0 ? 'In progress' : 'Not started'}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        background: progress > 50 ? 'linear-gradient(90deg, #0D2847, #1CB957)' : 'linear-gradient(90deg, #F5820A, #FFB347)',
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── REFERRAL NETWORK SUMMARY ── */}
      <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Referral Network Summary</h2>
          <Link to="/dashboard/referrals" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#0D2847' }}>
            Full tree <ChevronRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { level: 1, count: level1Count, rate: '65%', amount: '₦3,250', color: '#0D2847' },
            { level: 2, count: level2Count, rate: '15%', amount: '₦750', color: '#1CB957' },
            { level: 3, count: 2, rate: '5%', amount: '₦250', color: '#F5820A' },
            { level: 4, count: 0, rate: '3%', amount: '₦150', color: '#3B82F6' },
            { level: 5, count: 0, rate: '2%', amount: '₦100', color: '#8B5CF6' },
            { level: 6, count: 0, rate: '1%', amount: '₦50', color: '#EC4899' },
          ].map((l) => (
            <div key={l.level} className="text-center p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
              <div className="text-lg font-extrabold" style={{ color: l.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l.count}</div>
              <div className="text-[11px] font-semibold text-gray-500">Level {l.level}</div>
              <div className="text-[10px] text-gray-400">{l.rate} · {l.amount}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
