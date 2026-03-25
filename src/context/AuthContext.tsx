import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: 'student' | 'admin') => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, refCode?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string, role: 'student' | 'admin' = 'student') => {
    console.log('Login:', email, role);
    setUser({
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'John Doe',
      email,
      phone: '08012345678',
      role,
      referralCode: 'SELL-AB12XZ',
      stage: 1,
      createdAt: new Date().toISOString(),
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const register = async (name: string, email: string, phone: string, _password: string, refCode?: string) => {
    console.log('Register:', name, email, phone, refCode);
    setUser({
      id: '1',
      name,
      email,
      phone,
      role: 'student',
      referralCode: 'SELL-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      referredBy: refCode,
      stage: 1,
      createdAt: new Date().toISOString(),
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
