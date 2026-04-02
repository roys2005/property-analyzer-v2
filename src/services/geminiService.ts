import { GoogleGenAI } from "@google/genai";
import { Financials, AnalysisResults } from "../types";

// 1. Use import.meta.env and the VITE_ prefix
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize SDK only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

export const getGeminiSummary = async (financials: Financials, results: AnalysisResults): Promise<string> => {
  if (!ai) {
    console.error("Gemini API key is missing. Check your .env file.");
    return "API Key is missing. Please configure VITE_GEMINI_API_KEY in your .env file.";
  }

  try {
    const response = await ai.models.generateContent({
      // 2. Use a currently supported model name
      model: "gemini-2.5-flash", 
      contents: `
        Analyze this real estate deal:
        Purchase Price: $${financials.purchasePrice}
        Monthly Rent: $${financials.monthlyRent}
        Monthly Cash Flow: $${results.monthlyCashFlow.toFixed(2)}
        Cap Rate: ${results.capRate.toFixed(2)}%
        Cash-on-Cash ROI: ${results.cashOnCashROI.toFixed(2)}%
        
        Provide a concise, professional summary of the deal potential, risks, and a recommendation.
      `,
    });
    
    return response.text || "Unable to generate insights at this time.";
  } catch (error: any) {
    // 3. Log the actual error to the console so you can see if it's a quota/model issue
    console.error("Gemini Error Details:", error);
    return "AI insights are currently unavailable. Please check your financial parameters manually.";
  }
};