// src/components/Hero.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import { Search, Loader2, MapPin } from 'lucide-react';
import { fetchRentCastData } from '../services/rentCastService';
import { useProperty } from '../context/PropertyContext'; // Assuming you have a context to store the selected property
import { PropertyCard } from './PropertyCard';

export const Hero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchedProperty, setSearchedProperty] = useState<any>(null);
  
  const navigate = useNavigate();
  const { setProperty } = useProperty(); // Save data to global state for the ROI page

  const handleAddressSelect = async (place: any) => {
    if (!place || !place.formatted_address) return;
    
    setIsLoading(true);
    setError('');
    setSearchedProperty(null);

    try {
      // 1. Fetch data from RentCast using the Google formatted address
      const propertyData = await fetchRentCastData(place.formatted_address);
      
      // 2. Display the card locally on the landing page
      setSearchedProperty(propertyData);
      
      // 3. Save to global state so the Dashboard can use it when they click Analyze
      setProperty(propertyData); 
      
    } catch (err: any) {
      setError(err.message || 'Could not find data for this address.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          Find High-Yield <span className="text-emerald-500">Real Estate</span> Deals
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Enter any US address to instantly analyze cash flow, cap rate, and ROI using real-time market data and AI insights.
        </p>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          
          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={handleAddressSelect}
            options={{
              types: ['address'],
              componentRestrictions: { country: 'us' }, // Restrict to US for RentCast
            }}
            placeholder="Enter address, city, or zip code..."
            className="w-full bg-[#161b2b] border-2 border-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 shadow-2xl transition-all"
          />

          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
              <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 text-red-400 bg-red-400/10 inline-block px-4 py-2 rounded-lg border border-red-400/20">
            {error}
          </div>
        )}

        {/* Property Results Card */}
        {searchedProperty && !isLoading && (
          <div className="mt-16 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h3 className="text-left text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="text-emerald-500" /> Property Found
            </h3>
            
            {/* Assuming PropertyCard accepts the property data and has an "Analyze ROI" button 
               that triggers navigate('/dashboard') 
            */}
            <PropertyCard 
              property={searchedProperty} 
              onAnalyzeClick={() => navigate('/dashboard')} 
            />
          </div>
        )}

      </div>
    </div>
  );
};