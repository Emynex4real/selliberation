import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Eye, MessageSquare, AlertCircle } from 'lucide-react';

interface Withdrawal {
  id: string;
  userId: string;
  user: string;
  email: string;
  amount: number;
  bank: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  date: string;
}

const initialWithdrawals: Withdrawal[] = [
  { id: '1', userId: '1', user: 'John Doe', email: 'john@example.com', amount: 15000, bank: 'GTBank', accountNumber: '0123456789', accountName: 'John Doe', status: 'pending', date: '2026-03-25' },
  { id: '2', userId: '2', user: 'Sarah Miller', email: 'sarah@example.com', amount: 25000, bank: 'Access Bank', accountNumber: '0987654321', accountName: 'Sarah Miller', status: 'approved', date: '2026-03-24' },
  { id: '3', userId: '3', user: 'Mike Johnson', email: 'mike@example.com', amount: 8000, bank: 'Zenith Bank', accountNumber: '1234567890', accountName: 'Mike Johnson', status: 'pending', date: '2026-03-25' },
  { id: '4', userId: '4', user: 'Lisa Wong', email: 'lisa@example.com', amount: 35000, bank: 'First Bank', accountNumber: '5678901234', accountName: 'Lisa Wong', status: 'rejected', adminNote: 'Invalid account number', date: '2026-03-23' },
  { id: '5', userId: '5', user: 'David Brown', email: 'david@example.com', amount: 12000, bank: 'UBA', accountNumber: '3456789012', accountName: 'David Brown', status: 'approved', date: '2026-03-22' },
];

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialWithdrawals);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [rejectNote, setRejectNote] = useState('');

  const filteredWithdrawals = withdrawals.filter(w => {
    const matchesSearch = w.user.toLowerCase().includes(searchTerm.toLowerCase()) || w.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    return w.status === filter;
  });

  const stats = {
    pending: withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0),
    pendingCount: withdrawals.filter(w => w.status === 'pending').length,
    approved: withdrawals.filter(w => w.status === 'approved').reduce((sum, w) => sum + w.amount, 0),
    approvedCount: withdrawals.filter(w => w.status === 'approved').length,
    rejected: withdrawals.filter(w => w.status === 'rejected').reduce((sum, w) => sum + w.amount, 0),
    rejectedCount: withdrawals.filter(w => w.status === 'rejected').length,
  };

  const handleApprove = (id: string) => {
    if (confirm('Approve this withdrawal? Make sure to transfer the funds first.')) {
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'approved' as const } : w));
    }
  };

  const handleReject = () => {
    if (!selectedWithdrawal || !rejectNote.trim()) return;
    setWithdrawals(withdrawals.map(w => 
      w.id === selectedWithdrawal.id 
        ? { ...w, status: 'rejected' as const, adminNote: rejectNote } 
        : w
    ));
    setShowRejectModal(false);
    setSelectedWithdrawal(null);
    setRejectNote('');
  };

  const openRejectModal = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowRejectModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h1>
        <p className="text-gray-500">Manage user withdrawal requests</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <span className="text-gray-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{stats.pending.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{stats.pendingCount} requests</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <span className="text-gray-500">Approved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{stats.approved.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{stats.approvedCount} requests</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="text-red-600" size={20} />
            </div>
            <span className="text-gray-500">Rejected</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₦{stats.rejected.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{stats.rejectedCount} requests</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((f) => (
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Bank Details</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-medium">{withdrawal.user}</div>
                      <div className="text-sm text-gray-500">{withdrawal.email}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-lg font-bold">₦{withdrawal.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <div className="text-gray-900">{withdrawal.bank}</div>
                      <div className="text-sm text-gray-500">{withdrawal.accountNumber}</div>
                      <div className="text-xs text-gray-400">{withdrawal.accountName}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{withdrawal.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                      withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      withdrawal.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {withdrawal.status === 'pending' && <Clock size={12} />}
                      {withdrawal.status === 'approved' && <CheckCircle size={12} />}
                      {withdrawal.status === 'rejected' && <XCircle size={12} />}
                      {withdrawal.status}
                    </span>
                    {withdrawal.adminNote && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MessageSquare size={12} /> {withdrawal.adminNote}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {withdrawal.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(withdrawal.id)} 
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                          >
                            <CheckCircle size={14} /> Approve
                          </button>
                          <button 
                            onClick={() => openRejectModal(withdrawal)} 
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="View Details">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRejectModal && selectedWithdrawal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Reject Withdrawal</h3>
                <p className="text-sm text-gray-500">Request from {selectedWithdrawal.user}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold">₦{selectedWithdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bank:</span>
                <span>{selectedWithdrawal.bank} - {selectedWithdrawal.accountNumber}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for rejection</label>
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="Enter reason..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => { setShowRejectModal(false); setSelectedWithdrawal(null); setRejectNote(''); }} 
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject} 
                disabled={!rejectNote.trim()}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
