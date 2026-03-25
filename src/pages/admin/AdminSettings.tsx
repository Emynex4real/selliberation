import { useState, useEffect } from 'react';
import { Save, CreditCard, DollarSign, Eye, EyeOff, Bell, Globe, Shield } from 'lucide-react';

interface PlatformSettings {
  paystack: {
    publicKey: string;
    secretKey: string;
    planId: string;
  };
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  commissions: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
    level6: number;
  };
  general: {
    trialDays: number;
    minWithdrawal: number;
    subscriptionPrice: number;
    platformName: string;
    supportEmail: string;
  };
}

const defaultSettings: PlatformSettings = {
  paystack: {
    publicKey: '',
    secretKey: '',
    planId: ''
  },
  bank: {
    bankName: '',
    accountNumber: '',
    accountName: ''
  },
  commissions: {
    level1: 65,
    level2: 15,
    level3: 5,
    level4: 3,
    level5: 2,
    level6: 1
  },
  general: {
    trialDays: 7,
    minWithdrawal: 10000,
    subscriptionPrice: 5000,
    platformName: 'Selliberation',
    supportEmail: 'support@selliberation.com'
  }
};

export default function AdminSettings() {
  const [showKeys, setShowKeys] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const savedSettings = localStorage.getItem('platformSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSettings = (section: keyof PlatformSettings, field: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'paystack', label: 'Paystack', icon: CreditCard },
    { id: 'bank', label: 'Bank Account', icon: Shield },
    { id: 'commissions', label: 'Commissions', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-500">Configure your platform settings</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-amber-500/25"
        >
          <Save size={20} /> Save All Changes
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
          <Save size={20} /> Settings saved successfully!
        </div>
      )}

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-bold">General Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                  <input
                    type="text"
                    value={settings.general.platformName}
                    onChange={(e) => updateSettings('general', 'platformName', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => updateSettings('general', 'supportEmail', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trial Duration (days)</label>
                  <input
                    type="number"
                    value={settings.general.trialDays}
                    onChange={(e) => updateSettings('general', 'trialDays', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Price (₦/month)</label>
                  <input
                    type="number"
                    value={settings.general.subscriptionPrice}
                    onChange={(e) => updateSettings('general', 'subscriptionPrice', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Withdrawal (₦)</label>
                  <input
                    type="number"
                    value={settings.general.minWithdrawal}
                    onChange={(e) => updateSettings('general', 'minWithdrawal', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'paystack' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-bold">Paystack Integration</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Create your Paystack account at paystack.com and get your API keys from the developer settings.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
                  <input
                    type="text"
                    value={settings.paystack.publicKey}
                    onChange={(e) => updateSettings('paystack', 'publicKey', e.target.value)}
                    placeholder="pk_live_xxxxxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                  <div className="relative">
                    <input
                      type={showKeys ? 'text' : 'password'}
                      value={settings.paystack.secretKey}
                      onChange={(e) => updateSettings('paystack', 'secretKey', e.target.value)}
                      placeholder="sk_live_xxxxxxxxxxxxx"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKeys(!showKeys)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showKeys ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan ID (₦5,000/month)</label>
                  <input
                    type="text"
                    value={settings.paystack.planId}
                    onChange={(e) => updateSettings('paystack', 'planId', e.target.value)}
                    placeholder="PLN_xxxxxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                  <input
                    type="text"
                    value="https://selliberation.com/api/webhooks/paystack"
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-gray-500 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">Add this URL in your Paystack webhook settings</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-bold">Admin Bank Account</h2>
              <p className="text-sm text-gray-500">This is where subscription payments will be received.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={settings.bank.bankName}
                    onChange={(e) => updateSettings('bank', 'bankName', e.target.value)}
                    placeholder="Guaranty Trust Bank (GTBank)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={settings.bank.accountNumber}
                    onChange={(e) => updateSettings('bank', 'accountNumber', e.target.value)}
                    placeholder="0123456789"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={settings.bank.accountName}
                    onChange={(e) => updateSettings('bank', 'accountName', e.target.value)}
                    placeholder="Digital World Tech Academy"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-bold">Commission Rates</h2>
              <p className="text-sm text-gray-500">Configure commission percentages for each referral level.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { key: 'level1', label: 'Level 1 (Direct Referral)', defaultRate: 65 },
                  { key: 'level2', label: 'Level 2', defaultRate: 15 },
                  { key: 'level3', label: 'Level 3', defaultRate: 5 },
                  { key: 'level4', label: 'Level 4', defaultRate: 3 },
                  { key: 'level5', label: 'Level 5', defaultRate: 2 },
                  { key: 'level6', label: 'Level 6', defaultRate: 1 },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <label className="font-medium text-gray-700">{item.label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={settings.commissions[item.key as keyof typeof settings.commissions]}
                        onChange={(e) => updateSettings('commissions', item.key, parseInt(e.target.value))}
                        className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      <span className="text-gray-500">%</span>
                      <span className="text-sm text-gray-400 w-20">
                        ₦{(settings.general.subscriptionPrice * (settings.commissions[item.key as keyof typeof settings.commissions] / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-700">
                  <strong>Total Commission:</strong> {Object.values(settings.commissions).reduce((a, b) => a + b, 0)}% 
                  ({settings.general.subscriptionPrice > 0 && `₦${(settings.general.subscriptionPrice * Object.values(settings.commissions).reduce((a, b) => a + b, 0) / 100).toLocaleString()}`} per subscription)
                </p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
              <h2 className="text-lg font-bold">Email Notifications</h2>
              <p className="text-sm text-gray-500">Configure which notifications are sent to users.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'welcome', label: 'Welcome email on registration', enabled: true },
                  { id: 'trial_end', label: 'Trial ending reminder (Day 5)', enabled: true },
                  { id: 'payment', label: 'Payment confirmation', enabled: true },
                  { id: 'commission', label: 'Commission earned', enabled: true },
                  { id: 'withdrawal', label: 'Withdrawal processed', enabled: true },
                  { id: 'referral', label: 'New referral signup', enabled: false },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="text-gray-700">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
