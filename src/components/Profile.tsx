// src/components/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, CreditCard, Settings, Shield, 
  Check, Zap, Bell, Globe, Lock, LogOut, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

type TabType = 'personal' | 'subscription' | 'preferences' | 'security';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [isUpgrading, setIsUpgrading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
    currency: 'USD',
    notifications: true,
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const handleUpgrade = async () => {
    if (!user) return;
    setIsUpgrading(true);

    try {
      const docRef = await addDoc(collection(db, "customers", user.id, "checkout_sessions"), {
        price: "price_1THlBr6pqGsIi0D4zZTF2KGt", // Replace with your actual Stripe Price ID
        success_url: window.location.origin + "/profile",
        cancel_url: window.location.origin + "/profile",
      });

      onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data?.error) {
          alert(`Error: ${data.error.message}`);
          setIsUpgrading(false);
        }
        if (data?.url) {
          window.location.assign(data.url);
        }
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong loading checkout.");
      setIsUpgrading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-2 sticky top-24 shadow-sm">
              <TabButton active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} icon={<User className="w-5 h-5" />} label="Personal Info" />
              <TabButton active={activeTab === 'subscription'} onClick={() => setActiveTab('subscription')} icon={<CreditCard className="w-5 h-5" />} label="Subscription" />
              <TabButton active={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')} icon={<Settings className="w-5 h-5" />} label="Preferences" />
              <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Shield className="w-5 h-5" />} label="Security" />
              
              <div className="h-px bg-gray-100 my-2" />
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[500px]">
              
              {/* --- TAB: PERSONAL INFO --- */}
              {activeTab === 'personal' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="text-emerald-500" /> Personal Information
                  </h2>
                  
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-white uppercase shadow-lg shadow-emerald-500/20">
                      {user.email.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                      <p className="text-gray-500">{user.email}</p>
                      <button className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
                      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} disabled />
                      <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
                      <InputField label="Company (Optional)" name="company" value={formData.company} onChange={handleInputChange} placeholder="Real Estate LLC" />
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-emerald-500/20">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* --- TAB: SUBSCRIPTION --- */}
              {activeTab === 'subscription' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CreditCard className="text-emerald-500" /> Subscription & Billing
                  </h2>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Current Plan</p>
                        <h3 className="text-2xl font-bold text-gray-900 capitalize">
                          {user.subscription} Tier
                        </h3>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-center shadow-sm">
                        <p className="text-xs text-gray-500 font-medium">Analyses Left</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {user.subscription === 'pro' ? 'Unlimited' : user.analysesRemaining}
                        </p>
                      </div>
                    </div>
                    
                    {user.subscription === 'free' && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(user.analysesRemaining / 5) * 100}%` }}></div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">Resets automatically on the 1st of every month.</p>
                  </div>

                  {user.subscription === 'free' && (
                    <div className="border border-emerald-500/30 bg-emerald-50/50 rounded-2xl p-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-emerald-500" /> Upgrade to Pro
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> 50 ROI Analyses per month</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> Advanced Comparable (Comps) Data</li>
                            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500"/> Save unlimited deals to Dashboard</li>
                          </ul>
                        </div>
                        <div className="text-center w-full sm:w-auto">
                          <p className="text-2xl font-bold text-gray-900 mb-3">$19<span className="text-sm text-gray-500">/mo</span></p>
                          <button 
                            onClick={handleUpgrade}
                            disabled={isUpgrading}
                            className="w-full flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-emerald-500/20"
                          >
                            {isUpgrading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isUpgrading ? 'Loading...' : 'Upgrade Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB: PREFERENCES --- */}
              {activeTab === 'preferences' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="text-emerald-500" /> App Preferences
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Globe className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-gray-900 font-medium">Display Currency</p>
                          <p className="text-sm text-gray-500">Choose your preferred currency format</p>
                        </div>
                      </div>
                      <select 
                        name="currency" 
                        value={formData.currency} 
                        onChange={handleInputChange}
                        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none shadow-sm"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <Bell className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="text-gray-900 font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive alerts when saved deals change status</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={formData.notifications} onChange={(e) => setFormData({...formData, notifications: e.target.checked})} />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: SECURITY --- */}
              {activeTab === 'security' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="text-emerald-500" /> Security Settings
                  </h2>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-gray-400" /> Change Password
                    </h3>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <InputField label="Current Password" type="password" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="New Password" type="password" />
                        <InputField label="Confirm New Password" type="password" />
                      </div>
                      <div className="pt-2">
                        <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium w-full text-left
      ${active 
        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
      }
    `}
  >
    {icon}
    {label}
  </button>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, disabled = false }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
    />
  </div>
);