import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Statistics from '@/components/Statistics';
import About from '@/components/About';
import Facilities from '@/components/Facilities';
import RoomGallery from '@/components/RoomGallery';
import Food from '@/components/Food';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import AdmissionForm from '@/components/AdmissionForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-on-surface flex flex-col relative w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <Statistics />
      <About />
      <Facilities />
      <RoomGallery />
      <Food />
      <Gallery />
      <Testimonials />
      <FAQ />
      <AdmissionForm />
      <Contact />
      <Footer />
      <AIChat />
    </main>
  );
}
