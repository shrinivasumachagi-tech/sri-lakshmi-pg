import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Sri Lakshmi Ladies PG - Premium Women\'s Accommodation in Davangere',
    template: '%s | Sri Lakshmi Ladies PG',
  },
  description:
    'Safe, comfortable & premium accommodation for women in Davangere. Fully furnished rooms, CCTV security, hygienic food, WiFi, and a supportive community for students & working professionals.',
  metadataBase: new URL('https://shrilakshmipg.com'),
  other: {
    'application/ld+json': JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sri Lakshmi Ladies PG',
        url: 'https://shrilakshmipg.com',
        logo: 'https://shrilakshmipg.com/logo.png',
        description:
          'Premium women\'s PG accommodation in Davangere with modern amenities.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Davangere',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9844127319',
          contactType: 'reservations',
        },
        sameAs: [
          'https://facebook.com/shrilakshmipg',
          'https://instagram.com/shrilakshmipg',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Sri Lakshmi Ladies PG',
        description:
          'Premium women\'s PG accommodation in Davangere.',
        url: 'https://shrilakshmipg.com',
        telephone: '+91-9844127319',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Davangere',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        image: 'https://shrilakshmipg.com/og-image.png',
        priceRange: '₹',
      },
    ]),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-on-surface font-sans">
        {children}
      </body>
    </html>
  );
}
