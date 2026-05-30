'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Users, Home } from 'lucide-react';

export default function About() {
  const t = useTranslations('About');

  const highlights = [
    { icon: Shield, text: '24/7 CCTV Security & Female Guards' },
    { icon: Users, text: 'Supportive Community of Students & Professionals' },
    { icon: Home, text: 'Fully Furnished Premium Living Spaces' },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-semibold mb-4 tracking-wide">
              {t('title')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-on-surface leading-tight">
              {t('subtitle')}
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
              {t('description')}
            </p>
            <div className="space-y-4 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-semibold text-on-surface">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40">
                <Home className="w-24 h-24 mb-4" strokeWidth={1} />
                <p className="text-lg font-semibold text-on-surface/60">Premium Living Space</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-white/50 max-w-[200px]">
              <p className="text-3xl font-black text-primary">8+</p>
              <p className="text-sm font-medium text-on-surface-variant">{t('title')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
