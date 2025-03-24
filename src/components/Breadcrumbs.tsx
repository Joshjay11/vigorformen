'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  homeLabel?: string;
  separator?: React.ReactNode;
  className?: string;
}

/**
 * Breadcrumbs component for navigation and SEO
 */
export default function Breadcrumbs({
  items = [],
  homeLabel = 'Home',
  separator = '/',
  className = '',
}: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // If no items are provided, generate them from the pathname
  const breadcrumbItems = items.length > 0 
    ? items 
    : generateBreadcrumbsFromPath(pathname, homeLabel);
  
  // Generate schema.org data for breadcrumbs
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://vigorformen.com${item.path}`,
    })),
  };
  
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-secondary-400 dark:text-secondary-600" aria-hidden="true">
                    {separator}
                  </span>
                )}
                
                {isLast ? (
                  <span className="text-secondary-500 dark:text-secondary-400" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.path}
                    className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      
      {/* Add structured data */}
      <JsonLd data={schemaData} />
    </>
  );
}

/**
 * Generate breadcrumb items from a pathname
 */
function generateBreadcrumbsFromPath(pathname: string, homeLabel: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  
  // Always start with home
  const breadcrumbs: BreadcrumbItem[] = [
    { name: homeLabel, path: '/' }
  ];
  
  // Add each path segment
  let currentPath = '';
  paths.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Format the segment name (convert-to-title-case -> Convert To Title Case)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({ name, path: currentPath });
  });
  
  return breadcrumbs;
}
