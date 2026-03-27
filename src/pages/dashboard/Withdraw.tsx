import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wallet, Clock, DollarSign, CheckCircle, XCircle, Send, AlertCircle, ChevronRight } from 'lucide-react';
import { mockCommissions, mockWithdrawals } from '../../data/mockData';

const NIGERIAN_BANKS = [
  'Access Bank', 'First Bank', 'GTBank', 'Zenith Bank', 'UBA',
  'Stanbic IBTC', 'Fidelity Bank', 'Union Bank', 'Sterling Bank',
  'Wema Bank', 'Kuda Bank', 'Opay', 'Palmpay',
];

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export default function Withdraw() {
  const { user, updateUser } = useAuth();

  const [bankName, setBankName] = useState(user?.bankDetails?.bankName ?? '');
  const [accountNumber, setAccountNumber] = useState(user?.bankDetails?.accountNumber ?? '');
  const [accountName, setAccountName] = useState(user?.bankDetails?.accountName ?? '');
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [saveDetails, setSaveDetails] = useState(true);

  const withdrawable = mockCommissions
    .filter(c => c.status === 'withdrawable')
    .reduce((s, c) => s + c.amount, 0);
  const pendingWithdrawals = mockWithdrawals
    .filter(w => w.status === 'pending')
    .reduce((s, w) => s + w.amount, 0);

  const MIN = 5000;
  const canWithdraw = withdrawable >= MIN;
  const amountNum = Number(amount);
  const isValidAmount = amountNum >= MIN && amountNum <= withdrawable;

  const quickAmounts = [
    { label: '25%', value: Math.floor(withdrawable * 0.25) },
    { label: '50%', value: Math.floor(withdrawable * 0.5) },
    { label: '75%', value: Math.floor(withdrawable * 0.75) },
    { label: 'Max', value: withdrawable },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveDetails) {
      updateUser({ bankDetails: { bankName, accountNumber, accountName } });
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Withdraw Earnings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Request a payout to your Nigerian bank account</p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Available Balance', value: `₦${withdrawable.toLocaleString()}`, icon: Wallet, gradient: 'linear-gradient(135deg, #0D2847, #1a3d63)', desc: 'Ready to withdraw' },
          { label: 'Pending Withdrawals', value: `₦${pendingWithdrawals.toLocaleString()}`, icon: Clock, gradient: 'linear-gradient(135deg, #F5820A, #FFB347)', desc: 'Awaiting approval' },
          { label: 'Minimum Withdrawal', value: `₦${MIN.toLocaleString()}`, icon: DollarSign, gradient: 'linear-gradient(135deg, #1CB957, #34D399)', desc: 'Per request' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{card.label}</span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.gradient }}>
                <card.icon size={16} color="white" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.value}</p>
            <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Withdrawal form */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h2 className="font-bold text-gray-900">Request Withdrawal</h2>
        </div>

        <div className="p-5 md:p-6">
          {!canWithdraw ? (
            <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#FEF3E8', border: '1px solid #FED7AA' }}>
              <AlertCircle size={18} style={{ color: '#F5820A', flexShrink: 0, marginTop: '1px' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#C2410C' }}>Insufficient balance</p>
                <p className="text-sm" style={{ color: '#EA580C' }}>
                  You need at least ₦{MIN.toLocaleString()} to withdraw. You currently have ₦{withdrawable.toLocaleString()} available.
                  Earn ₦{(MIN - withdrawable).toLocaleString()} more from commissions.
                </p>
              </div>
            </div>
          ) : submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#F0FDF4' }}>
                <CheckCircle size={32} style={{ color: '#1CB957' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
              <p className="text-gray-500 mb-5">Your withdrawal of ₦{Number(amount).toLocaleString()} is pending approval.<br />You'll receive a notification once processed (usually 24–48h).</p>
              <button
                onClick={() => { setSubmitted(false); setAmount(''); }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: '#0D2847' }}
              >
                Make Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (₦) <span className="font-normal text-gray-400">— max ₦{withdrawable.toLocaleString()}</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder={`Min ₦${MIN.toLocaleString()}`}
                  min={MIN}
                  max={withdrawable}
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                  style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
                  required
                />
                {/* Quick amounts */}
                <div className="flex gap-2 mt-2">
                  {quickAmounts.map(q => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => setAmount(String(q.value))}
                      className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={String(q.value) === amount
                        ? { background: '#0D2847', color: 'white' }
                        : { background: '#F3F4F6', color: '#6B7280' }
                      }
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
                {amount && !isValidAmount && (
                  <p className="text-xs mt-1.5" style={{ color: '#EF4444' }}>
                    {amountNum < MIN ? `Minimum is ₦${MIN.toLocaleString()}` : `Maximum is ₦${withdrawable.toLocaleString()}`}
                  </p>
                )}
              </div>

              {/* Bank details */}
              <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
                <p className="text-sm font-semibold text-gray-700 mb-3">Bank Details</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bank Name</label>
                    <select
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm bg-white"
                      style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
                      required
                    >
                      <option value="">Select bank...</option>
                      {NIGERIAN_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="0123456789"
                      maxLength={10}
                      className="w-full rounded-xl px-4 py-3 text-sm font-mono"
                      style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Account Name</label>
                    <input
                      type="text"
                      value={accountName}
                      onChange={e => setAccountName(e.target.value)}
                      placeholder="As it appears on your bank account"
                      className="w-full rounded-xl px-4 py-3 text-sm"
                      style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
                      required
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2.5 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveDetails}
                    onChange={e => setSaveDetails(e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#0D2847' }}
                  />
                  <span className="text-sm text-gray-600">Save bank details for future withdrawals</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isValidAmount}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity"
                style={{ background: isValidAmount ? 'linear-gradient(135deg, #0D2847, #1CB957)' : '#D1D5DB', cursor: isValidAmount ? 'pointer' : 'not-allowed' }}
              >
                <Send size={16} /> Submit Withdrawal Request
              </button>

              <p className="text-xs text-center text-gray-400">
                Withdrawals are processed within 24–48 hours on business days.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h2 className="font-bold text-gray-900">Withdrawal History</h2>
        </div>
        {mockWithdrawals.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Wallet size={32} className="mx-auto mb-3 opacity-30" />
            <p>No withdrawals yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {[...mockWithdrawals].reverse().map((w) => (
              <div key={w.id} className="flex items-center gap-4 px-5 py-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: w.status === 'approved' ? '#F0FDF4' : w.status === 'pending' ? '#FEF3E8' : '#FFF0F0',
                  }}
                >
                  {w.status === 'approved' && <CheckCircle size={18} style={{ color: '#1CB957' }} />}
                  {w.status === 'pending' && <Clock size={18} style={{ color: '#F5820A' }} />}
                  {w.status === 'rejected' && <XCircle size={18} style={{ color: '#EF4444' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">₦{w.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{w.bankName} · {w.accountNumber} · {timeAgo(w.createdAt)}</p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                    style={{
                      background: w.status === 'approved' ? '#F0FDF4' : w.status === 'pending' ? '#FEF3E8' : '#FFF0F0',
                      color: w.status === 'approved' ? '#1CB957' : w.status === 'pending' ? '#F5820A' : '#EF4444',
                    }}
                  >
                    {w.status}
                  </span>
                  {w.adminNote && (
                    <p className="text-xs text-gray-400 mt-0.5">{w.adminNote}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {mockWithdrawals.length > 0 && (
          <div className="px-5 py-3 flex items-center justify-between text-xs text-gray-400" style={{ borderTop: '1px solid #F3F4F6' }}>
            <span>{mockWithdrawals.length} total withdrawal{mockWithdrawals.length !== 1 ? 's' : ''}</span>
            <button className="flex items-center gap-1 font-medium hover:text-gray-600">
              Export <ChevronRight size={12} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
