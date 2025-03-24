'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  onSnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

type UserProfileProps = {
  user: User | null;
};

interface ProfileData {
  displayName: string;
  bio: string;
  location: string;
  website: string;
  createdAt: number;
  updatedAt: number;
}

const defaultProfile: ProfileData = {
  displayName: '',
  bio: '',
  location: '',
  website: '',
  createdAt: Date.now(),
  updatedAt: Date.now()
};

export default function UserProfile({ user }: UserProfileProps) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfile(defaultProfile);
      setLoading(false);
      return;
    }

    // Reference to the user's profile document
    const profileRef = doc(db, 'userProfiles', user.uid);
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      profileRef, 
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setProfile(docSnapshot.data() as ProfileData);
        } else {
          // Create a new profile if it doesn't exist
          const newProfile = {
            ...defaultProfile,
            displayName: user.displayName || '',
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          setProfile(newProfile);
          
          // Save the new profile to Firestore (no await since we're in a useEffect)
          setDoc(profileRef, newProfile)
            .catch((err: Error) => {
              console.error('Error creating profile:', err);
              setError('Failed to create profile');
            });
        }
        setLoading(false);
      },
      (err: Error) => {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
        setLoading(false);
      }
    );
    
    // Clean up subscription
    return () => unsubscribe();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setError(null);
    setSuccess(false);
    setSaving(true);
    
    try {
      const profileRef = doc(db, 'userProfiles', user.uid);
      
      await updateDoc(profileRef, {
        ...profile,
        updatedAt: Date.now()
      });
      
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
        <p className="text-secondary-600 dark:text-secondary-400">
          Please sign in to manage your profile.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
        <p className="text-secondary-600 dark:text-secondary-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
        Your Profile
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="displayName" 
            className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Display Name
          </label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={profile.displayName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="bio" 
            className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="location" 
            className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="website" 
            className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={profile.website}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          
          <div className="text-sm text-secondary-500 dark:text-secondary-500">
            Last updated: {new Date(profile.updatedAt).toLocaleString()}
          </div>
        </div>
      </form>
    </div>
  );
}
