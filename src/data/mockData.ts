import type { Course, Commission, Withdrawal, ReferralNode } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'first-50k',
    title: 'Make Your First ₦10k–₦50k Online',
    description: 'The proven beginner playbook. No hype — just systems that actually work in Nigeria today.',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop',
    modules: [
      {
        id: 'm1', courseId: '1', title: 'Module 1: The Money Mindset', orderIndex: 1, isFree: true,
        submodules: [
          { id: 's1', moduleId: 'm1', title: 'Why Most People Never Make Money Online', description: 'Identifying and eliminating limiting beliefs.', orderIndex: 1, videos: [{ id: 'v1', submoduleId: 's1', title: 'Introduction', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 420, orderIndex: 1 }] },
          { id: 's2', moduleId: 'm1', title: 'Setting Up Your Digital Workspace', description: 'Essential tools every earner needs.', orderIndex: 2, videos: [{ id: 'v2', submoduleId: 's2', title: 'Workspace Setup', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 560, orderIndex: 1 }] },
          { id: 's3', moduleId: 'm1', title: 'Your First ₦1,000 Challenge', description: 'A practical 48-hour challenge to prove it works.', orderIndex: 3, videos: [{ id: 'v3', submoduleId: 's3', title: 'The Challenge', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 380, orderIndex: 1 }] },
        ]
      },
      {
        id: 'm2', courseId: '1', title: 'Module 2: Choosing Your Money Channel', orderIndex: 2, isFree: false,
        submodules: [
          { id: 's4', moduleId: 'm2', title: 'The 5 Fastest Channels for Nigerians', description: 'A breakdown of what works and what doesn\'t.', orderIndex: 1, videos: [{ id: 'v4', submoduleId: 's4', title: 'Money Channels', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 720, orderIndex: 1 }] },
          { id: 's5', moduleId: 'm2', title: 'Niche Selection Framework', description: 'How to pick the right niche for you.', orderIndex: 2, videos: [{ id: 'v5', submoduleId: 's5', title: 'Niche Selection', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 645, orderIndex: 1 }] },
        ]
      },
      {
        id: 'm3', courseId: '1', title: 'Module 3: Traffic & Audience Building', orderIndex: 3, isFree: false,
        submodules: [
          { id: 's6', moduleId: 'm3', title: 'Growing Your WhatsApp Audience to 1,000', description: 'Step-by-step contact building system.', orderIndex: 1, videos: [{ id: 'v6', submoduleId: 's6', title: 'Audience Building', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 810, orderIndex: 1 }] },
        ]
      },
    ]
  },
  {
    id: '2',
    slug: 'whatsapp-monetization',
    title: 'WhatsApp Monetization Mastery',
    description: 'Turn your WhatsApp status, channels, and broadcast lists into a consistent cash machine.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop',
    modules: [
      {
        id: 'm4', courseId: '2', title: 'Module 1: WhatsApp Business Setup', orderIndex: 1, isFree: true,
        submodules: [
          { id: 's7', moduleId: 'm4', title: 'Setting Up WhatsApp Business Pro', description: 'Full configuration walkthrough.', orderIndex: 1, videos: [{ id: 'v7', submoduleId: 's7', title: 'WA Business Setup', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 480, orderIndex: 1 }] },
          { id: 's8', moduleId: 'm4', title: 'The Status Money Formula', description: 'How to sell through status updates every single day.', orderIndex: 2, videos: [{ id: 'v8', submoduleId: 's8', title: 'Status Formula', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 600, orderIndex: 1 }] },
        ]
      },
      {
        id: 'm5', courseId: '2', title: 'Module 2: Broadcast & Channel Strategy', orderIndex: 2, isFree: false,
        submodules: [
          { id: 's9', moduleId: 'm5', title: 'Building a 10,000-Member Broadcast List', description: 'The exact strategy top earners use.', orderIndex: 1, videos: [{ id: 'v9', submoduleId: 's9', title: 'Broadcast Strategy', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 720, orderIndex: 1 }] },
        ]
      },
    ]
  },
  {
    id: '3',
    slug: 'affiliate-marketing',
    title: 'Affiliate Marketing from Scratch',
    description: 'Pick the right niches, set up your funnels, and close commissions every single day.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    modules: [
      {
        id: 'm6', courseId: '3', title: 'Module 1: Affiliate Fundamentals', orderIndex: 1, isFree: true,
        submodules: [
          { id: 's10', moduleId: 'm6', title: 'How Affiliate Marketing Works in Nigeria', description: 'The mechanics explained simply.', orderIndex: 1, videos: [{ id: 'v10', submoduleId: 's10', title: 'Affiliate Basics', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 420, orderIndex: 1 }] },
          { id: 's11', moduleId: 'm6', title: 'Top 10 Nigerian Affiliate Programs', description: 'The highest paying programs available right now.', orderIndex: 2, videos: [{ id: 'v11', submoduleId: 's11', title: 'Top Programs', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 540, orderIndex: 1 }] },
        ]
      },
      {
        id: 'm7', courseId: '3', title: 'Module 2: Your Affiliate Funnel', orderIndex: 2, isFree: false,
        submodules: [
          { id: 's12', moduleId: 'm7', title: 'Building a Simple WhatsApp Funnel', description: 'No website needed — just your phone.', orderIndex: 1, videos: [{ id: 'v12', submoduleId: 's12', title: 'Funnel Building', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 680, orderIndex: 1 }] },
        ]
      },
    ]
  },
  {
    id: '4',
    slug: 'digital-reselling',
    title: 'Digital Products Reselling',
    description: 'Build a passive income engine by creating and reselling e-books, templates, and digital tools.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    modules: [
      {
        id: 'm8', courseId: '4', title: 'Module 1: Finding & Evaluating Products', orderIndex: 1, isFree: true,
        submodules: [
          { id: 's13', moduleId: 'm8', title: 'The Best Digital Products to Resell in 2026', description: 'A curated list with profit margins.', orderIndex: 1, videos: [{ id: 'v13', submoduleId: 's13', title: 'Product Research', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 500, orderIndex: 1 }] },
        ]
      },
      {
        id: 'm9', courseId: '4', title: 'Module 2: Creating Your Own Products', orderIndex: 2, isFree: false,
        submodules: [
          { id: 's14', moduleId: 'm9', title: 'Writing Your First E-Book in 3 Days', description: 'A fast-track system to productize your knowledge.', orderIndex: 1, videos: [{ id: 'v14', submoduleId: 's14', title: 'E-Book Creation', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 760, orderIndex: 1 }] },
        ]
      },
    ]
  },
  {
    id: '5',
    slug: 'arbitrage-strategies',
    title: 'Simple Arbitrage Strategies',
    description: 'Profit from price differences across platforms and markets. Low risk, fast returns.',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    modules: [
      {
        id: 'm10', courseId: '5', title: 'Module 1: What is Arbitrage?', orderIndex: 1, isFree: true,
        submodules: [
          { id: 's15', moduleId: 'm10', title: 'Understanding Price Gaps', description: 'How to spot and exploit pricing opportunities.', orderIndex: 1, videos: [{ id: 'v15', submoduleId: 's15', title: 'Arbitrage Intro', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 390, orderIndex: 1 }] },
          { id: 's16', moduleId: 'm10', title: 'Platforms to Start With (No Capital Needed)', description: 'Start arbitrage with zero upfront cost.', orderIndex: 2, videos: [{ id: 'v16', submoduleId: 's16', title: 'Getting Started', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 470, orderIndex: 1 }] },
        ]
      },
    ]
  }
];

