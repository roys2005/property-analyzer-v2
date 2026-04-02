// src/components/SavedDeals.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext'; 
import { getUserSavedDeals, SavedDeal } from '../services/dbService';
import { PropertyCard } from './PropertyCard';
import { Loader2, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SavedDeals: React.FC = () => {
  const { user } = useAuth();
  const { setSelectedProperty, setFinancials } = useProperty(); 
  const navigate = useNavigate();
  const [deals, setDeals] = useState<SavedDeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserSavedDeals(user.id).then(data => {
        setDeals(data);
        setIsLoading(false);
      });
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <FolderOpen className="text-emerald-500 w-8 h-8" />
          My Saved Deals
        </h1>

        {deals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-lg">You haven't saved any deals yet.</p>
            <button onClick={() => navigate('/')} className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
              Go analyze a property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="relative group">
                <PropertyCard 
                  property={deal.property} 
                  onAnalyzeClick={() => {
                    setSelectedProperty(deal.property);
                    setFinancials(deal.financials);
                    navigate('/analyze');
                  }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};