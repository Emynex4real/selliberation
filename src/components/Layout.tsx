import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Users, DollarSign, Wallet,
  Settings, LogOut, Menu, X, Bell, ChevronRight, Clock, Zap,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const STAGE_NAMES = ['Starter', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/courses', icon: BookOpen, label: 'My Courses', end: false },
  { to: '/dashboard/referrals', icon: Users, label: 'Referral Hub', end: false },
  { to: '/dashboard/earnings', icon: DollarSign, label: 'Earnings', end: false },
  { to: '/dashboard/withdraw', icon: Wallet, label: 'Withdraw', end: false },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings', end: false },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, msg: 'Emeka subscribed via your link', time: '2m ago', type: 'commission', amount: '+₦3,250' },
  { id: 2, msg: 'Your ₦15,000 withdrawal was approved', time: '1h ago', type: 'withdrawal', amount: null },
  { id: 3, msg: 'Fatima earned you a Level 2 commission', time: '3h ago', type: 'commission', amount: '+₦750' },
];

export default function Layout() {
  const { user, logout, isTrialActive, trialDaysLeft } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const stageName = STAGE_NAMES[user?.stage ?? 0];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close notification panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F0F2F5' }}>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{ background: 'linear-gradient(180deg, #0D2847 0%, #08192E 100%)' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="text-xl font-extrabold tracking-tight">
            <span className="text-white">Sell</span>
            <span style={{ color: '#F5820A' }}>iberation</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Stage + status badges */}
        <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(245,130,10,0.18)', color: '#F5820A' }}>
            {stageName}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{
            background: isTrialActive ? 'rgba(28,185,87,0.18)' : 'rgba(28,185,87,0.25)',
            color: '#1CB957'
          }}>
            {isTrialActive ? 'Trial' : 'Premium'}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={({ isActive }) => isActive
                ? { background: 'rgba(28,185,87,0.15)', color: '#1CB957', borderLeft: '3px solid #1CB957' }
                : { color: 'rgba(255,255,255,0.6)' }
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} style={isActive ? { color: '#1CB957' } : {}} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={14} style={{ color: '#1CB957' }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Trial countdown */}
        {isTrialActive && (
          <div className="px-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="rounded-xl p-3.5" style={{ background: 'rgba(245,130,10,0.12)', border: '1px solid rgba(245,130,10,0.22)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} style={{ color: '#F5820A' }} />
                  <span className="text-xs font-semibold" style={{ color: '#F5820A' }}>Trial ends in {trialDaysLeft} day{trialDaysLeft !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(trialDaysLeft / 7) * 100}%`, background: 'linear-gradient(90deg, #F5820A, #FFB347)' }}
                />
              </div>
              <NavLink
                to="/dashboard/settings"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0D2847, #1CB957)' }}
              >
                <Zap size={12} /> Upgrade to Premium
              </NavLink>
            </div>
          </div>
        )}

        {/* User footer */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #F5820A, #FFB347)' }}
            >
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">{user?.name}</p>
              <p className="text-xs truncate leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors hover:bg-red-500/10"
            style={{ color: 'rgba(255,120,120,0.8)' }}
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 lg:left-64 z-20 bg-white/95 backdrop-blur-sm"
        style={{ borderBottom: '1px solid rgba(13,40,71,0.08)', height: '60px' }}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-full">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} />
            </button>
            {isTrialActive && (
              <div
                className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: '#FEF3E8', color: '#F5820A' }}
              >
                <Clock size={11} /> {trialDaysLeft}d left in trial
              </div>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(v => !v)}
                className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Bell size={19} />
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white"
                  style={{ background: '#F5820A' }}
                />
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <span className="font-bold text-gray-900 text-sm">Notifications</span>
                    <button className="text-xs font-semibold" style={{ color: '#1CB957' }}>Mark all read</button>
                  </div>
                  <div>
                    {MOCK_NOTIFICATIONS.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer" style={{ borderBottom: '1px solid #F9FAFB' }}>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: n.type === 'commission' ? '#F0FDF4' : '#FEF3E8' }}
                        >
                          {n.type === 'commission'
                            ? <DollarSign size={13} style={{ color: '#1CB957' }} />
                            : <Wallet size={13} style={{ color: '#F5820A' }} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium leading-snug">{n.msg}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                        {n.amount && (
                          <span className="text-xs font-bold shrink-0" style={{ color: '#1CB957' }}>{n.amount}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <button className="text-xs font-semibold text-gray-400 hover:text-gray-600">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* User avatar */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0D2847, #1CB957)' }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{user?.name}</p>
                <p className="text-[11px] text-gray-400 leading-tight">{stageName} Member</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="lg:ml-64 pt-15 min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

