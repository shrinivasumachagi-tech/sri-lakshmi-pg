import type { Metadata } from 'next';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmoothScroll from '@/components/SmoothScroll';
import LocaleFont from '@/components/LocaleFont';

export const metadata: Metadata = {
  title: {
    default: 'Sri Lakshmi Ladies PG - Premium Women\'s Accommodation in Davangere',
    template: '%s | Sri Lakshmi Ladies PG',
  },
  description:
    'Safe, comfortable & premium accommodation for women in Davangere. Fully furnished rooms, CCTV security, hygienic food, WiFi, and a supportive community for students & working professionals.',
  keywords: [
    'ladies PG in Davangere',
    'women hostel Davangere',
    'PG for women Davangere',
    'student accommodation Davangere',
    'working women hostel Davangere',
    'Sri Lakshmi Ladies PG',
    'premium PG Davangere',
    'girls hostel Davangere',
  ],
  authors: [{ name: 'Sri Lakshmi Ladies PG' }],
  creator: 'Sri Lakshmi Ladies PG',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sri Lakshmi Ladies PG',
    title: 'Sri Lakshmi Ladies PG - Premium Women\'s Accommodation in Davangere',
    description:
      'Safe, comfortable & premium accommodation for women in Davangere. Fully furnished rooms, CCTV security, hygienic food, WiFi, and a supportive community for students & working professionals.',
    url: 'https://shrilakshmipg.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sri Lakshmi Ladies PG - Premium Women\'s Accommodation in Davangere',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lakshmi Ladies PG - Premium Women\'s Accommodation',
    description:
      'Safe, comfortable & premium accommodation for women in Davangere.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://shrilakshmipg.com',
    languages: {
      en: 'https://shrilakshmipg.com/en',
      kn: 'https://shrilakshmipg.com/kn',
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as 'en' | 'kn')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleFont />
      <SmoothScroll />
      {children}
    </NextIntlClientProvider>
  );
}
