import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Copy, Share2, Users, DollarSign, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import { mockReferralNetwork, mockCommissions } from '../../data/mockData';
import type { ReferralNode } from '../../types';

const LEVEL_COLORS = [
  { bg: '#E8F0F8', text: '#0D2847', border: '#C8D8EC', rate: '65%', amount: '₦3,250' },
  { bg: '#F0FDF4', text: '#1CB957', border: '#BBF7D0', rate: '15%', amount: '₦750' },
  { bg: '#FEF3E8', text: '#F5820A', border: '#FED7AA', rate: '5%',  amount: '₦250' },
  { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE', rate: '3%',  amount: '₦150' },
  { bg: '#F5F3FF', text: '#8B5CF6', border: '#DDD6FE', rate: '2%',  amount: '₦100' },
  { bg: '#FDF2F8', text: '#EC4899', border: '#FBCFE8', rate: '1%',  amount: '₦50'  },
];

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function ReferralCard({ node, depth = 0 }: { node: ReferralNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const meta = LEVEL_COLORS[node.level - 1] ?? LEVEL_COLORS[0];

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 p-3.5 rounded-xl transition-all"
        style={{ background: expanded && hasChildren ? meta.bg : 'white', border: `1px solid ${meta.border}`, marginLeft: `${depth * 24}px` }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: meta.bg, color: meta.text, border: `2px solid ${meta.border}` }}>
          {node.referredName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{node.referredName}</p>
          <p className="text-xs text-gray-400">{timeAgo(node.createdAt)}</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ background: node.subscriptionStatus === 'premium' ? '#F0FDF4' : '#FEF3E8', color: node.subscriptionStatus === 'premium' ? '#1CB957' : '#F5820A' }}>
          {node.subscriptionStatus === 'premium' ? 'Premium' : 'Trial'}
        </span>
        <span className="text-xs font-bold shrink-0" style={{ color: meta.text }}>L{node.level}</span>
        {hasChildren && (
          <button onClick={() => setExpanded(v => !v)} className="ml-1 p-1 rounded-lg hover:bg-black/5" style={{ color: '#6B7280' }}>
            {expanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>
        )}
      </div>
      {expanded && hasChildren && (
        <div className="mt-2 space-y-2">
          {node.children!.map(child => (
            <ReferralCard key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Referrals() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://selliberation.com/register?ref=${user?.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Join me on Selliberation — learn digital skills and earn real money! My referral link: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Stats
  const level1 = mockReferralNetwork;
  const level2 = mockReferralNetwork.flatMap(r => r.children ?? []);
  const level3 = level2.flatMap(r => r.children ?? []);
  const totalNetwork = level1.length + level2.length + level3.length;
  const premiumCount = [...level1, ...level2, ...level3].filter(r => r.subscriptionStatus === 'premium').length;
  const totalCommissions = mockCommissions.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Referral Hub</h1>
        <p className="text-gray-500 text-sm mt-0.5">Grow your network, earn commissions across 6 levels</p>
      </div>

      {/* Share card */}
      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0D2847 0%, #112e52 100%)' }}>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Your referral link</p>
            <h2 className="text-xl font-extrabold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Earn up to <span style={{ color: '#F5820A' }}>65%</span> per subscriber
            </h2>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Share your link — anyone who subscribes earns you ₦3,250 instantly. Their subscribers earn you ₦750. 6 levels deep.
            </p>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 rounded-xl px-3 py-2.5 text-xs text-white min-w-0"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all"
                style={{ background: copied ? '#1CB957' : 'rgba(255,255,255,0.15)', color: 'white' }}
              >
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={shareWhatsApp}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <Share2 size={15} /> Share on WhatsApp
            </button>
          </div>

          {/* Code QR placeholder */}
          <div className="hidden md:flex flex-col items-center justify-center gap-3">
            <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-black"
              style={{ background: 'rgba(255,255,255,0.08)', border: '2px dashed rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.3)' }}>
              QR
            </div>
            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Referral code:<br />
              <span className="font-mono font-bold" style={{ color: '#F5820A' }}>{user?.referralCode}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Network', value: totalNetwork, icon: Users, color: '#0D2847', bg: '#E8F0F8' },
          { label: 'Premium Members', value: premiumCount, icon: TrendingUp, color: '#1CB957', bg: '#F0FDF4' },
          { label: 'Direct (L1)', value: level1.length, icon: ChevronRight, color: '#F5820A', bg: '#FEF3E8' },
          { label: 'Total Earned', value: `₦${totalCommissions.toLocaleString()}`, icon: DollarSign, color: '#0D2847', bg: '#E8F0F8' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Commission structure */}
      <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 className="font-bold text-gray-900 mb-4">Commission Structure</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {LEVEL_COLORS.map((meta, i) => (
            <div key={i} className="text-center p-3 rounded-xl" style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
              <p className="text-xs font-semibold text-gray-500 mb-1">Level {i + 1}</p>
              <p className="text-xl font-extrabold" style={{ color: meta.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{meta.rate}</p>
              <p className="text-[11px] font-medium text-gray-400 mt-0.5">{meta.amount}<br />per sub</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Based on ₦5,000/month Premium subscription price.</p>
      </div>

      {/* Network tree */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <h2 className="font-bold text-gray-900">Your Network Tree</h2>
          <span className="text-xs text-gray-400">{totalNetwork} people in your network</span>
        </div>
        <div className="p-5 space-y-3">
          {mockReferralNetwork.length === 0 ? (
            <div className="text-center py-10">
              <Users size={36} className="mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500 font-medium">No referrals yet</p>
              <p className="text-sm text-gray-400 mt-1">Share your link to start building your network</p>
            </div>
          ) : (
            mockReferralNetwork.map(node => (
              <ReferralCard key={node.id} node={node} depth={0} />
            ))
          )}
        </div>
      </div>

    </div>
  );
}
