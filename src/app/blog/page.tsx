import Link from 'next/link';
import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';

// Generate metadata for the blog index page
export const metadata: Metadata = generatePageMetadata({
  title: 'Blog - Health & Wellness Articles for Middle-Aged Men',
  description: 'Evidence-based articles on fitness, nutrition, mental health, and wellness specifically for men over 40.',
  keywords: ['blog', 'men\'s health', 'fitness', 'nutrition', 'wellness', 'mental health'],
  path: '/blog',
});

// Mock blog post data (in a real app, this would come from Sanity.io)
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Heart Health After 40',
    excerpt: 'Learn about the key factors that affect cardiovascular health in middle-aged men and strategies to maintain a healthy heart.',
    category: 'Heart Health',
    date: 'March 15, 2025',
    slug: 'understanding-heart-health-after-40',
  },
  {
    id: '2',
    title: 'Strength Training for Men Over 40',
    excerpt: 'Discover effective strength training routines specifically designed for men in their 40s, 50s, and beyond.',
    category: 'Fitness',
    date: 'March 10, 2025',
    slug: 'strength-training-for-men-over-40',
  },
  {
    id: '3',
    title: 'Managing Stress in Middle Age',
    excerpt: 'Explore practical techniques for managing stress and improving mental well-being during the demanding middle years.',
    category: 'Mental Wellness',
    date: 'March 5, 2025',
    slug: 'managing-stress-in-middle-age',
  },
  {
    id: '4',
    title: 'Nutrition Essentials for Men\'s Health',
    excerpt: 'A comprehensive guide to the nutrients that are most important for men\'s health after 40.',
    category: 'Nutrition',
    date: 'February 28, 2025',
    slug: 'nutrition-essentials-for-mens-health',
  },
  {
    id: '5',
    title: 'Sleep Quality and Aging: What You Need to Know',
    excerpt: 'How sleep patterns change with age and what you can do to improve your sleep quality for better health.',
    category: 'Wellness',
    date: 'February 20, 2025',
    slug: 'sleep-quality-and-aging',
  },
  {
    id: '6',
    title: 'Preventive Health Screenings Every Man Should Get',
    excerpt: 'A guide to the essential health screenings that can detect problems early and potentially save your life.',
    category: 'Preventive Care',
    date: 'February 15, 2025',
    slug: 'preventive-health-screenings',
  },
];

export default function BlogPage() {
  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];
  
  // Generate blog listing schema
  const blogListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: 'Blog - Health & Wellness Articles for Middle-Aged Men',
    description: 'Evidence-based articles on fitness, nutrition, mental health, and wellness specifically for men over 40.',
    url: 'https://vigorformen.com/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://vigorformen.com/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
      })),
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Add JSON-LD structured data */}
        <JsonLd data={blogListingSchema} />
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-secondary-800 dark:text-secondary-200">
          Blog
        </h1>

        {/* Category Filter (simplified version) */}
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="text-secondary-600 dark:text-secondary-400 mr-2">Filter by:</span>
          <Link
            href="/blog"
            className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full"
          >
            All
          </Link>
          <Link
            href="/blog/category/heart-health"
            className="px-3 py-1 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors"
          >
            Heart Health
          </Link>
          <Link
            href="/blog/category/fitness"
            className="px-3 py-1 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors"
          >
            Fitness
          </Link>
          <Link
            href="/blog/category/mental-health"
            className="px-3 py-1 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors"
          >
            Mental Wellness
          </Link>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border-b border-secondary-200 dark:border-secondary-800 pb-8 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-secondary-500 dark:text-secondary-500">
                  {post.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-secondary-800 dark:text-secondary-200">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                  {post.title}
                </Link>
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="px-4 py-2 rounded-l-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-500 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700"
            >
              Previous
            </a>
            <a
              href="#"
              className="px-4 py-2 border-t border-b border-secondary-300 dark:border-secondary-700 bg-primary-600 text-white"
            >
              1
            </a>
            <a
              href="#"
              className="px-4 py-2 border-t border-b border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700"
            >
              2
            </a>
            <a
              href="#"
              className="px-4 py-2 border-t border-b border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700"
            >
              3
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-r-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700"
            >
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
