'use client';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['about', 'facilities', 'rooms', 'food', 'gallery', 'testimonials', 'faq', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('Navigation');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-b border-outline-variant/20" />
      <nav className="relative max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-black text-sm shadow-lg">
            SL
          </div>
          <span className="font-bold text-xl tracking-tight text-on-surface hidden sm:block group-hover:text-primary transition-colors">
            {t('brand')}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
            >
              {t(link)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="#admission"
            className="bg-gradient-brand text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20 hidden sm:block"
          >
            {t('admission')}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-container-low transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-outline-variant/20 shadow-lg"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
                >
                  {t(link)}
                </a>
              ))}
              <Link
                href="#admission"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-gradient-brand text-white px-6 py-3 rounded-full font-semibold text-sm mt-4"
              >
                {t('admission')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