// 7-day daily earnings mock (today = index 6)
export const mockDailyEarnings = [
  { day: 'Mon', amount: 3250 },
  { day: 'Tue', amount: 0 },
  { day: 'Wed', amount: 4000 },
  { day: 'Thu', amount: 750 },
  { day: 'Fri', amount: 3250 },
  { day: 'Sat', amount: 0 },
  { day: 'Today', amount: 6750 },
];

export const mockCommissions: Commission[] = [
  { id: '1', payerId: '2', payerName: 'Emeka Okafor', beneficiaryId: '1', courseId: '1', level: 1, amount: 3250, status: 'withdrawable', createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
  { id: '2', payerId: '3', payerName: 'Fatima Aliyu', beneficiaryId: '1', courseId: '2', level: 1, amount: 3250, status: 'withdrawable', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: '3', payerId: '4', payerName: 'Bayo Adeleke', beneficiaryId: '1', courseId: '1', level: 2, amount: 750, status: 'pending', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: '4', payerId: '5', payerName: 'Ada Eze', beneficiaryId: '1', courseId: '3', level: 2, amount: 750, status: 'withdrawn', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', payerId: '6', payerName: 'Chidi Nwosu', beneficiaryId: '1', courseId: '2', level: 3, amount: 250, status: 'withdrawn', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '6', payerId: '7', payerName: 'Ngozi Obi', beneficiaryId: '1', courseId: '4', level: 4, amount: 150, status: 'withdrawn', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '7', payerId: '8', payerName: 'Musa Ibrahim', beneficiaryId: '1', courseId: '1', level: 1, amount: 3250, status: 'withdrawn', createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
];

export const mockWithdrawals: Withdrawal[] = [
  { id: '1', userId: '1', amount: 15000, bankName: 'GTBank', accountNumber: '0123456789', accountName: 'John Doe', status: 'approved', createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '2', userId: '1', amount: 5000, bankName: 'Access Bank', accountNumber: '0987654321', accountName: 'John Doe', status: 'pending', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
];

export const mockReferralNetwork: ReferralNode[] = [
  {
    id: 'r1', userId: '1', name: 'You', referredUserId: '2', referredName: 'Emeka Okafor',
    level: 1, subscriptionStatus: 'premium', createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    children: [
      {
        id: 'r4', userId: '2', name: 'Emeka Okafor', referredUserId: '4', referredName: 'Bayo Adeleke',
        level: 2, subscriptionStatus: 'premium', createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        children: [
          { id: 'r7', userId: '4', name: 'Bayo Adeleke', referredUserId: '7', referredName: 'Ngozi Obi', level: 3, subscriptionStatus: 'trial', createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
      {
        id: 'r5', userId: '2', name: 'Emeka Okafor', referredUserId: '5', referredName: 'Ada Eze',
        level: 2, subscriptionStatus: 'trial', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  },
  {
    id: 'r2', userId: '1', name: 'You', referredUserId: '3', referredName: 'Fatima Aliyu',
    level: 1, subscriptionStatus: 'premium', createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    children: [
      {
        id: 'r6', userId: '3', name: 'Fatima Aliyu', referredUserId: '6', referredName: 'Chidi Nwosu',
        level: 2, subscriptionStatus: 'premium', createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        children: [
          { id: 'r8', userId: '6', name: 'Chidi Nwosu', referredUserId: '8', referredName: 'Musa Ibrahim', level: 3, subscriptionStatus: 'premium', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() }
        ]
      },
    ]
  },
  {
    id: 'r3', userId: '1', name: 'You', referredUserId: '9', referredName: 'Kemi Adeyemi',
    level: 1, subscriptionStatus: 'trial', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockSubscriptions = [
  { courseId: '1', status: 'active' },
  { courseId: '2', status: 'active' },
  { courseId: '3', status: 'active' },
];

// Mock course progress (lessonId -> completed)
export const mockCourseProgress: Record<string, number> = {
  '1': 65,
  '2': 30,
  '3': 10,
  '4': 0,
  '5': 0,
};
