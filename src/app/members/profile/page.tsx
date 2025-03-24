'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import UserProfile from '@/components/firestore/UserProfile';
import FileUploader from '@/components/storage/FileUploader';

export default function MembersProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3 mb-6"></div>
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-8"></div>
        <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded mb-6"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-secondary-800 dark:text-secondary-200">
        My Profile
      </h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Manage your personal information and preferences.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserProfile user={user} />
        </div>
        
        <div>
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
              Profile Picture
            </h2>
            
            {user?.photoURL ? (
              <div className="mb-4 flex flex-col items-center">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900"
                />
                <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-500">
                  Current profile picture
                </p>
              </div>
            ) : (
              <div className="mb-4 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl text-primary-600 dark:text-primary-400 font-bold border-4 border-primary-100 dark:border-primary-900">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <p className="mt-2 text-sm text-secondary-500 dark:text-secondary-500">
                  No profile picture set
                </p>
              </div>
            )}
            
            <FileUploader 
              user={user} 
              folder="profile-pictures"
              allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
              maxSizeMB={2}
              onUploadComplete={(url) => {
                // In a real app, you would update the user's profile with the new photo URL
                console.log('Profile picture uploaded:', url);
              }}
            />
          </div>
          
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-secondary-500 dark:text-secondary-500">Email</p>
                <p className="text-secondary-800 dark:text-secondary-200">{user?.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-secondary-500 dark:text-secondary-500">Email Verified</p>
                <p className="text-secondary-800 dark:text-secondary-200">
                  {user?.emailVerified ? (
                    <span className="text-green-600 dark:text-green-400">Verified</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Not Verified</span>
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-secondary-500 dark:text-secondary-500">Member Since</p>
                <p className="text-secondary-800 dark:text-secondary-200">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-secondary-500 dark:text-secondary-500">Last Sign In</p>
                <p className="text-secondary-800 dark:text-secondary-200">
                  {user?.metadata?.lastSignInTime 
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
