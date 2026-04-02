// src/components/GeminiInsights.tsx
import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getGeminiSummary } from '../services/geminiService';
import { Financials, AnalysisResults } from '../types';

interface GeminiInsightsProps {
  financials: Financials;
  results: AnalysisResults;
  onInsightsGenerated?: (insights: string) => void; 
}

export const GeminiInsights: React.FC<GeminiInsightsProps> = ({ financials, results, onInsightsGenerated }) => {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const summary = await getGeminiSummary(financials, results);
      setInsights(summary);
      if (onInsightsGenerated) onInsightsGenerated(summary); 
    } catch (error) {
      setInsights("Unable to generate insights at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-emerald-500/30 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Gemini Insights</h3>
        </div>
        <button
          onClick={generateInsights}
          disabled={isLoading}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-1"
        >
          {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Regenerate'}
        </button>
      </div>

      <div className="relative min-h-[100px] z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm font-medium">Analyzing deal potential...</p>
          </div>
        ) : insights ? (
          <div className="text-gray-600 text-sm leading-relaxed">
            <ReactMarkdown 
              components={{
                strong: ({node, ...props}) => <span className="font-bold text-gray-900" {...props} />,
                p: ({node, ...props}) => <p className="mb-3" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-600" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-bold text-emerald-600 mb-2 mt-4" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-sm font-bold text-emerald-500 mb-2 mt-3" {...props} />
              }}
            >
              {insights}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <AlertCircle className="w-8 h-8 mb-2 opacity-40 text-gray-400" />
            <p className="text-sm font-medium">Click regenerate to get AI analysis</p>
            <button 
              onClick={generateInsights}
              className="mt-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold transition-all"
            >
              Generate Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};