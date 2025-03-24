import { Metadata } from 'next';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  path?: string;
};

/**
 * Generate metadata for a page
 * @param props - Metadata properties
 * @returns Metadata object
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = ['VigorForMen Team'],
  section,
  tags = [],
  path = '',
}: MetadataProps) {
  // Base URL for the site
  const baseUrl = 'https://vigorformen.com';
  
  // Full URL for the current page
  const url = `${baseUrl}${path}`;
  
  // Default metadata
  const defaultTitle = 'VigorForMen - Health & Wellness for Middle-Aged Men';
  const defaultDescription = 'Evidence-based health and wellness information tailored for middle-aged men.';
  
  // Combine default and page-specific keywords
  const defaultKeywords = [
    'men\'s health', 
    'fitness after 40', 
    'wellness', 
    'middle-aged men', 
    'health advice'
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords].filter(
    (value, index, self) => self.indexOf(value) === index
  );
  
  // Create the OpenGraph object with proper typing
  const openGraph: any = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url,
    siteName: 'VigorForMen',
    locale: 'en_US',
    type,
    // Use a default image URL if no image is provided
    // In a production environment, this would be an actual image URL
    images: [
      {
        url: image.startsWith('http') 
          ? image 
          : 'https://placehold.co/1200x630/0f172a/ffffff?text=VigorForMen',
        width: 1200,
        height: 630,
        alt: title || defaultTitle,
      },
    ],
  };
  
  // Add article-specific metadata if type is 'article'
  if (type === 'article') {
    openGraph.type = 'article';
    openGraph.article = {
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    };
  }
  
  // Generate metadata object
  const metadata: Metadata = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: allKeywords,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: title || defaultTitle,
      description: description || defaultDescription,
      creator: '@vigorformen',
      images: [
        image.startsWith('http') 
          ? image 
          : 'https://placehold.co/1200x630/0f172a/ffffff?text=VigorForMen'
      ],
    },
  };
  
  return metadata;
}

/**
 * Generate schema.org JSON-LD for a blog post
 * @param post - Blog post data
 * @returns JSON-LD schema data object
 */
export function generateArticleSchema(post: {
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  authorUrl?: string;
  path: string;
}) {
  const baseUrl = 'https://vigorformen.com';
  const url = `${baseUrl}${post.path}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: post.authorUrl || baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VigorForMen',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime || post.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate schema.org JSON-LD for breadcrumbs
 * @param items - Breadcrumb items
 * @returns JSON-LD schema data object
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  const baseUrl = 'https://vigorformen.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}
