// src/LandingPage.tsx
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { Property } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

// Production-ready mock data perfectly matching the Property interface
const TRENDING_PROPERTIES: Property[] = [
  {
    id: 't1',
    address: '1234 Emerald Avenue',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    price: 450000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    propertyType: 'Single Family',
    estimatedRent: 2800,
    estimatedYield: 7.4,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    yearBuilt: 2018,
    lotSize: 6500,
    description: 'Beautiful trending property in the heart of Austin with modern amenities.',
    rentRangeLow: 2600,
    rentRangeHigh: 3000
  },
  {
    id: 't2',
    address: '8900 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    price: 850000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    propertyType: 'Condo',
    estimatedRent: 5200,
    estimatedYield: 7.3,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    yearBuilt: 2020,
    lotSize: 0,
    description: 'Stunning luxury condo with panoramic ocean views and resort-style amenities.',
    rentRangeLow: 4800,
    rentRangeHigh: 5500
  },
  {
    id: 't3',
    address: '5544 Pine Ridge Road',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    price: 525000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    propertyType: 'Townhouse',
    estimatedRent: 3100,
    estimatedYield: 7.0,
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    yearBuilt: 2015,
    lotSize: 2500,
    description: 'Spacious townhouse nestled in a quiet Denver neighborhood close to hiking trails.',
    rentRangeLow: 2900,
    rentRangeHigh: 3300
  }
];

export const LandingPage: React.FC = () => {
  const [results, setResults] = useState<Property[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onResults={setResults} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-20">
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 drop-shadow-sm">
                Search Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="trending"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Trending Investment Deals</h2>
                  <p className="text-sm text-gray-500 font-medium">High-yield properties discovered in the last 24 hours</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TRENDING_PROPERTIES.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};