'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Wifi, ShieldCheck, Utensils, Droplets, WashingMachine, Zap, Home as HomeIcon, Bed, Bath } from 'lucide-react';

const facilityIcons = {
  furnished: Bed,
  cctv: ShieldCheck,
  bathroom: Bath,
  water: Droplets,
  laundry: WashingMachine,
  backup: Zap,
  wifi: Wifi,
  dining: Utensils,
  housekeeping: HomeIcon,
} as const;

type FacilityKey = keyof typeof facilityIcons;

export default function Facilities() {
  const t = useTranslations('Facilities');
  const items: FacilityKey[] = ['furnished', 'cctv', 'bathroom', 'water', 'laundry', 'backup', 'wifi', 'dining', 'housekeeping'];

  return (
    <section id="facilities" className="py-24 bg-[#FAFAFA] relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-3xl absolute -top-40 -left-40 mix-blend-multiply" />
        <div className="w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl absolute top-40 right-10 mix-blend-multiply" />
      </div>

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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {items.map((key, index) => {
            const Icon = facilityIcons[key];
            return (
              <motion.div
                key={key}
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass p-6 md:p-8 rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 hover:shadow-2xl transition-shadow cursor-pointer bg-white/60"
              >
                <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl text-pink-500 shadow-sm">
                  <Icon size={32} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-gray-800 tracking-tight">
                  {t(`items.${key}`)}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
