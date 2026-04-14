import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, RefreshCw, Target } from 'lucide-react';

const mrrData = [
  { month: 'Oct', mrr: 8200000, churn: 3.2 },
  { month: 'Nov', mrr: 9800000, churn: 2.8 },
  { month: 'Dec', mrr: 11400000, churn: 2.1 },
  { month: 'Jan', mrr: 12900000, churn: 1.9 },
  { month: 'Feb', mrr: 14100000, churn: 1.7 },
  { month: 'Mar', mrr: 15600000, churn: 1.5 },
  { month: 'Apr', mrr: 16200000, churn: 1.4 },
];

const conversionData = [
  { month: 'Oct', trial: 320, converted: 210, rate: 65.6 },
  { month: 'Nov', trial: 390, converted: 280, rate: 71.8 },
  { month: 'Dec', trial: 450, converted: 340, rate: 75.6 },
  { month: 'Jan', trial: 510, converted: 410, rate: 80.4 },
  { month: 'Feb', trial: 580, converted: 490, rate: 84.5 },
  { month: 'Mar', trial: 630, converted: 560, rate: 88.9 },
  { month: 'Apr', trial: 680, converted: 620, rate: 91.2 },
];

const topAffiliates = [
  { name: 'James Chen', referrals: 25, earnings: 81250, stage: 5, growth: '+12%' },
  { name: 'Lisa Wong', referrals: 18, earnings: 58500, stage: 4, growth: '+8%' },
  { name: 'John Doe', referrals: 12, earnings: 39000, stage: 3, growth: '+15%' },
  { name: 'Emma Wilson', referrals: 7, earnings: 22750, stage: 2, growth: '+5%' },
  { name: 'Sarah Miller', referrals: 5, earnings: 16250, stage: 2, growth: '+3%' },
];

const revenueBySource = [
  { source: 'Organic', amount: 4860000 },
  { source: 'Referral L1', amount: 5670000 },
  { source: 'Referral L2', amount: 3240000 },
  { source: 'Referral L3+', amount: 2430000 },
];

const kpis = [
  { label: 'MRR', value: '₦16.2M', change: '+4%', up: true, icon: DollarSign, color: '#F5820A', bg: 'rgba(245,130,10,0.1)' },
  { label: 'Trial → Paid Rate', value: '91.2%', change: '+2.3%', up: true, icon: Target, color: '#1CB957', bg: 'rgba(28,185,87,0.1)' },
  { label: 'Churn Rate', value: '1.4%', change: '-0.1%', up: true, icon: TrendingDown, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Avg Revenue/User', value: '₦4,994', change: '+1.2%', up: true, icon: Users, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
];

const formatNaira = (v: number) => `₦${(v / 1000000).toFixed(1)}M`;

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Analytics
          </h1>
          <p className="text-gray-500 text-sm">Deep dive into platform performance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-50">
          <RefreshCw size={15} className="text-gray-500" /> Refresh
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: kpi.bg }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* MRR + Churn */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Monthly Recurring Revenue</h2>
            <p className="text-xs text-gray-500">MRR trend over the last 7 months</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mrrData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1CB957" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1CB957" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatNaira} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={52} />
              <Tooltip formatter={(val: number) => [`₦${val.toLocaleString()}`, 'MRR']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="mrr" stroke="#1CB957" strokeWidth={2.5} fill="url(#mrrGrad)" dot={{ fill: '#1CB957', r: 3 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Churn Rate (%)</h2>
            <p className="text-xs text-gray-500">Monthly subscriber churn — trending down</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mrrData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={28} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip formatter={(val: number) => [`${val}%`, 'Churn Rate']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Line type="monotone" dataKey="churn" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trial Conversion */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-gray-900 text-sm">Trial → Paid Conversion</h2>
            <p className="text-xs text-gray-500">How many trial users convert to paid subscribers each month</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#0D2847' }} /> Trial</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#F5820A' }} /> Converted</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={conversionData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
            <Bar dataKey="trial" fill="#0D2847" radius={[3, 3, 0, 0]} name="Trial Users" />
            <Bar dataKey="converted" fill="#F5820A" radius={[3, 3, 0, 0]} name="Converted" />
          </BarChart>
        </ResponsiveContainer>
        {/* Conversion rate badges */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {conversionData.map((d, i) => (
            <div key={i} className="shrink-0 text-center">
              <p className="text-xs text-gray-400">{d.month}</p>
              <p className="text-sm font-bold" style={{ color: d.rate >= 85 ? '#1CB957' : d.rate >= 70 ? '#F5820A' : '#EF4444' }}>
                {d.rate}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top affiliates + Revenue by source */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-sm">Top Affiliates</h2>
            <p className="text-xs text-gray-500">Ranked by total referral earnings</p>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['#', 'Affiliate', 'Referrals', 'Earnings', 'Growth'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topAffiliates.map((a, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3.5">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'text-yellow-600 bg-yellow-100' : i === 1 ? 'text-gray-500 bg-gray-100' : 'text-orange-500 bg-orange-50'}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#F5820A' }}>
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-gray-400">Stage {a.stage}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium">{a.referrals}</td>
                  <td className="px-5 py-3.5 text-sm font-bold" style={{ color: '#1CB957' }}>₦{a.earnings.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-green-600">{a.growth}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Revenue by Source</h2>
            <p className="text-xs text-gray-500">This month's breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueBySource} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" tickFormatter={(v: number) => `₦${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(val: number) => [`₦${val.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {revenueBySource.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#0D2847' : i === 1 ? '#F5820A' : i === 2 ? '#1CB957' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {revenueBySource.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{item.source}</span>
                <span className="font-semibold text-gray-900">
                  {((item.amount / revenueBySource.reduce((s, r) => s + r.amount, 0)) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
