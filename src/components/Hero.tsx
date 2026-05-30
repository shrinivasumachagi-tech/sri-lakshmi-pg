'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('Hero');

  const features = [
    t('features.cctv'),
    t('features.food'),
    t('features.wifi'),
    t('features.location'),
    t('features.support'),
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Sri Lakshmi Ladies PG"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-primary/10 rounded-full z-0 animate-pulse" />

      {/* Floating decorative image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute right-0 bottom-0 w-[45%] h-[70%] z-[1] hidden lg:block"
      >
        <div className="relative w-full h-full">
          <Image
            src="/hero-float.png"
            alt="Premium living space"
            fill
            className="object-contain object-right-bottom"
            sizes="45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="z-10 container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4" />
            <span>Premium Women&apos;s PG in Davangere</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-on-surface"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 max-w-xl font-medium"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-outline-variant/30 shadow-sm"
              >
                <CheckCircle2 className="text-primary w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-semibold text-on-surface">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#admission"
              className="group bg-gradient-brand text-white px-8 py-4 rounded-full font-bold text-base shadow-[0_10px_40px_-10px_rgba(185,10,90,0.4)] hover:scale-105 hover:shadow-[0_15px_50px_-10px_rgba(185,10,90,0.5)] transition-all duration-300 flex items-center gap-2"
            >
              {t('applyNow')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+919844127319"
              className="bg-white text-on-surface border border-outline-variant/50 px-8 py-4 rounded-full font-bold text-base hover:bg-surface-container-low hover:scale-105 transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              {t('contactWarden')}
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block h-[600px]" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
