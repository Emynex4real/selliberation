import { useState } from 'react';
import { Wallet, DollarSign, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import { mockCommissions, mockWithdrawals } from '../../data/mockData';

export default function Withdraw() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const withdrawable = mockCommissions.filter(c => c.status === 'withdrawable').reduce((sum, c) => sum + c.amount, 0);
  const minWithdrawal = 10000;
  const canWithdraw = withdrawable >= minWithdrawal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdraw Earnings</h1>
        <p className="text-gray-500">Request a withdrawal to your bank account</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Wallet className="text-green-600" size={20} />
            </div>
            <span className="text-gray-500">Available Balance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{withdrawable.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <span className="text-gray-500">Pending Withdrawals</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₦{mockWithdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <span className="text-gray-500">Min. Withdrawal</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{minWithdrawal.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">Request Withdrawal</h2>
        
        {!canWithdraw ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
            Minimum withdrawal amount is ₦{minWithdrawal.toLocaleString()}. You need ₦{(minWithdrawal - withdrawable).toLocaleString()} more to request a withdrawal.
          </div>
        ) : submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-3" size={48} />
            <h3 className="text-lg font-bold text-green-700 mb-2">Withdrawal Request Submitted!</h3>
            <p className="text-green-600">Your request is pending approval. You'll be notified once processed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g., GTBank"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="e.g., 0123456789"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g., John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Max: ${withdrawable}`}
                  max={withdrawable}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Submit Withdrawal Request
            </button>
          </form>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold">Withdrawal History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Bank</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Account</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500">{new Date(withdrawal.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 font-bold">₦{withdrawal.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-500">{withdrawal.bankName}</td>
                  <td className="px-5 py-4 text-gray-500">{withdrawal.accountNumber}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-sm flex items-center gap-1 w-fit ${
                      withdrawal.status === 'approved' ? 'bg-green-100 text-green-700' :
                      withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {withdrawal.status === 'approved' && <CheckCircle size={14} />}
                      {withdrawal.status === 'pending' && <Clock size={14} />}
                      {withdrawal.status === 'rejected' && <XCircle size={14} />}
                      {withdrawal.status}
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
