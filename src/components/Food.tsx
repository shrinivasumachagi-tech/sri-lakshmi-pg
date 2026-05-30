'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Coffee, UtensilsCrossed, Apple, Moon } from 'lucide-react';

const mealIcons = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  snacks: Apple,
  dinner: Moon,
} as const;

type MealKey = keyof typeof mealIcons;

export default function Food() {
  const t = useTranslations('Food');
  const meals: MealKey[] = ['breakfast', 'lunch', 'snacks', 'dinner'];

  return (
    <section id="food" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient inline-block tracking-tight">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal, i) => {
            const Icon = mealIcons[meal];
            return (
              <motion.div
                key={meal}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
                  {t(meal)}
                </h3>
                <p className="text-gray-500 text-sm">
                  {t(`${meal}Desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
