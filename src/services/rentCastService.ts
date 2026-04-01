import { Property } from '../types';

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    address: '842 Silver Oak Drive',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    price: 425000,
    beds: 4,
    baths: 3,
    sqft: 2450,
    yearBuilt: 2015,
    propertyType: 'SINGLE FAMILY',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    estimatedRent: 2800,
    estimatedYield: 6.8,
  },
  {
    id: '2',
    address: '1245 Oak Ridge Dr',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    price: 385000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    yearBuilt: 2010,
    propertyType: 'SINGLE FAMILY',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    estimatedRent: 2400,
    estimatedYield: 7.2,
  },
  {
    id: '3',
    address: '221 Baker St',
    city: 'London',
    state: 'UK',
    zipCode: 'NW1 6XE',
    price: 1200000,
    beds: 2,
    baths: 1,
    sqft: 1200,
    yearBuilt: 1890,
    propertyType: 'APARTMENT',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    estimatedRent: 4500,
    estimatedYield: 4.5,
  }
];

export const fetchRentCastData = async (address: string): Promise<Property[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!address) return MOCK_PROPERTIES;
  
  return MOCK_PROPERTIES.filter(p => 
    p.address.toLowerCase().includes(address.toLowerCase()) ||
    p.city.toLowerCase().includes(address.toLowerCase())
  );
};
