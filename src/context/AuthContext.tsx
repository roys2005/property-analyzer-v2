import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  checkUsageLimit: () => boolean;
  decrementAnalyses: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Mock initial user
    setUser({
      id: '1',
      email: 'Suryawmoni@gmail.com',
      name: 'Moni Surya',
      subscription: 'free',
      analysesRemaining: 5,
    });
  }, []);

  const login = () => {
    // Placeholder
  };

  const logout = () => {
    setUser(null);
  };

  const checkUsageLimit = () => {
    if (!user) return false;
    return user.analysesRemaining > 0 || user.subscription === 'pro';
  };

  const decrementAnalyses = () => {
    if (user && user.subscription === 'free') {
      setUser(prev => prev ? { ...prev, analysesRemaining: prev.analysesRemaining - 1 } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUsageLimit, decrementAnalyses }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
