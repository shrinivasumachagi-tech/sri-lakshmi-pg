'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'kn' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/90 transition-all text-sm font-medium shadow-sm hover:shadow-md"
    >
      <span className="text-lg">🌐</span>
      <span className={locale === 'en' ? 'font-bold text-pink-600' : 'text-gray-600'}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={locale === 'kn' ? 'font-bold text-purple-600' : 'text-gray-600'}>ಕನ್ನಡ</span>
    </button>
  );
}
