import React, { useState } from 'react';
import { User, LogOut, Settings, CreditCard, HelpCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#0a0f1d] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Property Analyzer</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#161b2b] border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-800">
                      <p className="text-xs text-gray-500">Analyses Remaining</p>
                      <p className="text-sm font-semibold text-emerald-500">
                        {user.subscription === 'pro' ? 'Unlimited' : user.analysesRemaining}
                      </p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/subscription" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      <CreditCard className="w-4 h-4" /> Subscription
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <Link to="/help" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                      <HelpCircle className="w-4 h-4" /> Help Center
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 text-left"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-gray-800 px-4 py-4 space-y-4">
          {user && (
            <>
              <Link to="/profile" className="block text-gray-300 hover:text-white text-lg font-medium">Profile</Link>
              <Link to="/subscription" className="block text-gray-300 hover:text-white text-lg font-medium">Subscription</Link>
              <Link to="/settings" className="block text-gray-300 hover:text-white text-lg font-medium">Settings</Link>
            </>
          )}
          <div className="pt-4 border-t border-gray-800">
            {user ? (
              <button onClick={logout} className="w-full text-left text-red-400 text-lg font-medium">Logout</button>
            ) : (
              <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
