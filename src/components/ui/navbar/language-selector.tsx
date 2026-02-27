import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { showEasterEggToast } from '@/hooks/use-easter-egg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

const languages = [
  { code: 'en', label: 'English', icon: '🦅', soundFile: '/sounds/en.m4a' },
  { code: 'es', label: 'Español', icon: '💃', soundFile: '/sounds/es.m4a' },
  { code: 'fr', label: 'Français', icon: '🥐', soundFile: '/sounds/fr.m4a' },
  { code: 'de', label: 'Deutsch', icon: '🍺', soundFile: '/sounds/de.m4a' },
];

const playMemeSound = (soundFile: string) => {
  try {
    const w = typeof window !== 'undefined' ? (window as any) : null;
    if (w && w.__currentMemeAudio) {
      w.__currentMemeAudio.pause();
      w.__currentMemeAudio.currentTime = 0;
    }
    if (w) {
      w.__currentMemeAudio = new Audio(soundFile);
      w.__currentMemeAudio.volume = 0.5;
      w.__currentMemeAudio.play().catch((e: any) => {
        console.warn('Audio playback was blocked or file not found:', e);
      });
    }
  } catch {
    // Ignore audio errors
  }
};

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const clickedLanguages = useRef<Set<string>>(new Set());

  const currentLang =
    languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={currentLang.code}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
              className="inline-block text-lg origin-center cursor-pointer"
            >
              {currentLang.icon}
            </motion.span>
          </AnimatePresence>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              clickedLanguages.current.add(lang.code);
              if (clickedLanguages.current.size === languages.length) {
                showEasterEggToast('all-languages', t('easterEggs.allLanguagesTitle'), t('easterEggs.watcherDesc'));
              }
              import('@/lib/ga').then(({ logEvent }) => {
                logEvent('Language', 'Change', lang.code);
              });
              i18n.changeLanguage(lang.code);
              playMemeSound(lang.soundFile);
            }}
            className={`flex items-center gap-2 cursor-pointer ${i18n.language.startsWith(lang.code) ? 'bg-accent font-medium' : ''
              }`}
          >
            <motion.span
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              className="text-base cursor-pointer"
            >
              {lang.icon}
            </motion.span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
