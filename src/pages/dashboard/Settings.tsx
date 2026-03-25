import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Bell, Save, Check } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check size={20} /> Settings saved successfully!
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <User className="text-amber-500" size={20} />
          <h2 className="text-lg font-bold">Profile Information</h2>
        </div>
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral Code</label>
              <input
                type="text"
                value={user?.referralCode}
                disabled
                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 font-mono text-amber-600"
              />
            </div>
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2">
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Lock className="text-amber-500" size={20} />
          <h2 className="text-lg font-bold">Change Password</h2>
        </div>
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2">
            <Lock size={18} /> Update Password
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Bell className="text-amber-500" size={20} />
          <h2 className="text-lg font-bold">Notification Preferences</h2>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Email notifications for commission earnings', enabled: true },
            { label: 'Email notifications for withdrawals', enabled: true },
            { label: 'Email notifications for new referrals', enabled: false },
            { label: 'Trial ending reminders', enabled: true },
          ].map((pref, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">{pref.label}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-amber-500"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
