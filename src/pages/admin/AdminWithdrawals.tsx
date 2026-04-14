import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, Eye, MessageSquare, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Withdrawal {
  id: string;
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
  { id: '1', user: 'John Doe', email: 'john@example.com', amount: 15000, bank: 'GTBank', accountNumber: '0123456789', accountName: 'John Doe', status: 'pending', date: '2026-04-05' },
  { id: '2', user: 'Sarah Miller', email: 'sarah@example.com', amount: 25000, bank: 'Access Bank', accountNumber: '0987654321', accountName: 'Sarah Miller', status: 'approved', date: '2026-04-04' },
  { id: '3', user: 'Mike Johnson', email: 'mike@example.com', amount: 8000, bank: 'Zenith Bank', accountNumber: '1234567890', accountName: 'Mike Johnson', status: 'pending', date: '2026-04-05' },
  { id: '4', user: 'Lisa Wong', email: 'lisa@example.com', amount: 35000, bank: 'First Bank', accountNumber: '5678901234', accountName: 'Lisa Wong', status: 'rejected', adminNote: 'Invalid account number', date: '2026-04-03' },
  { id: '5', user: 'David Brown', email: 'david@example.com', amount: 12000, bank: 'UBA', accountNumber: '3456789012', accountName: 'David Brown', status: 'approved', date: '2026-04-02' },
  { id: '6', user: 'Emma Wilson', email: 'emma@example.com', amount: 9500, bank: 'GTBank', accountNumber: '6789012345', accountName: 'Emma Wilson', status: 'pending', date: '2026-04-06' },
  { id: '7', user: 'James Chen', email: 'james@example.com', amount: 45000, bank: 'Zenith Bank', accountNumber: '7890123456', accountName: 'James Chen', status: 'pending', date: '2026-04-06' },
  { id: '8', user: 'Tom Wilson', email: 'tom@example.com', amount: 18500, bank: 'Access Bank', accountNumber: '8901234567', accountName: 'Tom Wilson', status: 'pending', date: '2026-04-05' },
];

const PAGE_SIZE = 6;

