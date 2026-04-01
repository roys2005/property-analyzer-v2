import React from 'react';
import { Bed, Bath, Square, MapPin, TrendingUp, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { useProperty } from '../context/PropertyContext';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { setSelectedProperty, setFinancials } = useProperty();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    setSelectedProperty(property);
    setFinancials(prev => ({
      ...prev,
      purchasePrice: property.price,
      monthlyRent: property.estimatedRent,
    }));
    navigate('/analyze');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold text-gray-800 uppercase tracking-wider">
          {property.propertyType}
        </div>
        <div className="absolute top-4 right-4 bg-emerald-500 px-3 py-1 rounded-lg text-sm font-bold text-white shadow-lg">
          ${property.price.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">
          <MapPin className="w-3 h-3" />
          {property.city}, {property.state}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">{property.address}</h3>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Bed className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{property.beds}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Beds</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Bath className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{property.baths}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Baths</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <Square className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Sqft</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>EST. YIELD</span>
          </div>
          <span className="text-xl font-bold text-emerald-600">{property.estimatedYield}%</span>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group"
        >
          Analyze ROI
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
