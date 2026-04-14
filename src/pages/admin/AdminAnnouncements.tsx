import { useState } from 'react';
import { Plus, Send, Edit, Trash2, X, Save, Megaphone, Users, Crown, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

type Audience = 'all' | 'trial' | 'premium' | 'expired';
type AnnouncementStatus = 'draft' | 'sent';

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: Audience;
  status: AnnouncementStatus;
  sentAt?: string;
  createdAt: string;
  recipientCount?: number;
}

const AUDIENCE_LABELS: Record<Audience, string> = {
  all: 'All Users',
  trial: 'Trial Users',
  premium: 'Premium (Active)',
  expired: 'Expired Users',
};

const AUDIENCE_COUNTS: Record<Audience, number> = {
  all: 12458,
  trial: 5820,
  premium: 3245,
  expired: 3393,
};

const AUDIENCE_ICON: Record<Audience, React.ReactNode> = {
  all: <Users size={14} />,
  trial: <Clock size={14} />,
  premium: <Crown size={14} />,
  expired: <X size={14} />,
};

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Course: Advanced WhatsApp Marketing',
    body: 'We just launched a brand new course on Advanced WhatsApp Marketing strategies. Subscribers can access it now from the Courses section. Trial users get a free preview of Module 1!',
    audience: 'all',
    status: 'sent',
    sentAt: '2026-04-03',
    createdAt: '2026-04-03',
    recipientCount: 12458,
  },
  {
    id: '2',
    title: 'Your Trial Ends in 2 Days — Upgrade Now',
    body: 'Your 7-day free trial is ending soon. Upgrade to Premium for just ₦5,000/month to keep earning unlimited commissions and accessing all courses.',
    audience: 'trial',
    status: 'sent',
    sentAt: '2026-04-01',
    createdAt: '2026-04-01',
    recipientCount: 5820,
  },
  {
    id: '3',
    title: 'April Commission Payout — Processing Now',
    body: 'Your April commissions are being processed. Approved withdrawals will be paid to your bank account within 24–48 hours.',
    audience: 'premium',
    status: 'draft',
    createdAt: '2026-04-06',
  },
];

const defaultForm = { title: '', body: '', audience: 'all' as Audience };

export default function AdminAnnouncements() {
  const toast = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [filterStatus, setFilterStatus] = useState<'all' | AnnouncementStatus>('all');

  const filtered = announcements.filter(a => filterStatus === 'all' || a.status === filterStatus);

  const openCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (a: Announcement) => {
    setEditingId(a.id);
    setForm({ title: a.title, body: a.body, audience: a.audience });
    setShowModal(true);
  };

  const handleSave = (asDraft: boolean) => {
    if (!form.title.trim() || !form.body.trim()) {
      toast.warning('Missing fields', 'Please fill in the title and message body.');
      return;
    }
    if (editingId) {
      setAnnouncements(prev => prev.map(a =>
        a.id === editingId
          ? { ...a, title: form.title, body: form.body, audience: form.audience, status: asDraft ? 'draft' : 'sent', sentAt: asDraft ? a.sentAt : new Date().toISOString().slice(0, 10), recipientCount: asDraft ? a.recipientCount : AUDIENCE_COUNTS[form.audience] }
          : a
      ));
      toast.success(asDraft ? 'Draft saved' : 'Announcement sent!', asDraft ? 'Your changes have been saved.' : `Sent to ${AUDIENCE_COUNTS[form.audience].toLocaleString()} users.`);
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        title: form.title,
        body: form.body,
        audience: form.audience,
        status: asDraft ? 'draft' : 'sent',
        sentAt: asDraft ? undefined : new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString().slice(0, 10),
        recipientCount: asDraft ? undefined : AUDIENCE_COUNTS[form.audience],
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      toast.success(asDraft ? 'Draft saved' : 'Announcement sent!', asDraft ? 'Saved as draft.' : `Sent to ${AUDIENCE_COUNTS[form.audience].toLocaleString()} users.`);
    }
    setShowModal(false);
  };

  const handleSend = (id: string) => {
    const a = announcements.find(x => x.id === id);
    if (!a) return;
    setAnnouncements(prev => prev.map(x =>
      x.id === id ? { ...x, status: 'sent', sentAt: new Date().toISOString().slice(0, 10), recipientCount: AUDIENCE_COUNTS[x.audience] } : x
    ));
    toast.success('Announcement sent!', `Delivered to ${AUDIENCE_COUNTS[a.audience].toLocaleString()} users.`);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    toast.info('Announcement deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Announcements
          </h1>
          <p className="text-gray-500 text-sm">Broadcast messages to your users</p>
        </div>
        <button
          onClick={openCreate}
          className="text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2"
          style={{ background: '#F5820A' }}
        >
          <Plus size={17} /> New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.entries(AUDIENCE_COUNTS) as [Audience, number][]).map(([key, count]) => (
          <div key={key} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              {AUDIENCE_ICON[key]}
              <span className="text-xs">{AUDIENCE_LABELS[key]}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{count.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {(['all', 'sent', 'draft'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filterStatus === f ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            style={filterStatus === f ? { background: '#F5820A' } : {}}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 opacity-70">
              ({f === 'all' ? announcements.length : announcements.filter(a => a.status === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Announcement cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Megaphone size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No announcements yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first announcement to reach your users.</p>
          </div>
        )}
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${a.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.status === 'sent' ? <CheckCircle size={11} /> : <Clock size={11} />}
                    {a.status === 'sent' ? 'Sent' : 'Draft'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex items-center gap-1">
                    {AUDIENCE_ICON[a.audience]}
                    {AUDIENCE_LABELS[a.audience]}
                  </span>
                  {a.recipientCount && (
                    <span className="text-xs text-gray-400">{a.recipientCount.toLocaleString()} recipients</span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{a.body}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {a.status === 'sent' ? `Sent ${a.sentAt}` : `Created ${a.createdAt}`}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {a.status === 'draft' && (
                  <button
                    onClick={() => handleSend(a.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1"
                    style={{ background: '#1CB957' }}
                  >
                    <Send size={13} /> Send Now
                  </button>
                )}
                <button onClick={() => openEdit(a)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit size={16} className="text-gray-500" />
                </button>
                <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{editingId ? 'Edit Announcement' : 'New Announcement'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:border-amber-500"
                  placeholder="e.g., New Course Available!"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  value={form.body}
                  onChange={e => setForm({ ...form, body: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:border-amber-500 resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(AUDIENCE_LABELS) as [Audience, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, audience: key })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${form.audience === key ? 'border-amber-400' : 'border-gray-200 hover:border-gray-300'}`}
                      style={form.audience === key ? { background: 'rgba(245,130,10,0.06)' } : {}}
                    >
                      <div className="flex items-center gap-2 mb-0.5" style={form.audience === key ? { color: '#F5820A' } : { color: '#6b7280' }}>
                        {AUDIENCE_ICON[key]}
                        <span className="text-xs font-semibold">{label}</span>
                      </div>
                      <p className="text-xs text-gray-400">{AUDIENCE_COUNTS[key].toLocaleString()} users</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => handleSave(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-sm hover:bg-gray-50"
              >
                <Save size={15} /> Save Draft
              </button>
              <button
                onClick={() => handleSave(false)}
                className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5"
                style={{ background: '#F5820A' }}
              >
                <Send size={15} /> Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
