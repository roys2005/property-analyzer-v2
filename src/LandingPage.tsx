import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { Property } from './types';
import { motion, AnimatePresence } from 'motion/react';

export const LandingPage: React.FC = () => {
  const [results, setResults] = useState<Property[]>([]);

  return (
    <div className="min-h-screen bg-[#0a0f1d]">
      <Hero onResults={setResults} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20 relative z-20">
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {results.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[#161b2b] rounded-3xl border border-gray-800"
            >
              <p className="text-gray-500 font-medium">Search for a property to begin your analysis.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
