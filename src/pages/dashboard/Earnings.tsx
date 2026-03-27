import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Clock, CheckCircle, Trophy, Download, ArrowRight } from 'lucide-react';
import { mockCommissions, mockDailyEarnings } from '../../data/mockData';

type FilterType = 'all' | 'pending' | 'withdrawable' | 'withdrawn';

const LEVEL_META: Record<number, { color: string; bg: string; rate: string }> = {
  1: { color: '#0D2847', bg: '#E8F0F8', rate: '65%' },
  2: { color: '#1CB957', bg: '#F0FDF4', rate: '15%' },
  3: { color: '#F5820A', bg: '#FEF3E8', rate: '5%' },
  4: { color: '#3B82F6', bg: '#EFF6FF', rate: '3%' },
  5: { color: '#8B5CF6', bg: '#F5F3FF', rate: '2%' },
  6: { color: '#EC4899', bg: '#FDF2F8', rate: '1%' },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Earnings() {
  const [filter, setFilter] = useState<FilterType>('all');

  const totalEarned = mockCommissions.reduce((s, c) => s + c.amount, 0);
  const pending = mockCommissions.filter(c => c.status === 'pending').reduce((s, c) => s + c.amount, 0);
  const withdrawable = mockCommissions.filter(c => c.status === 'withdrawable').reduce((s, c) => s + c.amount, 0);
  const withdrawn = mockCommissions.filter(c => c.status === 'withdrawn').reduce((s, c) => s + c.amount, 0);

  const filtered = filter === 'all' ? mockCommissions : mockCommissions.filter(c => c.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Level breakdown
  const levelBreakdown = [1, 2, 3, 4].map(lvl => ({
    level: lvl,
    count: mockCommissions.filter(c => c.level === lvl).length,
    amount: mockCommissions.filter(c => c.level === lvl).reduce((s, c) => s + c.amount, 0),
    ...LEVEL_META[lvl],
  }));

  const chartMax = Math.max(...mockDailyEarnings.map(d => d.amount), 1);

  const leaderboard = [
    { rank: 1, name: 'Chiamaka O.', earnings: 125000, referrals: 45 },
    { rank: 2, name: 'Sarah M.', earnings: 98000, referrals: 38 },
    { rank: 3, name: 'Mike R.', earnings: 87000, referrals: 32 },
    { rank: 4, name: 'You', earnings: totalEarned, referrals: 5, isUser: true },
    { rank: 5, name: 'Lisa K.', earnings: 45000, referrals: 18 },
  ];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Earnings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track your commissions across all 6 levels</p>
        </div>
        <button
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-gray-100"
          style={{ background: 'white', color: '#0D2847', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Earned', value: `₦${totalEarned.toLocaleString()}`, icon: DollarSign, gradient: 'linear-gradient(135deg, #0D2847, #1a3d63)', desc: 'All time commissions' },
          { label: 'Withdrawable', value: `₦${withdrawable.toLocaleString()}`, icon: CheckCircle, gradient: 'linear-gradient(135deg, #1CB957, #34D399)', desc: 'Available now' },
          { label: 'Pending', value: `₦${pending.toLocaleString()}`, icon: Clock, gradient: 'linear-gradient(135deg, #F5820A, #FFB347)', desc: 'Processing 24–48h' },
          { label: 'Withdrawn', value: `₦${withdrawn.toLocaleString()}`, icon: TrendingUp, gradient: 'linear-gradient(135deg, #6B7280, #9CA3AF)', desc: 'Paid out' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{card.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.gradient }}>
                <card.icon size={15} color="white" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Chart + Level Breakdown */}
      <div className="grid lg:grid-cols-5 gap-5">

        {/* 7-day chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">7-Day Earnings</h2>
              <p className="text-xs text-gray-400 mt-0.5">Daily commission totals</p>
            </div>
            <span className="text-xs font-semibold" style={{ color: '#1CB957' }}>₦{mockDailyEarnings.reduce((s, d) => s + d.amount, 0).toLocaleString()} this week</span>
          </div>
          <div className="flex items-end gap-2 h-40 mb-2">
            {mockDailyEarnings.map((d, i) => {
              const pct = (d.amount / chartMax) * 100;
              const isToday = i === mockDailyEarnings.length - 1;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium text-gray-400">
                    {d.amount > 0 ? `₦${(d.amount / 1000).toFixed(1)}k` : ''}
                  </span>
                  <div className="w-full rounded-t-lg" style={{
                    height: `${Math.max(pct, 3)}%`,
                    background: isToday
                      ? 'linear-gradient(to top, #0D2847, #1CB957)'
                      : d.amount > 0 ? 'rgba(13,40,71,0.15)' : 'rgba(0,0,0,0.04)',
                    minHeight: '4px',
                  }} />
                  <span className="text-[10px] font-medium text-gray-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Level breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
          <h2 className="font-bold text-gray-900 mb-4">By Commission Level</h2>
          <div className="space-y-3">
            {levelBreakdown.map((l) => (
              <div key={l.level}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: l.bg, color: l.color }}>L{l.level}</span>
                    <span className="text-xs text-gray-500">{l.rate} · {l.count} commission{l.count !== 1 ? 's' : ''}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: l.color }}>₦{l.amount.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: totalEarned > 0 ? `${(l.amount / totalEarned) * 100}%` : '0%',
                      background: l.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #F3F4F6' }}>
            <Link to="/dashboard/referrals" className="text-xs font-semibold flex items-center gap-1" style={{ color: '#0D2847' }}>
              View referral network <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h2 className="font-bold text-gray-900">Transaction History</h2>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'withdrawable', 'withdrawn'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                style={filter === f
                  ? { background: '#0D2847', color: 'white' }
                  : { background: '#F3F4F6', color: '#6B7280' }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: '#F8FAFC' }}>
              <tr>
                {['Date', 'From', 'Level', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((c) => {
                const meta = LEVEL_META[c.level] ?? LEVEL_META[1];
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-gray-500">{timeAgo(c.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: meta.bg, color: meta.color }}>
                          {c.payerName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{c.payerName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: meta.bg, color: meta.color }}>
                        Level {c.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-bold" style={{ color: '#1CB957' }}>
                      +₦{c.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{
                          background: c.status === 'withdrawable' ? '#F0FDF4' : c.status === 'pending' ? '#FEF3E8' : '#F3F4F6',
                          color: c.status === 'withdrawable' ? '#1CB957' : c.status === 'pending' ? '#F5820A' : '#6B7280',
                        }}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-gray-400">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <Trophy size={18} style={{ color: '#F5820A' }} />
          <h2 className="font-bold text-gray-900">Earnings Leaderboard</h2>
          <span className="ml-auto text-xs text-gray-400">March 2026</span>
        </div>
        <div className="divide-y divide-gray-50">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-4 px-5 py-3.5"
              style={entry.isUser ? { background: 'rgba(13,40,71,0.03)' } : {}}
            >
              <span className="text-lg w-8 text-center shrink-0">
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : <span className="text-sm font-bold text-gray-400">#{entry.rank}</span>}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {entry.name} {entry.isUser && <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: '#E8F0F8', color: '#0D2847' }}>You</span>}
                </p>
                <p className="text-xs text-gray-400">{entry.referrals} referrals</p>
              </div>
              <span className="text-sm font-bold" style={{ color: '#1CB957' }}>₦{entry.earnings.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
