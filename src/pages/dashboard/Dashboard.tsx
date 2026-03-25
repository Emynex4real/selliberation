import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Copy, TrendingUp, Users, DollarSign, BookOpen, ArrowRight, Gift } from 'lucide-react';
import { mockCommissions, mockSubscriptions, mockCourses } from '../../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://selliberation.com/register?ref=${user?.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = mockCommissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingEarnings = mockCommissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
  const withdrawable = mockCommissions.filter(c => c.status === 'withdrawable').reduce((sum, c) => sum + c.amount, 0);
  const activeSubscriptions = mockSubscriptions.filter(s => s.status === 'active').length;

  const stageLabels = ['Starter', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello {user?.name} 👋</h1>
          <p className="text-gray-500">Welcome to your dashboard</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg">
          <Gift className="text-amber-500" size={20} />
          <span className="font-semibold text-amber-700">{stageLabels[user?.stage || 0]}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <TrendingUp className="text-yellow-600" size={20} />
            </div>
            <span className="text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{pendingEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <span className="text-gray-500">Withdrawable</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{withdrawable.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-purple-600" size={20} />
            </div>
            <span className="text-gray-500">Active Courses</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Your Referral Link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Referral Code: <span className="font-mono font-bold text-amber-600">{user?.referralCode}</span></p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/dashboard/courses" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <BookOpen className="text-blue-600" size={20} />
              <span className="font-medium">My Courses</span>
            </Link>
            <Link to="/dashboard/referrals" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="text-purple-600" size={20} />
              <span className="font-medium">View Referrals</span>
            </Link>
            <Link to="/dashboard/earnings" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <TrendingUp className="text-green-600" size={20} />
              <span className="font-medium">Earnings</span>
            </Link>
            <Link to="/dashboard/withdraw" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <DollarSign className="text-amber-600" size={20} />
              <span className="font-medium">Withdraw</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Your Courses</h2>
          <Link to="/dashboard/courses" className="text-amber-600 hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {mockCourses.slice(0, 3).map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-gray-500">{course.modules.length} Modules</p>
                <Link to={`/dashboard/courses/${course.slug}`} className="mt-3 block text-center bg-gray-100 hover:bg-gray-200 py-2 rounded text-sm font-medium">
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
