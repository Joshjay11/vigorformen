'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

// Mock resource data
const resources = [
  {
    id: '1',
    title: 'Optimizing Testosterone Naturally After 40',
    description: 'Evidence-based strategies to maintain healthy testosterone levels as you age, without resorting to TRT.',
    category: 'Hormonal Health',
    type: 'Article',
    date: 'March 20, 2025',
    slug: 'testosterone-optimization',
    featured: true,
    new: true
  },
  {
    id: '2',
    title: 'The Midlife Fitness Blueprint',
    description: 'A complete 12-week program designed specifically for men over 40, balancing strength, mobility, and recovery.',
    category: 'Fitness',
    type: 'Program',
    date: 'March 15, 2025',
    slug: 'midlife-fitness-blueprint',
    featured: true,
    new: false
  },
  {
    id: '3',
    title: 'Nutrition After 40: What Changes & Why',
    description: 'How your nutritional needs evolve with age and how to adapt your diet for optimal health and performance.',
    category: 'Nutrition',
    type: 'Guide',
    date: 'March 10, 2025',
    slug: 'nutrition-after-40',
    featured: false,
    new: false
  },
  {
    id: '4',
    title: 'Sleep Optimization for Middle-Aged Men',
    description: 'Practical strategies to improve sleep quality and duration, addressing common sleep issues that arise with age.',
    category: 'Recovery',
    type: 'Guide',
    date: 'March 5, 2025',
    slug: 'sleep-optimization',
    featured: false,
    new: false
  },
  {
    id: '5',
    title: 'Stress Management Techniques for Busy Men',
    description: 'Effective methods to manage stress that fit into a busy lifestyle, with a focus on mental and physical well-being.',
    category: 'Mental Health',
    type: 'Guide',
    date: 'February 28, 2025',
    slug: 'stress-management',
    featured: false,
    new: false
  },
  {
    id: '6',
    title: 'Joint Health & Mobility Workout',
    description: 'A specialized workout routine focused on maintaining and improving joint health and mobility.',
    category: 'Fitness',
    type: 'Video',
    date: 'February 20, 2025',
    slug: 'joint-health-mobility',
    featured: false,
    new: false
  },
  {
    id: '7',
    title: 'Heart Health After 45: What You Need to Know',
    description: 'Essential information about cardiovascular health for men over 45, including risk factors and preventive measures.',
    category: 'Cardiovascular Health',
    type: 'Article',
    date: 'February 15, 2025',
    slug: 'heart-health-after-45',
    featured: false,
    new: false
  },
  {
    id: '8',
    title: 'Metabolic Health Assessment Guide',
    description: 'How to assess and monitor your metabolic health, with guidance on interpreting common lab tests.',
    category: 'Health',
    type: 'Guide',
    date: 'February 10, 2025',
    slug: 'metabolic-health-assessment',
    featured: false,
    new: false
  },
];

// Categories for filtering
const categories = [
  'All',
  'Fitness',
  'Nutrition',
  'Hormonal Health',
  'Mental Health',
  'Recovery',
  'Cardiovascular Health',
  'Health'
];

export default function MembersResourcesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Filter resources based on category and search query
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        Member Resources
      </h1>
      <p className="text-secondary-600 dark:text-secondary-400 mb-8">
        Exclusive content and resources for VigorForMen members.
      </p>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Search resources"
          />
        </div>
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Filter resources by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Featured Resources */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources
              .filter(resource => resource.featured)
              .map(resource => (
                <div key={resource.id} className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 rounded">
                      {resource.category}
                    </span>
                    {resource.new && (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
                    {resource.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link href={`/members/resources/${resource.slug}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                      View {resource.type} →
                    </Link>
                    <span className="text-sm text-secondary-500 dark:text-secondary-500">
                      {resource.date}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* All Resources */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
          {selectedCategory === 'All' ? 'All Resources' : `${selectedCategory} Resources`}
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800 text-center">
            <p className="text-secondary-600 dark:text-secondary-400">
              No resources found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white dark:bg-secondary-900 p-6 rounded-lg border border-secondary-200 dark:border-secondary-800">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 rounded">
                    {resource.category}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-300 rounded">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-200">
                  {resource.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <Link href={`/members/resources/${resource.slug}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                    View {resource.type} →
                  </Link>
                  <span className="text-sm text-secondary-500 dark:text-secondary-500">
                    {resource.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
