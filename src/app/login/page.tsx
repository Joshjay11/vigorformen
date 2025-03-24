'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // If user is already logged in, redirect to members area
      if (currentUser) {
        router.push('/members');
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  const handleAuthStateChange = (currentUser: User | null) => {
    setUser(currentUser);
    
    // Redirect to members area after successful login
    if (currentUser) {
      router.push('/members');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-secondary-800 dark:text-secondary-200">
          Member Login
        </h1>
        
        <p className="mb-8 text-secondary-600 dark:text-secondary-400">
          Sign in to access exclusive content and features for VigorForMen members.
        </p>
        
        <AuthForm onAuthStateChange={handleAuthStateChange} />
        
        <div className="mt-8 text-center">
          <p className="text-secondary-600 dark:text-secondary-400">
            Not a member yet? <Link href="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">Sign up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
