import type { Course, Commission, Withdrawal, Referral } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'first-50k',
    title: 'How to Make Your First ₦10k–₦50k Online',
    description: 'Learn the basics of making money online with simple strategies anyone can follow.',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
    modules: [
      {
        id: 'm1',
        courseId: '1',
        title: 'Module 1: Introduction',
        orderIndex: 1,
        isFree: true,
        submodules: [
          {
            id: 's1',
            moduleId: 'm1',
            title: 'What is Online Income?',
            description: 'Understanding the various ways to earn money online.',
            orderIndex: 1,
            videos: [{ id: 'v1', submoduleId: 's1', title: 'Introduction Video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 300, orderIndex: 1 }]
          },
          {
            id: 's2',
            moduleId: 'm1',
            title: 'Setting Up Your Mindset',
            description: 'Mental preparation for your online journey.',
            orderIndex: 2,
            videos: [{ id: 'v2', submoduleId: 's2', title: 'Mindset Mastery', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 450, orderIndex: 1 }]
          }
        ]
      },
      {
        id: 'm2',
        courseId: '1',
        title: 'Module 2: Getting Started',
        orderIndex: 2,
        isFree: false,
        submodules: [
          {
            id: 's3',
            moduleId: 'm2',
            title: 'Choosing Your Niche',
            description: 'How to pick a profitable niche.',
            orderIndex: 1,
            videos: [{ id: 'v3', submoduleId: 's3', title: 'Niche Selection', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 600, orderIndex: 1 }]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'whatsapp-monetization',
    title: 'WhatsApp Monetization Basics',
    description: 'Turn your WhatsApp into a money-making machine with proven strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=400',
    modules: [
      {
        id: 'm3',
        courseId: '2',
        title: 'Module 1: Getting Started',
        orderIndex: 1,
        isFree: true,
        submodules: [
          {
            id: 's4',
            moduleId: 'm3',
            title: 'WhatsApp Business Setup',
            description: 'Setting up WhatsApp Business for profit.',
            orderIndex: 1,
            videos: [{ id: 'v4', submoduleId: 's4', title: 'Business Setup Guide', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 400, orderIndex: 1 }]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    slug: 'affiliate-marketing',
    title: 'Affiliate Marketing Intro',
    description: 'Start earning commissions by promoting products you love.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    modules: [
      {
        id: 'm4',
        courseId: '3',
        title: 'Module 1: Fundamentals',
        orderIndex: 1,
        isFree: true,
        submodules: [
          {
            id: 's5',
            moduleId: 'm4',
            title: 'What is Affiliate Marketing?',
            description: 'Understanding the affiliate model.',
            orderIndex: 1,
            videos: [{ id: 'v5', submoduleId: 's5', title: 'Affiliate Basics', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 350, orderIndex: 1 }]
          }
        ]
      }
    ]
  },
  {
    id: '4',
    slug: 'digital-reselling',
    title: 'Reselling Digital Products',
    description: 'Create and resell digital products for passive income.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    modules: [
      {
        id: 'm5',
        courseId: '4',
        title: 'Module 1: Finding Products',
        orderIndex: 1,
        isFree: true,
        submodules: [
          {
            id: 's6',
            moduleId: 'm5',
            title: 'Where to Find Digital Products',
            description: 'Marketplaces and sourcing strategies.',
            orderIndex: 1,
            videos: [{ id: 'v6', submoduleId: 's6', title: 'Sourcing Guide', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 500, orderIndex: 1 }]
          }
        ]
      }
    ]
  },
  {
    id: '5',
    slug: 'arbitrage-strategies',
    title: 'Simple Arbitrage Strategies',
    description: 'Profit from price differences across markets.',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
    modules: [
      {
        id: 'm6',
        courseId: '5',
        title: 'Module 1: Introduction',
        orderIndex: 1,
        isFree: true,
        submodules: [
          {
            id: 's7',
            moduleId: 'm6',
            title: 'What is Arbitrage?',
            description: 'Basic concepts of arbitrage trading.',
            orderIndex: 1,
            videos: [{ id: 'v7', submoduleId: 's7', title: 'Arbitrage 101', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: 420, orderIndex: 1 }]
          }
        ]
      }
    ]
  }
];

export const mockCommissions: Commission[] = [
  { id: '1', payerId: '2', beneficiaryId: '1', courseId: '1', level: 1, amount: 3250, status: 'withdrawable', createdAt: '2026-03-20T10:00:00Z' },
  { id: '2', payerId: '3', beneficiaryId: '1', courseId: '1', level: 1, amount: 3250, status: 'pending', createdAt: '2026-03-22T14:00:00Z' },
  { id: '3', payerId: '4', beneficiaryId: '1', courseId: '2', level: 2, amount: 750, status: 'withdrawable', createdAt: '2026-03-18T09:00:00Z' },
];

export const mockWithdrawals: Withdrawal[] = [
  { id: '1', userId: '1', amount: 15000, bankName: 'GTBank', accountNumber: '0123456789', accountName: 'John Doe', status: 'approved', createdAt: '2026-03-15T10:00:00Z' },
  { id: '2', userId: '1', amount: 5000, bankName: 'Access Bank', accountNumber: '0987654321', accountName: 'John Doe', status: 'pending', createdAt: '2026-03-23T08:00:00Z' },
];

export const mockReferrals: Referral[] = [
  { id: '1', userId: '1', referredUserId: '2', level: 1, createdAt: '2026-03-01T10:00:00Z' },
  { id: '2', userId: '1', referredUserId: '3', level: 1, createdAt: '2026-03-05T14:00:00Z' },
  { id: '3', userId: '2', referredUserId: '4', level: 2, createdAt: '2026-03-10T09:00:00Z' },
];

export const mockSubscriptions = [
  { courseId: '1', status: 'active' },
  { courseId: '2', status: 'active' },
];
