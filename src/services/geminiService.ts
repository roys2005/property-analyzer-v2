import { GoogleGenAI } from "@google/genai";
import { Financials, AnalysisResults } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getGeminiSummary = async (financials: Financials, results: AnalysisResults): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI insights are currently unavailable. Please check your financial parameters manually.";
  }
};
