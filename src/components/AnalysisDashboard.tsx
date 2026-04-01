import React from 'react';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { 
  DollarSign, 
  Percent, 
  TrendingUp, 
  Home, 
  Save, 
  ArrowLeft,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GeminiInsights } from './GeminiInsights';
import { cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const AnalysisDashboard: React.FC = () => {
  const { selectedProperty, financials, setFinancials, calculateROI } = useProperty();
  const { decrementAnalyses } = useAuth();
  const results = calculateROI();

  if (!selectedProperty) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
        <Home className="w-16 h-16 mb-4 opacity-20" />
        <p className="text-xl font-medium">No property selected for analysis.</p>
        <Link to="/" className="mt-4 text-emerald-500 hover:underline">Return to search</Link>
      </div>
    );
  }

  const expenseData = [
    { name: 'Mortgage', value: results.monthlyMortgage, color: '#3b82f6' },
    { name: 'Taxes', value: financials.annualTaxes / 12, color: '#f59e0b' },
    { name: 'Insurance', value: financials.annualInsurance / 12, color: '#a855f7' },
    { name: 'HOA', value: financials.monthlyHOA, color: '#ec4899' },
    { name: 'Maintenance', value: (financials.monthlyRent * financials.maintenancePercent) / 100, color: '#10b981' },
  ];

  const totalMonthlyExpense = expenseData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{selectedProperty.address}</h1>
            <p className="text-gray-500 text-sm">{selectedProperty.city}, {selectedProperty.state} • Listed at ${selectedProperty.price.toLocaleString()}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20">
          <Save className="w-4 h-4" />
          Save Deal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-bold text-white">Investment Parameters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Purchase Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={financials.purchasePrice}
                    onChange={(e) => setFinancials({ ...financials, purchasePrice: Number(e.target.value) })}
                    className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-3 pl-8 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Down Payment (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={financials.downPaymentPercent}
                      onChange={(e) => setFinancials({ ...financials, downPaymentPercent: Number(e.target.value) })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Interest Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={financials.interestRate}
                      onChange={(e) => setFinancials({ ...financials, interestRate: Number(e.target.value) })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Monthly Rent</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={financials.monthlyRent}
                    onChange={(e) => setFinancials({ ...financials, monthlyRent: Number(e.target.value) })}
                    className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-3 pl-8 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Annual Expenses</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Property Taxes</label>
                    <input
                      type="number"
                      value={financials.annualTaxes}
                      onChange={(e) => setFinancials({ ...financials, annualTaxes: Number(e.target.value) })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-2 px-3 text-sm text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">Insurance</label>
                    <input
                      type="number"
                      value={financials.annualInsurance}
                      onChange={(e) => setFinancials({ ...financials, annualInsurance: Number(e.target.value) })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl py-2 px-3 text-sm text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <GeminiInsights financials={financials} results={results} />
        </div>

        {/* Right Panel: Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Home className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Positive</span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Monthly Mortgage</p>
              <h3 className="text-3xl font-bold text-white">${results.monthlyMortgage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>

            <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  results.monthlyCashFlow > 0 ? "text-emerald-500" : "text-red-500"
                )}>
                  {results.monthlyCashFlow > 0 ? 'Positive' : 'Negative'}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Monthly Cash Flow</p>
              <h3 className={cn(
                "text-3xl font-bold",
                results.monthlyCashFlow > 0 ? "text-emerald-500" : "text-red-500"
              )}>
                ${results.monthlyCashFlow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>

            <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Cap Rate</p>
              <h3 className="text-3xl font-bold text-white">{results.capRate.toFixed(2)}%</h3>
            </div>

            <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Percent className="w-5 h-5 text-purple-500" />
                </div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Positive</span>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Cash-on-Cash ROI</p>
              <h3 className="text-3xl font-bold text-white">{results.cashOnCashROI.toFixed(2)}%</h3>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-[#161b2b] border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <PieChartIcon className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-white">Expense Breakdown</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#161b2b', border: '1px solid #374151', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {expenseData.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.name}</span>
                      <span className="text-white font-bold">${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${(item.value / totalMonthlyExpense) * 100}%`,
                          backgroundColor: item.color 
                        }} 
                      />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Monthly Expense</span>
                  <span className="text-xl font-bold text-white">${totalMonthlyExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
