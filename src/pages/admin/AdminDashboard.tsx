import { Link } from 'react-router-dom';
import { Users, DollarSign, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,458', change: '+12%', up: true, icon: Users },
  { label: 'Active Subscribers', value: '3,245', change: '+8%', up: true, icon: DollarSign },
  { label: 'Monthly Revenue', value: '₦16.2M', change: '+24%', up: true, icon: TrendingUp },
  { label: 'Pending Withdrawals', value: '₦450K', change: '-5%', up: false, icon: Wallet },
];

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', date: '2026-03-25', status: 'active' },
  { name: 'Sarah Miller', email: 'sarah@example.com', date: '2026-03-25', status: 'trial' },
  { name: 'Mike Johnson', email: 'mike@example.com', date: '2026-03-24', status: 'active' },
  { name: 'Lisa Wong', email: 'lisa@example.com', date: '2026-03-24', status: 'active' },
  { name: 'David Brown', email: 'david@example.com', date: '2026-03-23', status: 'trial' },
];

const recentPayments = [
  { user: 'John Doe', amount: 5000, date: '2026-03-25', status: 'success' },
  { user: 'Sarah Miller', amount: 5000, date: '2026-03-25', status: 'success' },
  { user: 'Mike Johnson', amount: 5000, date: '2026-03-24', status: 'success' },
  { user: 'Lisa Wong', amount: 5000, date: '2026-03-24', status: 'success' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of your platform's performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <stat.icon className="text-amber-600" size={24} />
              </div>
              <span className={`flex items-center gap-1 text-sm ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Signups</h2>
            <Link to="/admin/users" className="text-amber-600 hover:underline text-sm">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{user.date}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Trial'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Payments</h2>
            <Link to="/admin/commissions" className="text-amber-600 hover:underline text-sm">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentPayments.map((payment, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium">{payment.user}</td>
                    <td className="px-5 py-4 font-bold text-green-600">₦{payment.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-500">{payment.date}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
