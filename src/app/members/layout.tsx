'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface MembersLayoutProps {
  children: ReactNode;
}

export default function MembersLayout({ children }: MembersLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-secondary-800 dark:text-secondary-200">
              Members Area
            </h2>
            
            <nav className="space-y-2">
              <Link
                href="/members"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/members')
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/members/profile"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/members/profile')
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                My Profile
              </Link>
              <Link
                href="/members/resources"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/members/resources')
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                Resources
              </Link>
              <Link
                href="/members/settings"
                className={`block px-4 py-2 rounded-md ${
                  isActive('/members/settings')
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`}
              >
                Settings
              </Link>
              
              <div className="pt-4 mt-4 border-t border-secondary-200 dark:border-secondary-700">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
