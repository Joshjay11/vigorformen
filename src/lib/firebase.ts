// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, Storage } from 'firebase/storage';
import { Analytics } from 'firebase/analytics';
// Analytics is imported dynamically on the client side

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: Storage = getStorage(app);

// Initialize Analytics only on the client side
let analytics: Analytics | null = null;

// Function to initialize analytics
const initializeAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== 'undefined') {
    try {
      const { getAnalytics } = await import('firebase/analytics');
      analytics = getAnalytics(app);
      return analytics;
    } catch (error) {
      console.error('Error initializing analytics:', error);
      return null;
    }
  }
  return null;
};

// Initialize analytics if we're in the browser
if (typeof window !== 'undefined') {
  initializeAnalytics();
}

export { app, db, auth, storage, analytics };
