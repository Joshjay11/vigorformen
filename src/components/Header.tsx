'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-secondary-900 shadow-sm">
      <div className="container py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            VigorForMen
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/blog" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              Blog
            </Link>
            <Link href="/firebase-demo" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              Firebase Demo
            </Link>
            <Link href="/about" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              About
            </Link>
            <Link href="/contact" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              Contact
            </Link>
            <Link href="/members" className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400">
              Members
            </Link>
            <Link 
              href="/login" 
              className="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Login
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 text-secondary-700 dark:text-secondary-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 space-y-4 md:hidden">
            <Link
              href="/blog"
              className="block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/firebase-demo"
              className="block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Firebase Demo
            </Link>
            <Link
              href="/about"
              className="block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/members"
              className="block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Members
            </Link>
            <div className="pt-4 mt-4 border-t border-secondary-200 dark:border-secondary-700">
              <Link
                href="/login"
                className="block w-full py-2 text-center bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
