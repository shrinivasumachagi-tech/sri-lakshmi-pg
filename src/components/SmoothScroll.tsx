'use client';
import { useEffect, useRef } from 'react';

export default function SmoothScroll() {
  const lenisRef = useRef<{ raf: (t: number) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default as new (opts: Record<string, unknown>) => {
          raf: (t: number) => void;
          destroy: () => void;
        };
        const instance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });
        lenisRef.current = instance;

        const raf = (time: number) => {
          instance.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch {
        // Lenis not available, fallback to native scroll
      }
    };

    init();

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  return null;
}
