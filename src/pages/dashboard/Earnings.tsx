import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle, Trophy } from 'lucide-react';
import { mockCommissions } from '../../data/mockData';

export default function Earnings() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'withdrawable' | 'withdrawn'>('all');

  const totalEarned = mockCommissions.reduce((sum, c) => sum + c.amount, 0);
  const pending = mockCommissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
  const withdrawable = mockCommissions.filter(c => c.status === 'withdrawable').reduce((sum, c) => sum + c.amount, 0);
  const withdrawn = mockCommissions.filter(c => c.status === 'withdrawn').reduce((sum, c) => sum + c.amount, 0);

  const filteredCommissions = filter === 'all' 
    ? mockCommissions 
    : mockCommissions.filter(c => c.status === filter);

  const leaderboard = [
    { rank: 1, name: 'John D.', earnings: 125000, referrals: 45 },
    { rank: 2, name: 'Sarah M.', earnings: 98000, referrals: 38 },
    { rank: 3, name: 'Mike R.', earnings: 87000, referrals: 32 },
    { rank: 4, name: 'You', earnings: totalEarned, referrals: 5, isUser: true },
    { rank: 5, name: 'Lisa K.', earnings: 45000, referrals: 18 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-500">Track your commissions and revenue</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={20} />
            </div>
            <span className="text-gray-500">Total Earned</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{totalEarned.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <span className="text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{pending.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <span className="text-gray-500">Withdrawable</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{withdrawable.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-purple-600" size={20} />
            </div>
            <span className="text-gray-500">Withdrawn</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{withdrawn.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold">Transaction History</h2>
          <div className="flex gap-2">
            {(['all', 'pending', 'withdrawable', 'withdrawn'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                  filter === f 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Source</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Course</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500">{new Date(commission.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 font-medium">User {commission.payerId}</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Level {commission.level}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">Course {commission.courseId}</td>
                  <td className="px-5 py-4 font-bold text-green-600">₦{commission.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-sm capitalize ${
                      commission.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      commission.status === 'withdrawable' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {commission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="text-amber-500" size={20} /> Leaderboard
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Rank</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Referrals</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboard.map((user) => (
                <tr key={user.rank} className={`hover:bg-gray-50 ${user.isUser ? 'bg-amber-50' : ''}`}>
                  <td className="px-5 py-4">
                    <span className={`font-bold ${user.rank <= 3 ? 'text-amber-500' : ''}`}>
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{user.name} {user.isUser && '(You)'}</td>
                  <td className="px-5 py-4 text-gray-500">{user.referrals}</td>
                  <td className="px-5 py-4 font-bold text-green-600">₦{user.earnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
