'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Image as ImageIcon } from 'lucide-react';

const categories = ['all', 'building', 'rooms', 'dining', 'common'] as const;

const galleryItems = [
  { id: 1, category: 'building', title: 'Building Exterior' },
  { id: 2, category: 'building', title: 'Entrance' },
  { id: 3, category: 'building', title: 'Garden Area' },
  { id: 4, category: 'rooms', title: 'Single Room' },
  { id: 5, category: 'rooms', title: 'Double Sharing' },
  { id: 6, category: 'rooms', title: 'Triple Sharing' },
  { id: 7, category: 'dining', title: 'Dining Hall' },
  { id: 8, category: 'dining', title: 'Kitchen' },
  { id: 9, category: 'common', title: 'Common Room' },
  { id: 10, category: 'common', title: 'Study Area' },
  { id: 11, category: 'common', title: 'Prayer Room' },
  { id: 12, category: 'common', title: 'Terrace' },
];

export default function Gallery() {
  const t = useTranslations('Gallery');
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-surface-container-low/30 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient inline-block tracking-tight">
            {t('title')}
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/20'
                  : 'bg-white text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/30'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelected(item.id)}
                className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden cursor-pointer group relative border border-white/50 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/30 group-hover:text-primary/50 transition-colors">
                  <ImageIcon className="w-12 h-12 mb-2" strokeWidth={1} />
                  <span className="text-sm font-medium text-on-surface/40">{item.title}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            >
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <ImageIcon className="w-20 h-20 text-primary/30" strokeWidth={1} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-on-surface">
                  {galleryItems.find((i) => i.id === selected)?.title}
                </h3>
                <p className="text-on-surface-variant mt-1 capitalize">
                  {galleryItems.find((i) => i.id === selected)?.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
