// src/components/AnalysisDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, Check, Loader2, Calculator, DollarSign, 
  ArrowLeft, Share2, Printer, PieChart as PieChartIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext'; 
import { saveDealToFirestore } from '../services/dbService';
import { GeminiInsights } from './GeminiInsights';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const AnalysisDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { selectedProperty: property, financials, setFinancials, calculateROI } = useProperty();
  
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!property) navigate('/');
  }, [property, navigate]);

  const results = calculateROI();

  const annualNOI = (financials.monthlyRent * 12) - financials.annualTaxes - financials.annualInsurance - (financials.monthlyHOA * 12) - ((financials.monthlyRent * financials.maintenancePercent / 100) * 12) - ((financials.monthlyRent * financials.vacancyPercent / 100) * 12);
  const grossYield = financials.purchasePrice > 0 ? ((financials.monthlyRent * 12) / financials.purchasePrice) * 100 : 0;

  const expensesData = [
    { name: 'Mortgage', value: results.monthlyMortgage, color: '#10B981' }, 
    { name: 'Taxes', value: financials.annualTaxes / 12, color: '#3B82F6' }, 
    { name: 'Insurance', value: financials.annualInsurance / 12, color: '#8B5CF6' }, 
    { name: 'HOA', value: financials.monthlyHOA, color: '#F59E0B' }, 
    { name: 'Maintenance', value: financials.monthlyRent * (financials.maintenancePercent / 100), color: '#EF4444' }, 
    { name: 'Vacancy', value: financials.monthlyRent * (financials.vacancyPercent / 100), color: '#6B7280' }, 
  ].filter(item => item.value > 0); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  // Fixed Tooltip for light theme
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-lg">
          <p className="text-gray-500 text-sm mb-1">{payload[0].name}</p>
          <p className="text-gray-900 font-bold text-lg">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  if (!property) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 print:bg-white print:text-black">
      
      {/* Action Toolbar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 print:hidden shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{property.address}</h1>
              <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={handleSaveDeal}
              disabled={isSaving || isSaved}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save Deal'}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="hidden print:block mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold">{property.address}</h1>
          <p className="text-gray-600">Investment Analysis Report</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Financial Form */}
          <div className="lg:col-span-1 space-y-6 print:break-inside-avoid">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:shadow-none">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-500" /> Purchase Details
              </h2>
              
              <div className="space-y-4">
                <InputField label="Purchase Price" name="purchasePrice" value={financials.purchasePrice} symbol="$" onChange={handleInputChange} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Down Payment" name="downPaymentPercent" value={financials.downPaymentPercent} symbol="%" onChange={handleInputChange} />
                  <InputField label="Interest Rate" name="interestRate" value={financials.interestRate} symbol="%" onChange={handleInputChange} />
                </div>
                <InputField label="Loan Term (Years)" name="loanTerm" value={financials.loanTerm} onChange={handleInputChange} />
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" /> Income & Expenses
              </h2>
              
              <div className="space-y-4">
                <InputField label="Monthly Rent" name="monthlyRent" value={financials.monthlyRent} symbol="$" onChange={handleInputChange} />
                <InputField label="Annual Taxes" name="annualTaxes" value={financials.annualTaxes} symbol="$" onChange={handleInputChange} />
                <InputField label="Annual Insurance" name="annualInsurance" value={financials.annualInsurance} symbol="$" onChange={handleInputChange} />
                <InputField label="Monthly HOA" name="monthlyHOA" value={financials.monthlyHOA} symbol="$" onChange={handleInputChange} />
                <InputField label="Maintenance Est." name="maintenancePercent" value={financials.maintenancePercent} symbol="%" onChange={handleInputChange} />
                <InputField label="Vacancy Est." name="vacancyPercent" value={financials.vacancyPercent} symbol="%" onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* RIGHT: Results, Charts & Insights */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 6 KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Monthly Cash Flow</p>
                <h3 className={`text-2xl font-bold ${results.monthlyCashFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  ${results.monthlyCashFlow.toFixed(2)}
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Cap Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {results.capRate.toFixed(2)}%
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Cash-on-Cash ROI</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {results.cashOnCashROI.toFixed(2)}%
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Net Operating Income</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ${annualNOI.toFixed(2)}
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Total Investment</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ${results.totalInvestment.toLocaleString()}
                </h3>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Gross Yield</p>
                <h3 className="text-2xl font-bold text-purple-600">
                  {grossYield.toFixed(2)}%
                </h3>
              </div>
            </div>

            {/* Expense Breakdown Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm print:break-inside-avoid">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-emerald-500" /> Expense Breakdown
                </h2>
                <span className="text-2xl font-bold text-red-500">
                  ${results.monthlyExpenses.toFixed(2)}<span className="text-sm text-gray-500 font-normal"> /mo</span>
                </span>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expensesData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value) => <span className="text-gray-600 text-sm font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
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

const InputField = ({ label, name, value, symbol, onChange }: any) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</label>
    <div className="relative">
      {symbol && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{symbol}</span>}
      <input 
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 ${symbol ? 'pl-8' : 'pl-4'} pr-4 text-gray-900 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all shadow-sm`}
      />
    </div>
  </div>
);