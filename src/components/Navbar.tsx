import React, { useState } from 'react';
import {
  User, LogOut, LayoutDashboard, Menu, X,
  Mail, ArrowLeft, Loader2, FolderOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logoImg from '../../public/logo.svg'; // Adjust path if needed

export const Navbar: React.FC = () => {
  const {
    user, logout, loginWithGoogle, loginWithFacebook,
    loginWithApple, loginWithEmail, signupWithEmail
  } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'main' | 'email-login' | 'email-signup'>('main');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSocialLogin = async (loginMethod: () => Promise<void>) => {
    try {
      await loginMethod();
      closeModal();
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      if (authView === 'email-signup') {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      closeModal();
    } catch (error: any) {
      const msg = error.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '');
      setAuthError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      setAuthView('main');
      setEmail('');
      setPassword('');
      setAuthError('');
    }, 300);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 print:hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src={logoImg}
                  alt="Property Analyzer Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold text-gray-900 tracking-tight">Property Analyzer</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                      {user.email ? (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-500 text-white font-bold uppercase">
                          {user.email.charAt(0)}
                        </div>
                      ) : (
                        <User className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <p className="text-sm font-semibold text-emerald-600 mt-1">
                          {user.subscription === 'pro' ? 'Pro Plan' : `${user.analysesRemaining} Credits Left`}
                        </p>
                      </div>

                      <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 text-gray-400" /> Account Settings
                      </Link>

                      <Link to="/saved" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <FolderOpen className="w-4 h-4 text-gray-400" /> Saved Deals
                      </Link>

                      <button
                        onClick={() => { logout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-500/20"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-900">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4 shadow-lg">
            {user ? (
              <>
                <div className="pb-4 border-b border-gray-100">
                  <p className="text-gray-900 font-bold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-600 hover:text-emerald-500 text-lg font-medium">Account Settings</Link>
                <Link to="/saved" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-600 hover:text-emerald-500 text-lg font-medium">Saved Deals</Link>

                <div className="pt-4 border-t border-gray-100">
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-left text-red-500 text-lg font-medium">Logout</button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-500/20"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">

            {/* Modal Header */}
            <div className="relative p-6 text-center border-b border-gray-100">
              {authView !== 'main' && (
                <button
                  onClick={() => { setAuthView('main'); setAuthError(''); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-xl font-bold text-gray-900">
                {authView === 'main' ? 'Welcome Back' : authView === 'email-login' ? 'Sign In' : 'Create Account'}
              </h2>
              <button
                onClick={closeModal}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {authError && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center">
                  {authError}
                </div>
              )}

              {/* MAIN VIEW */}
              {authView === 'main' && (
                <div className="space-y-3">
                  <button onClick={() => handleSocialLogin(loginWithGoogle)} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>
                  <button onClick={() => handleSocialLogin(loginWithApple)} className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white py-3.5 rounded-xl font-bold transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.93 3.57-.84 1.51.15 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.62 1.54-1.43 2.97-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Continue with Apple
                  </button>
                  <button onClick={() => handleSocialLogin(loginWithFacebook)} className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white py-3.5 rounded-xl font-bold transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </button>

                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Or</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  <button onClick={() => setAuthView('email-login')} className="w-full flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition-colors">
                    <Mail className="w-5 h-5 text-gray-500" /> Continue with Email
                  </button>
                </div>
              )}

              {/* EMAIL VIEW */}
              {authView !== 'main' && (
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white py-3.5 rounded-xl font-bold transition-colors flex justify-center items-center gap-2 mt-6 shadow-md shadow-emerald-500/20"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {authView === 'email-login' ? 'Sign In' : 'Create Account'}
                  </button>

                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthView(authView === 'email-login' ? 'email-signup' : 'email-login');
                        setAuthError('');
                      }}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      {authView === 'email-login'
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};