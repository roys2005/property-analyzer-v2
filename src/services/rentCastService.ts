// src/services/rentCastService.ts

export const fetchRentCastData = async (address: string) => {
  const apiKey = import.meta.env.VITE_RENTCAST_API_KEY;
  
  if (!apiKey) {
    throw new Error("RentCast API key is missing. Check your .env file.");
  }

  // RentCast API endpoint for property details
  const url = `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch property data: ${response.status}`);
    }

    const data = await response.json();
    
    // RentCast returns an array of matching properties. We take the first one.
    if (!data || data.length === 0) {
      throw new Error("Property not found in RentCast database.");
    }

    const property = data[0];

    // Map RentCast's response payload to our app's Property type
    return {
      id: property.id || Math.random().toString(),
      address: property.formattedAddress,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      price: property.price || 0, 
      estimatedRent: property.rent || 0, // Estimated monthly rent
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFootage,
      yearBuilt: property.yearBuilt,
      propertyType: property.propertyType,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' // Placeholder image if RentCast doesn't provide one
    };

  } catch (error) {
    console.error("RentCast API Error:", error);
    throw error;
  }
};