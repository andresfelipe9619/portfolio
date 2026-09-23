import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';
import { getConsent, setConsent } from '@/lib/consent';

/**
 * A small, non-blocking ask. No dark patterns, no "legitimate interest"
 * checkbox maze — decline is exactly as easy as accept, and the site works
 * identically either way.
 */
export function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only ask people who haven't already answered.
    setVisible(getConsent() === 'unset');
  }, []);

  useEffect(() => {
    // A fixed banner floats over whatever is at the bottom of the page, which
    // on a phone is usually the thing you actually came to press — the contact
    // form's submit button, for one. Reserve real layout space for it so the
    // page can scroll clear instead of hiding controls underneath it.
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('has-consent-banner', visible);
    return () => {
      document.body.classList.remove('has-consent-banner');
    };
  }, [visible]);

  const answer = (state: 'granted' | 'denied') => {
    setConsent(state);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label={t('consent.title')}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2"
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gray-950/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center">
            <Cookie
              className="h-5 w-5 shrink-0 text-yellow-400"
              aria-hidden="true"
            />

            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                {t('consent.title')}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {t('consent.description')}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => answer('denied')}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                {t('consent.decline')}
              </button>
              <button
                onClick={() => answer('granted')}
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-950 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              >
                {t('consent.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
