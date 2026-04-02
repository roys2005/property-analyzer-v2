// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider, appleProvider } from '../lib/firebase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkUsageLimit: () => boolean;
  decrementAnalyses: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          subscription: 'free',
          analysesRemaining: 5,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => { await signInWithPopup(auth, googleProvider); };
  const loginWithFacebook = async () => { await signInWithPopup(auth, facebookProvider); };
  const loginWithApple = async () => { await signInWithPopup(auth, appleProvider); };

  // --- NEW EMAIL METHODS ---
  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithEmail = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => { await signOut(auth); };

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
    <AuthContext.Provider value={{ 
      user, loading, loginWithGoogle, loginWithFacebook, loginWithApple, 
      loginWithEmail, signupWithEmail, logout, checkUsageLimit, decrementAnalyses 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};