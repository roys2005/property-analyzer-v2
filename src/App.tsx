import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './LandingPage';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { SubscriptionPage } from './components/SubscriptionPage';
import { SavedDeals } from './components/SavedDeals';

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
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="/saved" element={<SavedDeals />} />
                {/* Fallback */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </main>
            
            <footer className="bg-[#0a0f1d] border-t border-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">P</span>
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">Property Analyzer</span>
                </div>
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Property Analyzer Platform. All rights reserved.
                </p>
                <div className="mt-4 flex justify-center gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
                  <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
                  <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </PropertyProvider>
    </AuthProvider>
  );
}
