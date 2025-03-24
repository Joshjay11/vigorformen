import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';

// Mock blog post data (in a real app, this would come from Sanity.io)
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Heart Health After 40',
    excerpt: 'Learn about the key factors that affect cardiovascular health in middle-aged men and strategies to maintain a healthy heart.',
    category: 'Heart Health',
    date: 'March 15, 2025',
    slug: 'understanding-heart-health-after-40',
    content: `
      <h2>Why Heart Health Matters After 40</h2>
      <p>As men enter their 40s, the risk of cardiovascular issues begins to increase significantly. This is due to a combination of factors including natural aging processes, lifestyle habits that may have accumulated over decades, and hormonal changes.</p>
      
      <p>According to the American Heart Association, heart disease remains the leading cause of death for men in the United States, and the risk increases substantially after age 45. However, many of these risks can be mitigated with proper understanding and lifestyle adjustments.</p>
      
      <h2>Key Risk Factors to Monitor</h2>
      <ul>
        <li><strong>Blood Pressure:</strong> Hypertension often shows no symptoms but can significantly increase your risk of heart attack and stroke.</li>
        <li><strong>Cholesterol Levels:</strong> Both LDL (bad) cholesterol and HDL (good) cholesterol need to be monitored regularly.</li>
        <li><strong>Blood Sugar:</strong> Diabetes and pre-diabetes conditions can damage blood vessels and the nerves that control your heart.</li>
        <li><strong>Body Weight:</strong> Excess weight, particularly around the midsection, is linked to increased heart disease risk.</li>
        <li><strong>Stress Levels:</strong> Chronic stress can contribute to high blood pressure and other heart disease risks.</li>
      </ul>
      
      <h2>Lifestyle Strategies for a Healthy Heart</h2>
      <p>The good news is that many heart health risk factors can be managed effectively through lifestyle changes:</p>
      
      <h3>1. Nutrition for Heart Health</h3>
      <p>A heart-healthy diet emphasizes:</p>
      <ul>
        <li>Fruits, vegetables, and whole grains</li>
        <li>Lean proteins like fish, poultry, and plant-based options</li>
        <li>Healthy fats from sources like olive oil, avocados, and nuts</li>
        <li>Limited sodium, added sugars, and processed foods</li>
      </ul>
      
      <h3>2. Exercise Recommendations</h3>
      <p>The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities at least twice weekly.</p>
      
      <p>For men over 40, a combination of:</p>
      <ul>
        <li>Cardiovascular exercise (walking, swimming, cycling)</li>
        <li>Strength training</li>
        <li>Flexibility work</li>
      </ul>
      <p>provides optimal heart benefits while supporting overall health.</p>
      
      <h3>3. Stress Management</h3>
      <p>Chronic stress can contribute to heart disease through various mechanisms, including elevated blood pressure and inflammation. Effective stress management techniques include:</p>
      <ul>
        <li>Mindfulness meditation</li>
        <li>Deep breathing exercises</li>
        <li>Regular physical activity</li>
        <li>Adequate sleep (7-8 hours nightly)</li>
        <li>Social connection</li>
      </ul>
      
      <h2>When to See a Doctor</h2>
      <p>Regular check-ups become increasingly important after 40. Men should have their blood pressure checked at least annually and discuss with their healthcare provider when to begin regular cholesterol screening.</p>
      
      <p>Additionally, be aware of warning signs that require immediate medical attention:</p>
      <ul>
        <li>Chest pain or discomfort</li>
        <li>Shortness of breath</li>
        <li>Pain or discomfort in the arms, back, neck, jaw, or stomach</li>
        <li>Lightheadedness or cold sweats</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Taking proactive steps to maintain heart health after 40 can significantly reduce your risk of cardiovascular disease and improve your overall quality of life. By understanding your personal risk factors and implementing appropriate lifestyle changes, you can support your heart health for decades to come.</p>
    `,
  },
  {
    id: '2',
    title: 'Strength Training for Men Over 40',
    excerpt: 'Discover effective strength training routines specifically designed for men in their 40s, 50s, and beyond.',
    category: 'Fitness',
    date: 'March 10, 2025',
    slug: 'strength-training-for-men-over-40',
    content: `
      <h2>Why Strength Training Becomes Crucial After 40</h2>
      <p>As men age, particularly after 40, natural physiological changes begin to occur that make strength training not just beneficial but essential for maintaining health and quality of life.</p>
      
      <p>Research shows that men typically lose about 1% of muscle mass per year after age 40 if they're not actively working to maintain it. This condition, known as sarcopenia, can lead to decreased strength, reduced mobility, and increased risk of falls and fractures as you age.</p>
      
      <h2>Benefits of Strength Training for Middle-Aged Men</h2>
      <ul>
        <li><strong>Preserves and builds muscle mass</strong> to combat age-related muscle loss</li>
        <li><strong>Increases metabolic rate</strong>, helping manage weight as metabolism naturally slows</li>
        <li><strong>Improves bone density</strong>, reducing risk of osteoporosis</li>
        <li><strong>Enhances joint health</strong> and reduces arthritis symptoms</li>
        <li><strong>Improves glucose metabolism</strong>, helping prevent or manage type 2 diabetes</li>
        <li><strong>Reduces risk of injury</strong> through improved strength and balance</li>
        <li><strong>Boosts testosterone levels</strong>, which naturally decline with age</li>
      </ul>
      
      <h2>Key Principles for Strength Training After 40</h2>
      
      <h3>1. Focus on Recovery</h3>
      <p>As you age, recovery becomes increasingly important. Your body simply doesn't bounce back as quickly as it did in your 20s and 30s.</p>
      <ul>
        <li>Allow 48-72 hours between training the same muscle groups</li>
        <li>Prioritize sleep quality and quantity (7-8 hours nightly)</li>
        <li>Consider active recovery days with light activity like walking or swimming</li>
      </ul>
      
      <h3>2. Emphasize Proper Form</h3>
      <p>Proper technique becomes even more critical after 40 to prevent injury and ensure you're targeting the intended muscles.</p>
      <ul>
        <li>Consider working with a qualified trainer initially to learn proper form</li>
        <li>Use mirrors to check your form during exercises</li>
        <li>Start with lighter weights to master movements before increasing load</li>
      </ul>
      
      <h3>3. Progressive Overload with Caution</h3>
      <p>While progressive overload (gradually increasing weight or reps) remains important for building strength, approach it more cautiously than you might have in your younger years.</p>
      <ul>
        <li>Increase weights by smaller increments</li>
        <li>Consider using more moderate weights with perfect form rather than maximum loads</li>
        <li>Listen to your body and back off when needed</li>
      </ul>
      
      <h2>Recommended Workout Structure</h2>
      
      <h3>Frequency</h3>
      <p>3-4 strength training sessions per week is ideal for most men over 40, allowing adequate recovery between sessions.</p>
      
      <h3>Sample Weekly Split</h3>
      <ul>
        <li><strong>Monday:</strong> Upper body push (chest, shoulders, triceps)</li>
        <li><strong>Tuesday:</strong> Lower body (quadriceps, hamstrings, calves)</li>
        <li><strong>Wednesday:</strong> Rest or light cardio/mobility work</li>
        <li><strong>Thursday:</strong> Upper body pull (back, biceps)</li>
        <li><strong>Friday:</strong> Full body or core-focused workout</li>
        <li><strong>Saturday/Sunday:</strong> Active recovery (walking, hiking, swimming)</li>
      </ul>
      
      <h3>Exercise Selection</h3>
      <p>Prioritize compound movements that work multiple muscle groups simultaneously:</p>
      <ul>
        <li>Squats (or variations like goblet squats)</li>
        <li>Deadlifts (conventional or sumo)</li>
        <li>Bench press (barbell or dumbbell)</li>
        <li>Rows (bent-over, seated cable, or inverted)</li>
        <li>Overhead press (seated or standing)</li>
        <li>Pull-ups or lat pulldowns</li>
        <li>Lunges (forward, reverse, or lateral)</li>
      </ul>
      
      <h2>Adapting to Your Body's Needs</h2>
      <p>Pay attention to joints or areas that may need special consideration:</p>
      
      <h3>Shoulder Issues</h3>
      <p>Many men over 40 experience some degree of shoulder discomfort. Consider:</p>
      <ul>
        <li>Using neutral grip variations (palms facing each other)</li>
        <li>Avoiding extreme ranges of motion if painful</li>
        <li>Incorporating rotator cuff strengthening exercises</li>
      </ul>
      
      <h3>Lower Back Concerns</h3>
      <ul>
        <li>Focus on core strengthening to support the spine</li>
        <li>Consider trap bar deadlifts instead of conventional deadlifts</li>
        <li>Use belt squats or front squats if back squats are uncomfortable</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Strength training after 40 isn't just about maintaining muscle—it's about investing in your long-term health, mobility, and quality of life. By adapting your approach to honor your body's changing needs while still challenging yourself appropriately, you can continue to build strength and resilience for decades to come.</p>
    `,
  },
];

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return generatePageMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    });
  }
  
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'men\'s health', 'wellness', 'fitness', 'middle-aged men'],
    type: 'article',
    publishedTime: new Date(post.date).toISOString(),
    authors: ['VigorForMen Team'],
    section: post.category,
    tags: ['health', 'wellness', 'men over 40'],
    path: `/blog/${post.slug}`,
    image: 'https://placehold.co/1200x630/0f172a/ffffff?text=VigorForMen', // Placeholder image
  });
}

