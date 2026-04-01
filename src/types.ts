export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
  imageUrl: string;
  estimatedRent: number;
  estimatedYield: number;
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

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'free' | 'pro';
  analysesRemaining: number;
}
