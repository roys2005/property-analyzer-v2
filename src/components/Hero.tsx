import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { fetchRentCastData } from '../services/rentCastService';
import { Property } from '../types';

interface HeroProps {
  onResults: (results: Property[]) => void;
}

export const Hero: React.FC<HeroProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const results = await fetchRentCastData(query);
      onResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-[#0a0f1d] pt-20 pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
            Analyze Real Estate Deals <br />
            <span className="text-emerald-500">Like a Pro</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Instantly fetch market data, calculate ROI, and get AI-powered insights for any property in seconds.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter address, city, or zip code..."
                className="block w-full pl-14 pr-32 py-5 bg-[#161b2b] border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-2xl"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Mock Autocomplete Hint */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Popular:</span>
              <button 
                type="button"
                onClick={() => setQuery('Austin, TX')}
                className="text-xs text-gray-400 hover:text-emerald-500 transition-colors underline decoration-gray-700 underline-offset-4"
              >
                Austin, TX
              </button>
              <button 
                type="button"
                onClick={() => setQuery('Miami, FL')}
                className="text-xs text-gray-400 hover:text-emerald-500 transition-colors underline decoration-gray-700 underline-offset-4"
              >
                Miami, FL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
