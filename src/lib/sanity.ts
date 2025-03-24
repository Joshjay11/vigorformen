import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create a Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  token: process.env.SANITY_API_TOKEN, // Only needed if you want to update content
});

// Set up a helper function for generating image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch all blog posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "category": category->title,
      publishedAt,
      mainImage,
    }
  `);
}

// Helper function to fetch a single blog post by slug
export async function getPostBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      "category": category->title,
      publishedAt,
      mainImage,
      "author": author->{name, image},
      "relatedPosts": *[_type == "post" && references(^.category._ref) && slug.current != $slug][0...2] {
        _id,
        title,
        slug,
        excerpt,
        "category": category->title,
        publishedAt,
        mainImage,
      }
    }
    `,
    { slug }
  );
}

// Helper function to fetch posts by category
export async function getPostsByCategory(category: string) {
  return client.fetch(
    `
    *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      "category": category->title,
      publishedAt,
      mainImage,
    }
    `,
    { category }
  );
}

// Helper function to fetch all categories
export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
    }
  `);
}
