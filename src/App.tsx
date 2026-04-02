import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './LandingPage';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { SubscriptionPage } from './components/SubscriptionPage';
import { SavedDeals } from './components/SavedDeals';
import { Profile } from './components/Profile';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Router>
          <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-emerald-500/30 selection:text-emerald-500">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/analyze" element={<AnalysisDashboard />} />
                <Route path="/saved" element={<SavedDeals />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Standard Legal & Contact Pages */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                
                {/* Fallback */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </main>
            
            <footer className="bg-white border-t border-gray-200 py-12 print:hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {/* Using your new logo image here instead of the 'P' icon */}
                  <img src="/logo.svg" alt="Property Analyzer Logo" className="w-6 h-6 object-contain" />
                  <span className="text-lg font-bold text-gray-900 tracking-tight">Property Analyzer</span>
                </div>
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Property Analyzer Platform. All rights reserved.
                </p>
                <div className="mt-4 flex justify-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <Link to="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
                  <Link to="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
                  <Link to="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}
