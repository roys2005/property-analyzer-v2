import React, { createContext, useContext, useState } from 'react';
import { Property, Financials, AnalysisResults } from '../types';

interface PropertyContextType {
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  financials: Financials;
  setFinancials: (f: Financials) => void;
  calculateROI: () => AnalysisResults;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const DEFAULT_FINANCIALS: Financials = {
  purchasePrice: 0,
  downPaymentPercent: 20,
  interestRate: 6.75,
  loanTerm: 30,
  monthlyRent: 0,
  annualTaxes: 4200,
  annualInsurance: 1800,
  monthlyHOA: 150,
  maintenancePercent: 5,
  vacancyPercent: 5,
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [financials, setFinancials] = useState<Financials>(DEFAULT_FINANCIALS);

  const calculateROI = (): AnalysisResults => {
    const {
      purchasePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      monthlyRent,
      annualTaxes,
      annualInsurance,
      monthlyHOA,
      maintenancePercent,
      vacancyPercent,
    } = financials;

    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyMortgage = loanAmount > 0 
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      : 0;

    const monthlyTaxes = annualTaxes / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyMaintenance = (monthlyRent * maintenancePercent) / 100;
    const monthlyVacancy = (monthlyRent * vacancyPercent) / 100;

    const monthlyExpenses = monthlyMortgage + monthlyTaxes + monthlyInsurance + monthlyHOA + monthlyMaintenance + monthlyVacancy;
    const monthlyCashFlow = monthlyRent - monthlyExpenses;
    
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashROI = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;
    
    const annualNetOperatingIncome = (monthlyRent - (monthlyTaxes + monthlyInsurance + monthlyHOA + monthlyMaintenance + monthlyVacancy)) * 12;
    const capRate = purchasePrice > 0 ? (annualNetOperatingIncome / purchasePrice) * 100 : 0;

    return {
      monthlyMortgage,
      monthlyExpenses,
      monthlyCashFlow,
      capRate,
      cashOnCashROI,
      totalInvestment: downPayment,
    };
  };

  return (
    <PropertyContext.Provider value={{ 
      selectedProperty, 
      setSelectedProperty, 
      financials, 
      setFinancials,
      calculateROI
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) throw new Error('useProperty must be used within a PropertyProvider');
  return context;
};
