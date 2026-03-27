import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Bell, Save, Check, Zap, CreditCard, Shield } from 'lucide-react';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleUpgrade = () => {
    updateUser({ subscriptionStatus: 'premium' });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account preferences and subscription</p>
      </div>

      {saved && (
        <div className="rounded-xl px-4 py-3 flex items-center gap-2.5 font-semibold text-sm" style={{ background: '#F0FDF4', color: '#1CB957', border: '1px solid #BBF7D0' }}>
          <Check size={18} /> Settings saved successfully!
        </div>
      )}

      {/* Subscription status */}
      {user?.subscriptionStatus === 'trial' && (
        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0D2847 0%, #112e52 100%)' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,130,10,0.2)' }}>
                  <Zap size={18} style={{ color: '#F5820A' }} />
                </div>
                <h3 className="text-lg font-bold text-white">Upgrade to Premium</h3>
              </div>
              <p className="text-blue-100/70 text-sm mb-3">Unlock all courses, earn full commissions, and access priority support</p>
              <ul className="space-y-1.5 text-sm text-blue-100/80">
                {['Full access to all 5 courses', '65% commission on direct referrals', '6-level deep earning network', 'Priority withdrawal processing'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={14} style={{ color: '#1CB957' }} /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleUpgrade}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shrink-0"
              style={{ background: '#F5820A' }}
            >
              <CreditCard size={18} /> Upgrade for ₦5,000/month
            </button>
          </div>
        </div>
      )}

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <User size={18} style={{ color: '#0D2847' }} />
          <h2 className="font-bold text-gray-900">Profile Information</h2>
        </div>
        <form onSubmit={handleSaveProfile} className="p-5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500"
                style={{ border: '1.5px solid #E5E7EB' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Referral Code</label>
              <input
                type="text"
                value={user?.referralCode}
                disabled
                className="w-full rounded-xl px-4 py-3 text-sm font-mono font-bold"
                style={{ border: '1.5px solid #E5E7EB', background: '#F0FDF4', color: '#1CB957' }}
              />
            </div>
          </div>
          <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style={{ background: '#0D2847' }}>
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <Lock size={18} style={{ color: '#0D2847' }} />
          <h2 className="font-bold text-gray-900">Change Password</h2>
        </div>
        <form onSubmit={handleSavePassword} className="p-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ border: '1.5px solid #E5E7EB', outline: 'none' }}
              />
            </div>
          </div>
          <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style={{ background: '#0D2847' }}>
            <Shield size={18} /> Update Password
          </button>
        </form>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <Bell size={18} style={{ color: '#0D2847' }} />
          <h2 className="font-bold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Email notifications for commission earnings', enabled: true },
            { label: 'Email notifications for withdrawals', enabled: true },
            { label: 'Email notifications for new referrals', enabled: false },
            { label: 'Trial ending reminders', enabled: true },
          ].map((pref, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <span className="text-gray-700 font-medium">{pref.label}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                <div className="w-11 h-6 rounded-full transition-colors peer-checked:bg-[#1CB957]" style={{ background: '#D1D5DB' }}></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
