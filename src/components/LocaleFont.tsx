'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function LocaleFont() {
  const locale = useLocale();

  useEffect(() => {
    if (locale === 'kn') {
      document.documentElement.style.fontFamily = "'Noto Sans Kannada', 'Inter', sans-serif";
    } else {
      document.documentElement.style.fontFamily = '';
    }
  }, [locale]);

  return null;
}
