// src/components/AnalysisDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, Check, Loader2, Calculator, TrendingUp, DollarSign, 
  ArrowLeft, Share2, Printer
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext'; 
import { saveDealToFirestore } from '../services/dbService';
import { GeminiInsights } from './GeminiInsights';

export const AnalysisDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Use 'selectedProperty' from context, aliased to 'property' for convenience
  const { selectedProperty: property, financials, setFinancials, calculateROI } = useProperty();
  
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!property) navigate('/');
  }, [property, navigate]);

  // Calculate results on the fly using the context function
  const results = calculateROI();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Direct pass to context setFinancials, ensuring keys match types.ts
    setFinancials({
      ...financials,
      [name]: parseFloat(value) || 0
    });
  };

  const handleSaveDeal = async () => {
    if (!user) {
      alert("Please sign in to save deals.");
      return;
    }
    if (!property) return;
    
    setIsSaving(true);
    try {
      await saveDealToFirestore({
        userId: user.id,
        property: property,
        financials: financials,
        results: results,
        aiInsights: aiInsights
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to save deal.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Property Analysis Report',
        text: `Check out the ROI analysis for ${property?.address}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!property) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pb-12 print:bg-white print:text-black">
      
      {/* Action Toolbar */}
      <div className="bg-[#161b2b] border-b border-gray-800 sticky top-16 z-40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">{property.address}</h1>
              <p className="text-sm text-gray-400">{property.city}, {property.state}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={handleSaveDeal}
              disabled={isSaving || isSaved}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Deal'}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Print Only Header */}
        <div className="hidden print:block mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">{property.address}</h1>
          <p className="text-gray-600">Investment Analysis Report</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Financial Form */}
          <div className="lg:col-span-1 space-y-6 print:break-inside-avoid">
            <div className="bg-[#161b2b] p-6 rounded-2xl border border-gray-800 shadow-xl print:bg-white print:border-gray-200 print:shadow-none">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-500" /> Purchase Details
              </h2>
              
              <div className="space-y-4">
                <InputField label="Purchase Price" name="purchasePrice" value={financials.purchasePrice} symbol="$" onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Down Payment" name="downPaymentPercent" value={financials.downPaymentPercent} symbol="%" onChange={handleInputChange} />
                  <InputField label="Interest Rate" name="interestRate" value={financials.interestRate} symbol="%" onChange={handleInputChange} />
                </div>
                {/* Updated name to loanTerm */}
                <InputField label="Loan Term (Years)" name="loanTerm" value={financials.loanTerm} onChange={handleInputChange} />
              </div>

              <h2 className="text-xl font-bold mb-6 mt-8 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" /> Income & Expenses
              </h2>
              
              <div className="space-y-4">
                <InputField label="Monthly Rent" name="monthlyRent" value={financials.monthlyRent} symbol="$" onChange={handleInputChange} />
                {/* Updated names to match types.ts */}
                <InputField label="Annual Taxes" name="annualTaxes" value={financials.annualTaxes} symbol="$" onChange={handleInputChange} />
                <InputField label="Annual Insurance" name="annualInsurance" value={financials.annualInsurance} symbol="$" onChange={handleInputChange} />
                <InputField label="Monthly HOA" name="monthlyHOA" value={financials.monthlyHOA} symbol="$" onChange={handleInputChange} />
                <InputField label="Maintenance Est." name="maintenancePercent" value={financials.maintenancePercent} symbol="%" onChange={handleInputChange} />
                <InputField label="Vacancy Est." name="vacancyPercent" value={financials.vacancyPercent} symbol="%" onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* RIGHT: Results & Insights */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#161b2b] p-6 rounded-2xl border border-gray-800 shadow-xl print:bg-white print:border-gray-200">
                <p className="text-gray-400 text-sm font-medium mb-2 print:text-gray-600">Monthly Cash Flow</p>
                <h3 className={`text-3xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-emerald-500' : 'text-red-400'} print:text-black`}>
                  ${results.monthlyCashFlow.toFixed(2)}
                </h3>
              </div>
              <div className="bg-[#161b2b] p-6 rounded-2xl border border-gray-800 shadow-xl print:bg-white print:border-gray-200">
                <p className="text-gray-400 text-sm font-medium mb-2 print:text-gray-600">Cap Rate</p>
                <h3 className="text-3xl font-bold text-white print:text-black">
                  {results.capRate.toFixed(2)}%
                </h3>
              </div>
              <div className="bg-[#161b2b] p-6 rounded-2xl border border-gray-800 shadow-xl print:bg-white print:border-gray-200">
                <p className="text-gray-400 text-sm font-medium mb-2 print:text-gray-600">Cash-on-Cash ROI</p>
                <h3 className="text-3xl font-bold text-blue-400 print:text-black">
                  {results.cashOnCashROI.toFixed(2)}%
                </h3>
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="print:break-inside-avoid">
              <GeminiInsights 
                financials={financials} 
                results={results} 
                onInsightsGenerated={setAiInsights} 
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, value, symbol, onChange }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 print:text-gray-700">{label}</label>
    <div className="relative">
      {symbol && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{symbol}</span>}
      <input 
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-2.5 ${symbol ? 'pl-8' : 'pl-4'} pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all print:bg-gray-50 print:text-black print:border-gray-300`}
      />
    </div>
  </div>
);