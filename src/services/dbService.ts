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
    const docRef = await addDoc(collection(db, "savedDeals"), {
      ...dealData,
      createdAt: Timestamp.now()
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