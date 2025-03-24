import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';

// Generate metadata for the home page
export const metadata: Metadata = generatePageMetadata({
  title: 'VigorForMen - Health & Wellness for Middle-Aged Men',
  description: 'Evidence-based health and wellness information tailored for middle-aged men, focusing on fitness, nutrition, and mental wellbeing.',
  keywords: ['men\'s health', 'fitness after 40', 'wellness', 'middle-aged men', 'health advice', 'nutrition', 'mental health'],
  path: '/',
});

export default function HomePage() {
  // Generate website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VigorForMen',
    url: 'https://vigorformen.com',
    description: 'Evidence-based health and wellness information tailored for middle-aged men.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vigorformen.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
  
  // Generate organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VigorForMen',
    url: 'https://vigorformen.com',
    logo: 'https://vigorformen.com/images/logo.png',
    sameAs: [
      'https://twitter.com/vigorformen',
      'https://facebook.com/vigorformen',
      'https://instagram.com/vigorformen',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'contact@vigorformen.com',
    },
  };

  return (
    <div>
      {/* Add JSON-LD structured data */}
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:top-0 focus:left-0"
      >
        Skip to content
      </a>
      
      {/* Hero Section */}
      <section id="main-content" className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Health & Wellness for Middle-Aged Men
              </h1>
              <p className="text-xl mb-8">
                Evidence-based information to help you live your healthiest life after 40.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-white text-primary-700 font-medium px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
                aria-label="Explore our articles"
              >
                Explore Articles
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <Image
                  src="https://placehold.co/800x600/0f172a/ffffff?text=VigorForMen"
                  alt="Middle-aged man exercising outdoors"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="rounded-lg object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary-800 dark:text-secondary-200">
            Topics That Matter to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-secondary-800 dark:text-secondary-200">
                Heart Health
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-center mb-4">
                Strategies to maintain cardiovascular health and reduce risk factors.
              </p>
              <div className="text-center">
                <Link
                  href="/blog/category/heart-health"
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  aria-label="Read articles about heart health"
                >
                  Read Articles →
                </Link>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-secondary-800 dark:text-secondary-200">
                Fitness After 40
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-center mb-4">
                Exercise routines and strength training tailored for middle-aged men.
              </p>
              <div className="text-center">
                <Link
                  href="/blog/category/fitness"
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  aria-label="Read articles about fitness after 40"
                >
                  Read Articles →
                </Link>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-primary-600 dark:text-primary-400"
                  aria-hidden="true"
                  role="img"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-secondary-800 dark:text-secondary-200">
                Mental Wellness
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-center mb-4">
                Strategies for managing stress, anxiety, and maintaining cognitive health.
              </p>
              <div className="text-center">
                <Link
                  href="/blog/category/mental-health"
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  aria-label="Read articles about mental wellness"
                >
                  Read Articles →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary-100 dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
              Stay Updated
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-8">
              Subscribe to our newsletter for the latest health tips, research, and exclusive content.
            </p>
            <form className="flex flex-col md:flex-row gap-2" aria-labelledby="newsletter-heading">
              <div className="sr-only" id="newsletter-heading">Newsletter signup form</div>
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder="Your email address"
                aria-required="true"
                className="flex-grow px-4 py-3 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
