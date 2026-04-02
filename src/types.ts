// src/types.ts

export interface Comparable {
  id: string;
  address: string;
  price: number;
  distance: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  estimatedRent: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  imageUrl: string;
  estimatedYield: number;
  
  // Fields for Property Details / Trending
  lotSize?: number;
  description?: string;
  
  // New AVM & Comps Fields
  rentRangeLow?: number;
  rentRangeHigh?: number;
  comparables?: Comparable[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'pro';
  analysesRemaining: number;
}

export interface Financials {
  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  annualTaxes: number;
  annualInsurance: number;
  monthlyHOA: number;
  maintenancePercent: number;
  vacancyPercent: number;
}

export interface AnalysisResults {
  monthlyMortgage: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  capRate: number;
  cashOnCashROI: number;
  totalInvestment: number;
}