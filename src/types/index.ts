export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'affiliate' | 'admin';
  referralCode: string;
  referredBy?: string;
  stage: number;
  subscriptionStatus: 'trial' | 'premium' | 'expired';
  createdAt: string;
  trialEndsAt: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  modules: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number;
  isFree: boolean;
  submodules: SubModule[];
}

export interface SubModule {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  orderIndex: number;
  videos: Video[];
}

export interface Video {
  id: string;
  submoduleId: string;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

export interface Subscription {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  nextPaymentDate: string;
}

export interface Commission {
  id: string;
  payerId: string;
  payerName: string;
  beneficiaryId: string;
  courseId: string;
  level: number;
  amount: number;
  status: 'pending' | 'withdrawable' | 'withdrawn';
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: string;
}

export interface ReferralNode {
  id: string;
  userId: string;
  name: string;
  referredUserId: string;
  referredName: string;
  level: number;
  subscriptionStatus: 'trial' | 'premium' | 'expired';
  createdAt: string;
  children?: ReferralNode[];
}
