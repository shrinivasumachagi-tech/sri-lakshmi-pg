'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const items = t.raw('items') as Array<{ name: string; role: string; text: string }>;

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/[0.02] to-transparent rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient inline-block tracking-tight">
            {t('title')}
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-surface-container-low/50 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" strokeWidth={1.5} />
              <p className="text-on-surface-variant leading-relaxed mb-6 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-primary font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{item.name}</p>
                  <p className="text-on-surface-variant text-xs">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
