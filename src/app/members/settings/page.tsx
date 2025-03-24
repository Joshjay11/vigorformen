'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function MembersSettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setDisplayName(currentUser.displayName);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setError(null);
    setSuccess(null);
    
    try {
      await updateProfile(user, {
        displayName: displayName
      });
      
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;
    
    setError(null);
    setSuccess(null);
    
    try {
      await sendPasswordResetEmail(auth, user.email);
      setPasswordResetSent(true);
      setSuccess('Password reset email sent. Check your inbox.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would save these preferences to Firestore
    setSuccess('Preferences saved successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(null), 3000);
  };

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
        Account Settings
      </h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Manage your account settings and preferences.
      </p>
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
            Profile Settings
          </h2>
          
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label 
                htmlFor="displayName" 
                className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
              >
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-500">
                Email cannot be changed
              </p>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
        
        {/* Preferences */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
            Preferences
          </h2>
          
          <form onSubmit={handleSavePreferences}>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <span className="ml-2 text-secondary-700 dark:text-secondary-300">
                  Receive email notifications
                </span>
              </label>
              <p className="mt-1 ml-6 text-xs text-secondary-500 dark:text-secondary-500">
                Get notified about new articles, resources, and updates
              </p>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <span className="ml-2 text-secondary-700 dark:text-secondary-300">
                  Use dark mode by default
                </span>
              </label>
              <p className="mt-1 ml-6 text-xs text-secondary-500 dark:text-secondary-500">
                Override system preferences for dark mode
              </p>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Save Preferences
            </button>
          </form>
        </div>
        
        {/* Security */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-secondary-800 dark:text-secondary-200">
            Security
          </h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-secondary-800 dark:text-secondary-200">
              Password
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Change your password by clicking the button below. We'll send you an email with a link to reset your password.
            </p>
            
            {passwordResetSent ? (
              <div className="p-4 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-md">
                Password reset email sent to {user?.email}. Please check your inbox.
              </div>
            ) : (
              <button
                onClick={handleSendPasswordReset}
                className="px-4 py-2 bg-secondary-600 text-white font-medium rounded-md hover:bg-secondary-700 transition-colors"
              >
                Reset Password
              </button>
            )}
          </div>
          
          <div className="pt-4 mt-4 border-t border-secondary-200 dark:border-secondary-700">
            <h3 className="text-lg font-medium mb-2 text-secondary-800 dark:text-secondary-200">
              Account Deletion
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            <button
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
