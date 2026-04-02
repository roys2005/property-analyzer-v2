// src/services/rentCastService.ts
import { Property, Comparable } from '../types';

export const fetchRentCastData = async (address: string): Promise<Property[]> => {
  const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
  
  if (!apiKey) {
    throw new Error("RentCast API key is missing. Check your .env file.");
  }

  const cleanAddress = address.replace(/, USA$/, '').trim();
  console.log("Fetching property and comps for:", cleanAddress);

  const propertyUrl = `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(cleanAddress)}`;
  const avmRentUrl = `https://api.rentcast.io/v1/avm/rent?address=${encodeURIComponent(cleanAddress)}`;

  try {
    // Fetch both endpoints simultaneously for faster loading
    const [propertyRes, avmRentRes] = await Promise.all([
      fetch(propertyUrl, { headers: { 'X-Api-Key': apiKey, 'Accept': 'application/json' } }),
      fetch(avmRentUrl, { headers: { 'X-Api-Key': apiKey, 'Accept': 'application/json' } })
    ]);

    let propertyData: any = null;
    let avmData: any = null;

    if (propertyRes.ok) {
      const pData = await propertyRes.json();
      if (pData && pData.length > 0) propertyData = pData[0];
    }

    if (avmRentRes.ok) {
      avmData = await avmRentRes.json();
    }

    // If NEITHER endpoint found anything, throw the 404 fallback error
    if (!propertyData && !avmData) {
      throw new Error("Property not found.");
    }

    // Map Comparables
    const comparables: Comparable[] = avmData?.comparables?.map((comp: any) => ({
      id: comp.id || Math.random().toString(),
      address: comp.formattedAddress,
      price: comp.price || 0,
      distance: comp.distance || 0,
      beds: comp.bedrooms || 0,
      baths: comp.bathrooms || 0,
      sqft: comp.squareFootage || 0,
      propertyType: comp.propertyType || 'Unknown'
    })) || [];

    // Calculate yield based on available price and rent
    const currentPrice = propertyData?.price || 0;
    const currentRent = avmData?.rent || propertyData?.rent || 0;
    const estimatedYield = currentPrice && currentRent 
      ? Number(((currentRent * 12) / currentPrice * 100).toFixed(2)) 
      : 0;

    // Merge everything into one property object
    const mergedProperty: Property = {
      id: propertyData?.id || 'manual-' + Date.now().toString(),
      address: propertyData?.formattedAddress || cleanAddress,
      city: propertyData?.city || '',
      state: propertyData?.state || '',
      zipCode: propertyData?.zipCode || '',
      price: currentPrice,
      estimatedRent: currentRent,
      beds: propertyData?.bedrooms || 0,
      baths: propertyData?.bathrooms || 0,
      sqft: propertyData?.squareFootage || 0,
      yearBuilt: propertyData?.yearBuilt || new Date().getFullYear(),
      propertyType: propertyData?.propertyType || 'UNKNOWN',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      estimatedYield: estimatedYield,
      
      // Attach AVM Data
      rentRangeLow: avmData?.rentRangeLow,
      rentRangeHigh: avmData?.rentRangeHigh,
      comparables: comparables
    };

    return [mergedProperty];

  } catch (error) {
    console.error("Fetch Execution Error:", error);
    throw error;
  }
};