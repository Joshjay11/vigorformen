'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function MembersDashboardPage() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-40 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          <div className="h-40 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          <div className="h-40 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          <div className="h-40 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-secondary-800 dark:text-secondary-200">
        Welcome, {user?.displayName || user?.email?.split('@')[0] || 'Member'}!
      </h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Your personal dashboard for health and wellness resources.
      </p>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800">
          <h3 className="text-lg font-semibold mb-2 text-primary-700 dark:text-primary-400">Profile Completion</h3>
          <div className="flex items-center">
            <div className="w-full bg-primary-200 dark:bg-primary-800 rounded-full h-2.5">
              <div className="bg-primary-600 h-2.5 rounded-full w-3/4"></div>
            </div>
            <span className="ml-2 text-primary-700 dark:text-primary-400">75%</span>
          </div>
          <Link href="/members/profile" className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Complete your profile →
          </Link>
        </div>
        
        <div className="bg-secondary-50 dark:bg-secondary-900/50 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <h3 className="text-lg font-semibold mb-2 text-secondary-700 dark:text-secondary-300">Resources</h3>
          <p className="text-3xl font-bold text-secondary-800 dark:text-secondary-200">12</p>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">Exclusive articles and guides</p>
          <Link href="/members/resources" className="mt-2 inline-block text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Browse resources →
          </Link>
        </div>
        
        <div className="bg-secondary-50 dark:bg-secondary-900/50 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <h3 className="text-lg font-semibold mb-2 text-secondary-700 dark:text-secondary-300">Member Since</h3>
          <p className="text-secondary-800 dark:text-secondary-200">
            {user?.metadata?.creationTime 
              ? new Date(user.metadata.creationTime).toLocaleDateString() 
              : 'N/A'}
          </p>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">Thank you for your support!</p>
        </div>
      </div>
      
      {/* Featured Content */}
      <h2 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
        Featured Content
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded mb-3">
            New
          </span>
          <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
            Optimizing Testosterone Naturally After 40
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Evidence-based strategies to maintain healthy testosterone levels as you age, without resorting to TRT.
          </p>
          <Link href="/members/resources/testosterone-optimization" className="text-primary-600 dark:text-primary-400 hover:underline">
            Read Article →
          </Link>
        </div>
        
        <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded mb-3">
            Popular
          </span>
          <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
            The Midlife Fitness Blueprint
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            A complete 12-week program designed specifically for men over 40, balancing strength, mobility, and recovery.
          </p>
          <Link href="/members/resources/midlife-fitness-blueprint" className="text-primary-600 dark:text-primary-400 hover:underline">
            View Program →
          </Link>
        </div>
        
        <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
            Nutrition Calculator
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Personalized nutrition recommendations based on your age, activity level, and health goals.
          </p>
          <Link href="/members/tools/nutrition-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">
            Use Calculator →
          </Link>
        </div>
        
        <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
          <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
            Community Discussion
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Join the conversation with other members about health challenges and successes in midlife.
          </p>
          <Link href="/members/community" className="text-primary-600 dark:text-primary-400 hover:underline">
            Join Discussion →
          </Link>
        </div>
      </div>
    </div>
  );
}
