import { useState } from 'react';
import { Search, Download, DollarSign, Clock, CheckCircle } from 'lucide-react';

const commissions = [
  { id: 1, payer: 'John Doe', beneficiary: 'Sarah Miller', level: 1, amount: 3250, course: 'First ₦50k', status: 'withdrawable', date: '2026-03-25' },
  { id: 2, payer: 'Mike Johnson', beneficiary: 'Lisa Wong', level: 2, amount: 750, course: 'WhatsApp', status: 'pending', date: '2026-03-25' },
  { id: 3, payer: 'Emma Wilson', beneficiary: 'David Brown', level: 1, amount: 3250, course: 'Affiliate', status: 'withdrawn', date: '2026-03-24' },
  { id: 4, payer: 'James Chen', beneficiary: 'John Doe', level: 3, amount: 250, course: 'Reselling', status: 'withdrawable', date: '2026-03-24' },
  { id: 5, payer: 'Lisa Wong', beneficiary: 'Sarah Miller', level: 1, amount: 3250, course: 'First ₦50k', status: 'pending', date: '2026-03-23' },
];

const stats = [
  { label: 'Total Commissions', value: '₦2.4M', icon: DollarSign, color: 'green' },
  { label: 'Pending', value: '₦450K', icon: Clock, color: 'yellow' },
  { label: 'Withdrawable', value: '₦890K', icon: CheckCircle, color: 'blue' },
  { label: 'Paid Out', value: '₦1.1M', valueColor: 'text-gray-900', icon: DollarSign, color: 'purple' },
];

export default function AdminCommissions() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
          <p className="text-gray-500">Track all commission transactions</p>
        </div>
        <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={20} /> Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-600`} size={20} />
              </div>
              <span className="text-gray-500">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.valueColor || 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            {['all', 'pending', 'withdrawable', 'withdrawn'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                  filter === f ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Payer</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Beneficiary</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Course</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500">{commission.date}</td>
                  <td className="px-5 py-4 font-medium">{commission.payer}</td>
                  <td className="px-5 py-4 text-gray-500">{commission.beneficiary}</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Level {commission.level}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{commission.course}</td>
                  <td className="px-5 py-4 font-bold text-green-600">₦{commission.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                      commission.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      commission.status === 'withdrawable' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {commission.status === 'pending' && <Clock size={12} />}
                      {commission.status === 'withdrawable' && <CheckCircle size={12} />}
                      {commission.status === 'withdrawn' && <CheckCircle size={12} />}
                      {commission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
