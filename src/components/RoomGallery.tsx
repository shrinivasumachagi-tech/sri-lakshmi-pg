'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Images } from 'lucide-react';

const rooms = [
  { id: 1, type: 'single', key: 'premium' },
  { id: 2, type: 'double', key: 'comfort' },
  { id: 3, type: 'triple', key: 'standard' },
];

export default function RoomGallery() {
  const t = useTranslations('Rooms');
  const [filter, setFilter] = useState('all');

  const filteredRooms = filter === 'all' ? rooms : rooms.filter((r) => r.type === filter);

  return (
    <section id="rooms" className="py-24 bg-white">
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

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(['all', 'single', 'double', 'triple'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                filter === f
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(f)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex flex-col group shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-64 bg-gradient-to-br from-pink-50 to-purple-50 w-full flex flex-col items-center justify-center text-primary/30 group-hover:text-primary/50 transition-colors">
                  <Images size={48} className="mb-2 opacity-50" />
                  <span className="text-sm font-medium text-on-surface/40">
                    {t('preview')}
                  </span>
                </div>
                <div className="p-8 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t(room.key)}
                  </h3>
                  <button className="text-pink-600 font-bold hover:text-purple-600 transition-colors group/btn inline-flex items-center gap-2">
                    <span>{t('bookNow')}</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
