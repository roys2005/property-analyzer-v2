import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Property, Financials, AnalysisResults } from '../types';

export interface SavedDeal {
  id?: string;
  userId: string;
  property: Property;
  financials: Financials;
  results: AnalysisResults;
  aiInsights: string;
  createdAt: Date;
}

export const saveDealToFirestore = async (dealData: Omit<SavedDeal, 'id' | 'createdAt'>) => {
  try {
    // FIX: Firestore rejects 'undefined' values. 
    // This trick cleanly strips all 'undefined' fields out of the object before saving.
    const sanitizedData = JSON.parse(JSON.stringify(dealData));

    const docRef = await addDoc(collection(db, "savedDeals"), {
      ...sanitizedData,
      createdAt: Timestamp.now() // Timestamp is added AFTER sanitizing, so it stays a valid Date object
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving deal: ", error);
    throw error;
  }
};

export const getUserSavedDeals = async (userId: string): Promise<SavedDeal[]> => {
  try {
    const q = query(
      collection(db, "savedDeals"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as SavedDeal[];
  } catch (error) {
    console.error("Error fetching deals: ", error);
    throw error;
  }
};