export default function AdminWithdrawals() {
  const toast = useToast();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialWithdrawals);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<Withdrawal | null>(null);
  const [rejectNote, setRejectNote] = useState('');
  const [page, setPage] = useState(1);

  const filtered = withdrawals.filter(w => {
    const matchSearch = w.user.toLowerCase().includes(search.toLowerCase()) || w.email.toLowerCase().includes(search.toLowerCase());
    return matchSearch && (filter === 'all' || w.status === filter);
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pendingOnPage = paginated.filter(w => w.status === 'pending');
  const allPagePendingSelected = pendingOnPage.length > 0 && pendingOnPage.every(w => selected.has(w.id));

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allPagePendingSelected) {
      setSelected(prev => {
        const next = new Set(prev);
        pendingOnPage.forEach(w => next.delete(w.id));
        return next;
      });
    } else {
      setSelected(prev => {
        const next = new Set(prev);
        pendingOnPage.forEach(w => next.add(w.id));
        return next;
      });
    }
  };

  const handleApprove = (id: string) => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'approved' as const } : w));
    toast.success('Withdrawal approved', 'Make sure to transfer the funds to the user.');
  };

  const handleBulkApprove = () => {
    const ids = Array.from(selected);
    const count = ids.filter(id => withdrawals.find(w => w.id === id)?.status === 'pending').length;
    setWithdrawals(prev => prev.map(w => selected.has(w.id) && w.status === 'pending' ? { ...w, status: 'approved' as const } : w));
    setSelected(new Set());
    toast.success(`${count} withdrawal${count > 1 ? 's' : ''} approved`, 'Please ensure fund transfers are completed.');
  };

  const openRejectModal = (w: Withdrawal) => {
    setRejectTarget(w);
    setRejectNote('');
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!rejectTarget || !rejectNote.trim()) return;
    setWithdrawals(prev => prev.map(w => w.id === rejectTarget.id ? { ...w, status: 'rejected' as const, adminNote: rejectNote } : w));
    setShowRejectModal(false);
    toast.error('Withdrawal rejected', `Reason: ${rejectNote}`);
  };

  const pending = withdrawals.filter(w => w.status === 'pending');
  const approved = withdrawals.filter(w => w.status === 'approved');
  const rejected = withdrawals.filter(w => w.status === 'rejected');
  const selectedPendingCount = Array.from(selected).filter(id => withdrawals.find(w => w.id === id)?.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Withdrawal Requests
        </h1>
        <p className="text-gray-500 text-sm">Manage user withdrawal requests</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Pending', count: pending.length, total: pending.reduce((s, w) => s + w.amount, 0), icon: Clock, iconColor: 'text-yellow-600', bg: 'bg-yellow-100' },
          { label: 'Approved', count: approved.length, total: approved.reduce((s, w) => s + w.amount, 0), icon: CheckCircle, iconColor: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Rejected', count: rejected.length, total: rejected.reduce((s, w) => s + w.amount, 0), icon: XCircle, iconColor: 'text-red-600', bg: 'bg-red-100' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                <s.icon className={s.iconColor} size={20} />
              </div>
              <span className="text-gray-500 text-sm">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₦{s.total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{s.count} requests</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter tabs */}
            {['all', 'pending', 'approved', 'rejected'].map(f => (
              <button key={f} onClick={() => { setFilter(f); setPage(1); setSelected(new Set()); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={filter === f ? { background: '#F5820A' } : {}}>
                {f}
              </button>
            ))}

            {/* Bulk approve button */}
            {selectedPendingCount > 0 && (
              <button onClick={handleBulkApprove}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 bg-green-500 hover:bg-green-600">
                <CheckCircle size={13} /> Approve {selectedPendingCount} selected
              </button>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text" placeholder="Search by name or email..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allPagePendingSelected}
                    onChange={toggleSelectAll}
                    disabled={pendingOnPage.length === 0}
                    className="rounded accent-amber-500 disabled:opacity-30"
                  />
                </th>
                {['User', 'Amount', 'Bank Details', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map(w => (
                <tr key={w.id} className={`hover:bg-gray-50 ${selected.has(w.id) ? 'bg-amber-50' : ''}`}>
                  <td className="px-4 py-4">
                    {w.status === 'pending' && (
                      <input
                        type="checkbox"
                        checked={selected.has(w.id)}
                        onChange={() => toggleSelect(w.id)}
                        className="rounded accent-amber-500"
                      />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-sm">{w.user}</div>
                    <div className="text-xs text-gray-500">{w.email}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-lg font-bold text-gray-900">₦{w.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm">{w.bank}</div>
                    <div className="text-xs text-gray-500 font-mono">{w.accountNumber}</div>
                    <div className="text-xs text-gray-400">{w.accountName}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{w.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                      w.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      w.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {w.status === 'pending' && <Clock size={11} />}
                      {w.status === 'approved' && <CheckCircle size={11} />}
                      {w.status === 'rejected' && <XCircle size={11} />}
                      {w.status}
                    </span>
                    {w.adminNote && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MessageSquare size={10} /> {w.adminNote}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {w.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(w.id)}
                            className="text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 bg-green-500 hover:bg-green-600">
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button onClick={() => openRejectModal(w)}
                            className="text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 bg-red-500 hover:bg-red-600">
                            <XCircle size={12} /> Reject
                          </button>
                        </>
                      )}
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <Eye size={15} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} requests
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${page === p ? 'text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                style={page === p ? { background: '#F5820A' } : {}}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Reject modal */}
      {showRejectModal && rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Reject Withdrawal</h3>
                <p className="text-sm text-gray-500">From {rejectTarget.user}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold">₦{rejectTarget.amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Bank:</span><span>{rejectTarget.bank}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Account:</span><span className="font-mono">{rejectTarget.accountNumber}</span></div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for rejection *</label>
              <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)}
                placeholder="e.g., Invalid account number, insufficient details..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none" rows={3} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setShowRejectModal(false); setRejectTarget(null); setRejectNote(''); }}
                className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleReject} disabled={!rejectNote.trim()}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
