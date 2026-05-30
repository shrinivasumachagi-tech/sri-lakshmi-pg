'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, DoorOpen, Heart, Coffee } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}+</span>;
}

const stats = [
  { key: 'happyResidents', value: 200, icon: Users },
  { key: 'roomsAvailable', value: 50, icon: DoorOpen },
  { key: 'yearsOfTrust', value: 8, icon: Heart },
  { key: 'mealsServed', value: 600, icon: Coffee },
];

export default function Statistics() {
  const t = useTranslations('Statistics');

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(185,10,90,0.03),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(107,56,212,0.03),transparent_50%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shadow-sm">
                <stat.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-on-surface mb-1 tracking-tight">
                <Counter end={stat.value} />
              </div>
              <p className="text-on-surface-variant text-sm md:text-base font-medium">
                {t(stat.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
