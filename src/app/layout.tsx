import { Open_Sans } from 'next/font/google';
import '../styles/globals.css';
import { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'VigorForMen - Health & Wellness for Middle-Aged Men',
    template: '%s | VigorForMen'
  },
  description: 'Evidence-based health and wellness information tailored for middle-aged men.',
  keywords: ['men\'s health', 'fitness after 40', 'wellness', 'middle-aged men', 'health advice', 'nutrition', 'mental health'],
  authors: [{ name: 'VigorForMen Team' }],
  creator: 'VigorForMen',
  publisher: 'VigorForMen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vigorformen.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'VigorForMen - Health & Wellness for Middle-Aged Men',
    description: 'Evidence-based health and wellness information tailored for middle-aged men.',
    url: 'https://vigorformen.com',
    siteName: 'VigorForMen',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VigorForMen - Health & Wellness for Middle-Aged Men',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VigorForMen - Health & Wellness for Middle-Aged Men',
    description: 'Evidence-based health and wellness information tailored for middle-aged men.',
    creator: '@vigorformen',
    images: ['/images/twitter-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
