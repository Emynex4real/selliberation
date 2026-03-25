import { useState } from 'react';
import { Search, Eye, Ban, CheckCircle, XCircle, Phone } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: number;
  referrals: number;
  subscription: 'active' | 'trial' | 'expired' | 'cancelled';
  status: 'active' | 'banned';
  joined: string;
  referredBy?: string;
  referralCode: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '08012345678', stage: 3, referrals: 12, subscription: 'active', status: 'active', joined: '2026-01-15', referralCode: 'SELL-ABC123' },
  { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', phone: '08023456789', stage: 2, referrals: 5, subscription: 'active', status: 'active', joined: '2026-02-01', referralCode: 'SELL-DEF456' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '08034567890', stage: 1, referrals: 2, subscription: 'trial', status: 'active', joined: '2026-02-15', referralCode: 'SELL-GHI789' },
  { id: '4', name: 'Lisa Wong', email: 'lisa@example.com', phone: '08045678901', stage: 4, referrals: 18, subscription: 'active', status: 'active', joined: '2026-01-20', referralCode: 'SELL-JKL012' },
  { id: '5', name: 'David Brown', email: 'david@example.com', phone: '08056789012', stage: 1, referrals: 1, subscription: 'trial', status: 'active', joined: '2026-03-01', referralCode: 'SELL-MNO345' },
  { id: '6', name: 'Emma Wilson', email: 'emma@example.com', phone: '08067890123', stage: 2, referrals: 7, subscription: 'active', status: 'active', joined: '2026-02-10', referralCode: 'SELL-PQR678' },
  { id: '7', name: 'James Chen', email: 'james@example.com', phone: '08078901234', stage: 5, referrals: 25, subscription: 'active', status: 'active', joined: '2026-01-05', referralCode: 'SELL-STU901' },
  { id: '8', name: 'Alice Johnson', email: 'alice@example.com', phone: '08089012345', stage: 1, referrals: 0, subscription: 'expired', status: 'banned', joined: '2025-12-20', referralCode: 'SELL-VWX234' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'all') return true;
    if (filter === 'banned') return user.status === 'banned';
    return user.subscription === filter;
  });

  const handleBanUser = (id: string) => {
    if (confirm('Are you sure you want to ban this user?')) {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'banned' } : u));
    }
  };

  const handleUnbanUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'active' } : u));
  };

  const handleActivateSubscription = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, subscription: 'active' } : u));
  };

  const handleCancelSubscription = (id: string) => {
    if (confirm('Cancel this user subscription?')) {
      setUsers(users.map(u => u.id === id ? { ...u, subscription: 'cancelled' } : u));
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'trial': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage all registered users</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-64"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Users</option>
            <option value="active">Active Subscribers</option>
            <option value="trial">Trial</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold">{users.length}</div>
          <div className="text-sm text-gray-500">Total Users</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{users.filter(u => u.subscription === 'active').length}</div>
          <div className="text-sm text-gray-500">Active Subscribers</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{users.filter(u => u.subscription === 'trial').length}</div>
          <div className="text-sm text-gray-500">On Trial</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{users.filter(u => u.status === 'banned').length}</div>
          <div className="text-sm text-gray-500">Banned</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Stage</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Referrals</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Subscription</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Joined</th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{user.phone}</td>
                  <td className="px-5 py-4">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">Stage {user.stage}</span>
                  </td>
                  <td className="px-5 py-4 font-medium">{user.referrals}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSubscriptionColor(user.subscription)}`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {user.status === 'banned' ? (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">Banned</span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">Active</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{user.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleViewUser(user)} className="p-2 hover:bg-gray-100 rounded-lg" title="View Details">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                      {user.subscription !== 'active' && (
                        <button onClick={() => handleActivateSubscription(user.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Activate Subscription">
                          <CheckCircle size={18} className="text-green-500" />
                        </button>
                      )}
                      {user.subscription === 'active' && (
                        <button onClick={() => handleCancelSubscription(user.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Cancel Subscription">
                          <XCircle size={18} className="text-yellow-500" />
                        </button>
                      )}
                      {user.status === 'active' ? (
                        <button onClick={() => handleBanUser(user.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Ban User">
                          <Ban size={18} className="text-red-500" />
                        </button>
                      ) : (
                        <button onClick={() => handleUnbanUser(user.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Unban User">
                          <CheckCircle size={18} className="text-green-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">User Details</h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold">{selectedUser.name}</h4>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    {selectedUser.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Referral Code</label>
                  <p className="font-medium font-mono text-amber-600">{selectedUser.referralCode}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Stage</label>
                  <p className="font-medium">Stage {selectedUser.stage}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Total Referrals</label>
                  <p className="font-medium">{selectedUser.referrals}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Subscription</label>
                  <p className={`font-medium capitalize ${selectedUser.subscription === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {selectedUser.subscription}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Joined</label>
                  <p className="font-medium">{selectedUser.joined}</p>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                {selectedUser.subscription !== 'active' && (
                  <button onClick={() => { handleActivateSubscription(selectedUser.id); setShowUserModal(false); }} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Activate Subscription
                  </button>
                )}
                {selectedUser.status === 'active' ? (
                  <button onClick={() => { handleBanUser(selectedUser.id); setShowUserModal(false); }} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                    Ban User
                  </button>
                ) : (
                  <button onClick={() => { handleUnbanUser(selectedUser.id); setShowUserModal(false); }} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Unban User
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
