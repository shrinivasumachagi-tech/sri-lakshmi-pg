'use client';
import { useTranslations } from 'next-intl';
import { Send, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-black text-sm shadow-lg">
                SL
              </div>
              <span className="font-bold text-xl tracking-tight text-on-surface">
                Sri Lakshmi PG
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </div>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm text-on-surface font-bold uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#about', label: 'About' },
                { href: '#facilities', label: t('amenities') },
                { href: '#rooms', label: t('pricing') },
                { href: '#contact', label: t('safety') },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-on-surface-variant text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm text-on-surface font-bold uppercase tracking-wider">
              {t('contactUs')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                Davangere, Karnataka
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                +91 98441 27319
              </li>
              <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                contact@shrilakshmipg.com
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm text-on-surface font-bold uppercase tracking-wider">
              {t('newsletter')}
            </h4>
            <p className="text-sm text-on-surface-variant">
              Stay updated with our latest offers and events.
            </p>
            <div className="flex bg-white rounded-full border border-outline-variant overflow-hidden p-1 shadow-sm">
              <input
                className="border-none focus:outline-none focus:ring-0 px-4 w-full text-sm text-on-surface bg-transparent"
                placeholder={t('newsletterPlaceholder')}
                type="email"
              />
              <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-container transition-colors flex-shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-on-surface-variant">
          <p>
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Davangere
          </p>
        </div>
      </div>
    </footer>
  );
}
