import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Copy, QrCode, Users, TrendingUp, Gift } from 'lucide-react';
import { mockReferrals } from '../../data/mockData';

export default function Referrals() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://selliberation.com/register?ref=${user?.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const level1Referrals = mockReferrals.filter(r => r.level === 1);
  const totalReferrals = mockReferrals.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referral Hub</h1>
        <p className="text-gray-500">Share your link and earn commissions</p>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Your Referral Link</h2>
            <p className="text-amber-100 mb-4">Share this link with friends and earn up to 65% commission!</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70"
              />
              <button
                onClick={copyToClipboard}
                className="bg-white text-amber-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-100"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
            <QrCode className="text-amber-600" size={80} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
            <span className="text-gray-500">Total Referrals</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalReferrals}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <span className="text-gray-500">Level 1</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{level1Referrals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="text-purple-600" size={20} />
            </div>
            <span className="text-gray-500">Your Stage</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">Stage {user?.stage}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold">Your Referrals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Referred User</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {level1Referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                        U
                      </div>
                      <span className="font-medium">User {ref.referredUserId}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Level {ref.level}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{new Date(ref.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-lg font-bold mb-4">Commission Structure</h2>
        <div className="grid md:grid-cols-6 gap-4">
          {[
            { level: 1, rate: '65%', amount: '₦3,250' },
            { level: 2, rate: '15%', amount: '₦750' },
            { level: 3, rate: '5%', amount: '₦250' },
            { level: 4, rate: '3%', amount: '₦150' },
            { level: 5, rate: '2%', amount: '₦100' },
            { level: 6, rate: '1%', amount: '₦50' },
          ].map((item) => (
            <div key={item.level} className={`p-4 rounded-lg text-center ${item.level === 1 ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}>
              <div className="text-2xl font-bold text-amber-600">{item.rate}</div>
              <div className="text-sm text-gray-500">Level {item.level}</div>
              <div className="text-xs text-gray-400 mt-1">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
