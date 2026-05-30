'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, MessageCircle, Clock, Mail, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';

export default function Contact() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert(t('formError'));
    }
  };

  const contactCards = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: t('address'),
      value: 'Sri Lakshmi Ladies PG, Davangere, Karnataka',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t('helpline'),
      value: `${t('phone')} | ${t('phone2')}`,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email',
      value: t('email'),
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Visiting Hours',
      value: '9:00 AM - 7:00 PM',
      color: 'bg-green-50 text-green-600',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-3 text-gradient inline-block tracking-tight">
            {t('title')}
          </h2>
          <p className="text-on-surface-variant text-base max-w-xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14"
        >
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-outline-variant/30 bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">{card.title}</p>
              <p className="text-sm font-semibold text-on-surface leading-snug">{card.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          <a
            href="https://wa.me/919844127319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            <MessageCircle size={18} />
            {t('whatsapp')}
          </a>
          <a
            href="tel:+919844127319"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 transition-all"
          >
            <Phone size={18} />
            {t('callNow')}
          </a>
          <a
            href="https://maps.google.com/?q=Sri+Lakshmi+Ladies+PG+Davangere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 hover:shadow-lg transition-all"
          >
            <MapPin size={18} />
            Get Directions
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Map + Form Grid */}
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20 h-[380px] lg:h-full min-h-[350px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.8!2d75.92!3d14.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDI3JzM2LjAiTiA3NcKwNTUnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Lakshmi Ladies PG Location"
                className="absolute inset-0"
              />
              {/* Map overlay gradient for visual polish */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none lg:hidden" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-surface-container-low/30 backdrop-blur-sm rounded-2xl p-7 border border-outline-variant/20 shadow-sm h-full">
              <h3 className="text-xl font-bold text-on-surface mb-1">Send a Message</h3>
              <p className="text-sm text-on-surface-variant mb-6">We&apos;ll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-on-surface text-lg mb-1">{t('formSuccess')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">{t('formName')}</label>
                    <input
                      {...register('name')}
                      className="w-full h-11 bg-white border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3.5 text-sm transition-all outline-none"
                      placeholder={t('formNamePlaceholder')}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">{t('formEmail')}</label>
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full h-11 bg-white border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3.5 text-sm transition-all outline-none"
                      placeholder={t('formEmailPlaceholder')}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">{t('formMessage')}</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full bg-white border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3.5 py-2.5 text-sm transition-all outline-none resize-none"
                      placeholder={t('formMessagePlaceholder')}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{String(errors.message.message)}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Sending...
                      </>
                    ) : (
                      t('formSubmit')
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
