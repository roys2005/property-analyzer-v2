// src/components/Hero.tsx
import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Search, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { fetchRentCastData } from '../services/rentCastService';
import { Property } from '../types';

interface HeroProps {
  onResults: (results: Property[]) => void;
}

export const Hero: React.FC<HeroProps> = ({ onResults }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddressSelect = async (place: any) => {
    if (!place || !place.formatted_address) return;
    
    setIsLoading(true);
    setError('');
    onResults([]); // Clear previous results

    try {
      // 1. Try to fetch from RentCast
      const results = await fetchRentCastData(place.formatted_address);
      onResults(results);
      
    } catch (err: any) {
      console.warn("RentCast fetch failed, creating manual fallback:", err);
      
      // 2. FALLBACK: If property isn't found, create a manual card so the user isn't blocked!
      const cleanAddress = place.formatted_address.replace(/, USA$/, '').trim();
      
      const fallbackProperty: Property = {
        id: 'manual-' + Date.now().toString(),
        address: cleanAddress,
        city: 'City Data Missing', 
        state: '',
        zipCode: '',
        price: 0,          
        estimatedRent: 0,  
        beds: 0,
        baths: 0,
        sqft: 0,
        yearBuilt: new Date().getFullYear(),
        propertyType: 'MANUAL ENTRY',
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        estimatedYield: 0
      };

      onResults([fallbackProperty]);
      
      // Show a gentle warning instead of a hard error
      setError("Property data not found in public records. A manual entry card has been created below for you to analyze.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white pt-20 pb-32 overflow-hidden border-b border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Analyze Real Estate Deals <br />
            <span className="text-emerald-500">Like a Pro</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10">
            Instantly fetch market data, calculate ROI, and get AI-powered insights for any property in seconds.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none z-10">
                <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              
              <Autocomplete
                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                onPlaceSelected={handleAddressSelect}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'us' },
                }}
                placeholder="Enter address, city, or zip code..."
                className="block w-full pl-14 pr-14 py-5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-xl"
              />

              {isLoading ? (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10">
                  <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                </div>
              ) : (
                <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>

            {/* Graceful Warning Display */}
            {error && (
              <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-2 px-4 rounded-xl border border-amber-200">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};