// In a real app, this would fetch data from Sanity.io based on the slug
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.category, path: `/blog/category/${post.category.toLowerCase().replace(' ', '-')}` },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  
  // Generate article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: 'https://placehold.co/1200x630/0f172a/ffffff?text=VigorForMen', // Placeholder image
    author: {
      '@type': 'Person',
      name: 'VigorForMen Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VigorForMen',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vigorformen.com/images/logo.png',
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://vigorformen.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Add JSON-LD structured data */}
        <JsonLd data={articleSchema} />
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-800 dark:text-secondary-200">
            {post.title}
          </h1>
          <div className="flex items-center text-secondary-500 dark:text-secondary-500 text-sm">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span className="text-primary-600 dark:text-primary-400">{post.category}</span>
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-secondary-800 dark:prose-headings:text-secondary-200 prose-p:text-secondary-600 dark:prose-p:text-secondary-400 prose-a:text-primary-600 dark:prose-a:text-primary-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share and Tags */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-secondary-600 dark:text-secondary-400 mr-2">Share:</span>
              <div className="inline-flex space-x-2">
                <a
                  href="#"
                  className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-full text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-full text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 bg-secondary-100 dark:bg-secondary-800 rounded-full text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <span className="text-secondary-600 dark:text-secondary-400 mr-2">Related Topics:</span>
              <div className="inline-flex flex-wrap gap-2 mt-2">
                <Link
                  href={`/blog/tag/health`}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                >
                  Health
                </Link>
                <Link
                  href={`/blog/tag/wellness`}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                >
                  Wellness
                </Link>
                <Link
                  href={`/blog/tag/men-over-40`}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-sm rounded-full hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                >
                  Men Over 40
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-secondary-800 dark:text-secondary-200">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter((relatedPost) => relatedPost.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <article key={relatedPost.id} className="border border-secondary-200 dark:border-secondary-800 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-2 text-secondary-800 dark:text-secondary-200">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
