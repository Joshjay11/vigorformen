'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import AuthForm from '@/components/auth/AuthForm';
import UserProfile from '@/components/firestore/UserProfile';
import FileUploader from '@/components/storage/FileUploader';

export default function FirebaseDemoPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'auth' | 'firestore' | 'storage'>('auth');

  const handleAuthStateChange = (currentUser: User | null) => {
    setUser(currentUser);
    
    // If user signs in, switch to profile tab
    if (currentUser && !user) {
      setActiveTab('firestore');
    }
    
    // If user signs out, switch to auth tab
    if (!currentUser && user) {
      setActiveTab('auth');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-secondary-800 dark:text-secondary-200">
          Firebase Integration Demo
        </h1>
        
        <p className="mb-8 text-secondary-600 dark:text-secondary-400">
          This page demonstrates how to use Firebase services in a Next.js application.
          It includes examples of authentication, Firestore database, and storage functionality.
        </p>
        
        {/* Tabs */}
        <div className="mb-8 border-b border-secondary-200 dark:border-secondary-800">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('auth')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'auth'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300'
              }`}
            >
              Authentication
            </button>
            <button
              onClick={() => setActiveTab('firestore')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'firestore'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300'
              }`}
            >
              Firestore
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'storage'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300'
              }`}
            >
              Storage
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mb-12">
          {activeTab === 'auth' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
                Firebase Authentication
              </h2>
              <p className="mb-6 text-secondary-600 dark:text-secondary-400">
                Sign up or sign in with email and password. Firebase Authentication provides backend services and SDKs to authenticate users in your app.
              </p>
              <AuthForm onAuthStateChange={handleAuthStateChange} />
            </div>
          )}
          
          {activeTab === 'firestore' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
                Firestore Database
              </h2>
              <p className="mb-6 text-secondary-600 dark:text-secondary-400">
                Manage your user profile data. Firestore is a flexible, scalable NoSQL cloud database that keeps your data in sync across client apps.
              </p>
              <UserProfile user={user} />
            </div>
          )}
          
          {activeTab === 'storage' && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
                Firebase Storage
              </h2>
              <p className="mb-6 text-secondary-600 dark:text-secondary-400">
                Upload and manage files. Firebase Storage is designed to help you quickly and easily store and serve user-generated content.
              </p>
              <FileUploader user={user} />
            </div>
          )}
        </div>
        
        {/* Code Examples */}
        <div className="mt-12 border-t border-secondary-200 dark:border-secondary-800 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
            Implementation Details
          </h2>
          <p className="mb-4 text-secondary-600 dark:text-secondary-400">
            To use Firebase in your Next.js application:
          </p>
          
          <ol className="list-decimal pl-5 space-y-4 text-secondary-600 dark:text-secondary-400">
            <li>
              <strong>Set up Firebase:</strong> Create a Firebase project and add your configuration to <code className="bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">.env.local</code>
            </li>
            <li>
              <strong>Initialize Firebase:</strong> Create a <code className="bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">firebase.ts</code> file to initialize Firebase services
            </li>
            <li>
              <strong>Create Components:</strong> Build components that use Firebase services like Authentication, Firestore, and Storage
            </li>
            <li>
              <strong>Use in Pages:</strong> Import and use these components in your Next.js pages
            </li>
          </ol>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
              Firebase Initialization Example
            </h3>
            <pre className="bg-secondary-100 dark:bg-secondary-900 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
