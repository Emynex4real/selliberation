import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isTrialActive: boolean;
  trialDaysLeft: number;
  login: (email: string, password: string, role?: 'student' | 'admin') => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, refCode?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'selliberation_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const trialEnds = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
  const trialDaysLeft = trialEnds
    ? Math.max(0, Math.ceil((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const isTrialActive = user?.subscriptionStatus === 'trial' && trialDaysLeft > 0;

  const login = async (email: string, _password: string, role: 'student' | 'admin' = 'student') => {
    const newUser: User = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'John Doe',
      email,
      phone: '08012345678',
      role,
      referralCode: 'SELL-AB12XZ',
      stage: 2,
      subscriptionStatus: role === 'admin' ? 'premium' : 'trial',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      trialEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setUser(newUser);
  };

  const register = async (
    name: string, email: string, phone: string, _password: string, refCode?: string
  ) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role: 'student',
      referralCode: 'SELL-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      referredBy: refCode,
      stage: 1,
      subscriptionStatus: 'trial',
      createdAt: new Date().toISOString(),
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    setUser(newUser);
  };

  const logout = () => setUser(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isTrialActive, trialDaysLeft, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
