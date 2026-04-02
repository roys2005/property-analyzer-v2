// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // <-- NEW IMPORT

// Replace this with your actual Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyBiW7zOu9DaDuRGdhVKVBJGsA9wDWPvbdw",
    authDomain: "web-app-2172e.firebaseapp.com",
    projectId: "web-app-2172e",
    storageBucket: "web-app-2172e.firebasestorage.app",
    messagingSenderId: "1042287227454",
    appId: "1:1042287227454:web:6b969eba6e95142443576f",
    measurementId: "G-YQ5Q53BVKD"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- EXPORT FIRESTORE

// Initialize Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');